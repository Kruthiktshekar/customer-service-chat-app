import React, { useContext, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { axiosApi } from "../../axios";
import { toast } from "react-toastify";


function Prompts() {
  const { adminState, adminDispatch } = useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false)

  // add user
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      prompt,
      message
    };
    try {
      const response = await axiosApi.post("/prompt", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (response) {
        adminDispatch({ type: "ADD_PROMPTS", payload: response.data });
        toast.success('Prompt Added Successfully')
        setPrompt('')
        setMessage('')
        closeModal()
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')

    }
  };
  // delete user
  const deleteHandler = async (id) => {
    try {
      const response = await axiosApi.delete(`/prompt/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (response) {
        adminDispatch({ type: "REMOVE_PROMPT", payload: response.data });
        toast.success('Prompt Deleted Successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  };

  const ItemList = ({ ele }) => {
    const [message, setMessage] = useState(ele.message);
    const [prompt, setPrompt] = useState(ele.prompt);

    // update user
    const updateHandler = async (id) => {
      setEdit(!edit);
      if (edit) {
        const formData = {
          prompt,
          message,
        };
        try {
          const response = await axiosApi.put(
            `/prompt/${id}`,
            formData,
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          if (response) {
            adminDispatch({ type: 'UPDATE_PROMPT' , payload : response.data});
            toast.success('Prompt updated successfully')
            setPrompt('')
            setMessage('')
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }
      }
    };
    return (
      <tr key={ele._id}>
        <td>
          {edit ? (
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          ) : (
            ele.prompt
          )}
        </td>
        <td>
          {edit ? (
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          ) : (
            ele.message
          )}
        </td>
        <td>
          <button
            className="edit"
            style={{ marginBottom: "10px" }}
            onClick={() => updateHandler(ele._id)}
          >
            {edit ? "Save" : "Edit"}
          </button>
          <button className="delete" onClick={() => deleteHandler(ele._id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminState.prompts && adminState.prompts.map((ele) => {
            return <ItemList key={ele._id} ele={ele} />;
          })}
        </tbody>
      </table>

      <button className="add" onClick={openModal}>
        Add Prompt
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add New Prompt</h2>
            <form onSubmit={submitHandler}>
              <label>Prompt</label>
              <input
                type="text"
                placeholder="Enter username"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <label>Answer</label>
              <textarea
                type="text"
                placeholder="Enter username"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="add" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prompts;

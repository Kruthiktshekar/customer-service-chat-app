import React, { useContext, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { axiosApi } from "../../axios";
import { format } from "date-fns";
import { toast } from "react-toastify";

function Users() {
  const { adminState, adminDispatch } = useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");

  // add user
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      password,
      role,
    };
    try {
      const response = await axiosApi.post("/signup", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (response) {
        adminDispatch({ type: "ADD_USER", payload: response.data });
        toast.success(`${username} is created successfully`)
        setUsername("");
        setFullname("");
        setPassword("");
        setRole('')
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // delete user
  const deleteHandler = async (id) => {
    try {
      const response = await axiosApi.delete(`/user/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      if (response) {
        adminDispatch({ type: 'REMOVE_USER', payload: response.data });
        toast.success(`User ${response.data.username} deleted successfully`)
      }
    } catch (error) {
      console.log(error);
    }
  };
  // update user
  const updateHandler = async (id) => {
    try {
      const response = await axiosApi.put(
        `/user/${id}`,
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (response) {
        console.log(response)
        adminDispatch({ type: "UPDATE_ROLE", payload: response.data });
        toast.success(`User ${response.data.username} updated to agent successfully`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>createdAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminState.users &&
            adminState.users.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.username}</td>
                  <td>{format(new Date(ele.createdAt), "yyyy-MM-dd")}</td>
                  <td>
                    <button
                      className="edit"
                      style={{ marginBottom: "10px" }}
                      onClick={() => updateHandler(ele._id)}
                    >
                      Update to Agent
                    </button>{" "}
                    <button
                      className="delete"
                      onClick={() => deleteHandler(ele._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <button className="add" onClick={openModal}>
        Add User
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add New User</h2>
            <form onSubmit={submitHandler}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter username"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter username"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">selet</option>
                <option value="user">User</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select> */}
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

export default Users;

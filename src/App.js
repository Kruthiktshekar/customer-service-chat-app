import Login from "./pages/login";
import "./login.css";
import "./app.css";
import "./admin.css";
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./pages/register";
import { Navigate, Route, Routes } from "react-router-dom";
import AgentChatArea from "./components/chat/AgentChatArea";
import Admin from "./components/AdminPanel/Dashboard";
import Users from "./components/AdminPanel/Users";
import Agents from "./components/AdminPanel/Agents";
import Prompts from "./components/AdminPanel/Prompts";
import Sidebar from "./components/AdminPanel/Sidebar";
import { AdminProvider } from "./contexts/AdminContext";
import LandingPage from "./pages/LandingPage";
import { PrivateRoute } from "./contexts/PrivateRoute";
import AdminPrivateRoute from "./contexts/AdminPrivateRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/agent-chatbox"
          element={
            <PrivateRoute>
              <AgentChatArea />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
            <AdminProvider>
              <Sidebar />
            </AdminProvider>
            </AdminPrivateRoute>
          }
        >
          <Route path="" element={<Admin />} />
          <Route path="users" element={<Users />} />
          <Route path="agents" element={<Agents />} />
          <Route path="prompts" element={<Prompts />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authInfo = useAuth();
  const { login } = authInfo ? authInfo : { login: () => {} };
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-screen">
        <div className="w-3/5 h-3/5 mx-auto my-auto py-2">
          <div className="w-1/3 mx-auto flex items-center justify-center mt-40 mb-4">
            <Link to="/">
              <img src="/logo.png" alt="logo" width={100} height={100}></img>
            </Link>
          </div>
          <div className="font-bold uppercase text-3xl w-1/3 mx-auto flex items-center justify-center mb-4">
            Inest
          </div>
          <div className="w-1/3 mx-auto mb-2">
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-200 px-4 py-2 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="w-1/3 mx-auto mb-2">
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-200 px-4 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="w-1/3 mx-auto">
            <button className="bg-blue-400 text-white w-full py-2 border">
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;

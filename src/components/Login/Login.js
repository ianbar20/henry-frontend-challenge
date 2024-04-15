import { useState } from "react";
const Login = ({ setUser, addNewProvider, addNewClient, userType }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(id);
    userType === 'provider' ? addNewProvider(id) : addNewClient(id);
  };

  return (
    <div className=" flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-500">
      <form className="bg-white shadow-xl rounded p-12 mb-4" onSubmit={handleSubmit}>
        <label className="block text-2xl font-bold mb-4 text-center" htmlFor="enterId">Enter your ID</label>
        <input type="text" className="border-2" id="enterId" value={id} onChange={e => setId(e.target.value.toLowerCase())} placeholder="Enter ID" required />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded" type="Submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
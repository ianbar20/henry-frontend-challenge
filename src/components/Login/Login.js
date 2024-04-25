import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {

  const { loginWithRedirect } = useAuth0();


  return (
    <div className=" flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-500">
      <div className="bg-white shadow-xl rounded p-12 mb-4">
        <label className="block text-2xl font-bold mb-4 text-center" htmlFor="enterId">Log in</label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded" onClick={() => loginWithRedirect()
        }>Log in</button>
      </div>
    </div>
  );
};

export default Login;
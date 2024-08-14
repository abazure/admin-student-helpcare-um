import { useState } from 'react';
import ChangeThemes from "../components/ChangesThemes.tsx";
import { useNavigate } from "react-router-dom";
import UM from "../assets/um.svg";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const requestData = {
      email,
      password,
    };

    try {
      const response = await axios.post<{ token: string }>('https://student-helpcare-um.vercel.app/api/admin/login', requestData);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const token = response.data.data.token!
      console.log(token)
      localStorage.setItem('authToken', token);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/complaints'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
      <div className="w-full p-0 m-0">
        <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
          <div className="absolute top-5 right-5 z-[99]">
            <ChangeThemes />
          </div>
          <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
            <div className="flex items-center gap-1 xl:gap-2">
              <img src={UM} alt="Logo" className="h-10" />
              <span className="text-[18px] leading-[1.2] sm:text-lg xl:text-3xl 2xl:text-3xl font-semibold text-base-content dark:text-neutral-200">
              Student Helpcare UM
            </span>
            </div>
            <span className="xl:text-xl font-semibold">
            Login Akun Admin
          </span>
            <div className="w-full flex flex-col items-stretch gap-3">
              <label className="input input-bordered min-w-full flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                    placeholder="Email"
                    required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                </svg>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                    placeholder="Password"
                    required
                />
              </label>
              <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-primary w-full"
              >
                Login
              </button>
              <div className="w-full text-center mt-4">
              <span className="text-sm">
                Belum punya akun?{' '}
                <a href="/register" className="text-blue-500 hover:underline">
                  Daftar
                </a>
              </span>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
  );
};

export default Login;

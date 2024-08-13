import { useState, useEffect } from 'react';
import ChangeThemes from "../components/ChangesThemes.tsx";
import { useNavigate } from "react-router-dom";
import UM from "../assets/um.svg";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface School {
  id: string;
  name: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get<{ data: School[] }>('https://student-helpcare-um.vercel.app/api/schools');
        setSchools(response.data.data);
      } catch (error) {
        console.error('Failed to fetch schools', error);
        toast.error('Failed to fetch schools.');
      }
    };

    fetchSchools();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password || !selectedSchool) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const requestData = {
      name,
      email,
      password,
      id_school: selectedSchool,
    };

    try {
      await axios.post('https://student-helpcare-um.vercel.app/api/admin', requestData);
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('Registration failed. Please try again.');
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
            Registrasi Akun Admin
          </span>
            <div className="w-full flex flex-col items-stretch gap-3">
              <label className="input input-bordered min-w-full flex items-center gap-2">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70">
                  <circle cx="12" cy="6" r="4"/>
                  <path
                      d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                  />
                </svg>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                    placeholder="Name"
                    required
                />
              </label>
              <label className="input input-bordered min-w-full flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="w-4 h-4 opacity-70">
                  <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
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
              <label className="input input-bordered min-w-full flex items-center gap-2">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 opacity-70">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                          d="M143.6 25.42c-8.4.08-18.2.34-26.2 1.95-4.9.98-8.9 2.5-10.8 3.86-1.2.8-1.6 1.22-1.8 1.67l23.6 59.19c0-.04.1-.09.1-.13 5.1-7.32 11.6-13.41 20.6-13.41h21l-26.5-53.13zm224.8 0l-26.5 53.13h21c9.1 0 15.5 6.22 20.6 13.65l23.7-59.3c-.2-.45-.6-.87-1.8-1.67-1.9-1.36-5.9-2.88-10.8-3.86-8-1.61-17.8-1.85-26.2-1.95zM256 38.47c-31.2 0-62.5 16.36-62.5 49.08h18c0-41.42 89-41.42 89 0h18c0-32.72-31.3-49.08-62.5-49.08zM149.1 96.55s-2.3.61-5.8 5.75c-3.6 5-7.7 13.5-11.6 24.5-7.8 22-15.3 54.1-21.7 91.7-12.59 74.7-20.87 171.7-20.98 259.7 1.34.9 4.46 2.4 8.78 3.7 8.7 2.7 22.1 5.2 38.3 7.2 32.4 3.9 76.2 5.9 119.9 5.9s87.5-2 119.9-5.9c16.2-2 29.6-4.5 38.3-7.2 4.3-1.3 7.4-2.8 8.8-3.7-.1-85.1-8.4-182-21-257.5-6.4-38-13.9-70.6-21.7-93.1-4-11.2-8-19.9-11.6-25.2-3.6-5.23-6-5.85-5.8-5.85H149.1zM256 119c23.1 0 46.2 4.1 65.2 12.8 19.1 8.7 34.7 22.6 39.5 42l.1.1 31.3 136.3H119.9l31.3-136.3.1-.1c4.8-19.4 20.4-33.3 39.5-42 19-8.7 42.1-12.8 65.2-12.8zm0 18c-20.9 0-41.8 3.9-57.8 11.2-15.9 7.3-26.3 17.4-29.5 29.9l-26.2 114.1h227l-26.2-114.1c-3.2-12.5-13.6-22.6-29.5-29.9-16-7.3-36.9-11.2-57.8-11.2zm-64 46h128v18h-87v26.6h-18V201h-23v-18zm-69.8 153.8h18c0 34.9 4.6 60.5 12.4 76.2 7.9 15.6 17.3 21.7 32.1 21.7h142.6c14.8 0 24.2-6.1 32.1-21.7 7.8-15.7 12.4-41.3 12.4-76.2h18c0 36.4-4.4 64.3-14.4 84.2-10 20-27.3 31.7-48.1 31.7H184.7c-20.8 0-38.1-11.7-48.1-31.7-10-19.9-14.4-47.8-14.4-84.2z"></path>
                  </g>
                </svg>
                <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                    required
                >
                  <option value="">Select School</option>
                  {schools.map(school => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                  ))}
                </select>
              </label>
              <button
                  type="button"
                  onClick={handleRegister}
                  className="btn btn-primary w-full"
              >
                Register
              </button>
              <div className="w-full text-center mt-4">
              <span className="text-sm">
                Sudah punya akun?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  Masuk
                </a>
              </span>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
  );
};

export default Register;

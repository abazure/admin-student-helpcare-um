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
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70">
                  <circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5"/>
                  <path
                      d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                      stroke="#1C274C" strokeWidth="1.5"/>
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
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70">
                  <path
                      d="M20 12H4M12 20V4"
                      stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
        <ToastContainer />
      </div>
  );
};

export default Register;

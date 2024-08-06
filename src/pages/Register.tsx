import { useState, useEffect } from 'react';
import ChangeThemes from "../components/ChangesThemes.tsx";
import { useNavigate } from "react-router-dom";
import UM from "../assets/um.svg";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const Register = () => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schools, setSchools] = useState([]);

  // Fetch schools from API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('https://student-helpcare-um.vercel.app/api/schools');
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
                  <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"/>
                  <path
                      d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                      stroke="#1C274C" stroke-width="1.5"/>
                </svg>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                    placeholder="Name"
                    required // Make this field required
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
                    required // Make this field required
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
                    required // Make this field required
                />
              </label>
              <label className="input input-bordered min-w-full flex items-center gap-2">
                <svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true" role="img"
                     className="w-4 h-4 opacity-70" preserveAspectRatio="xMidYMid meet">
                  <path
                      d="M14.188 29.656H8.563c-.775 0-1.406.631-1.406 1.406v3.75c0 .775.631 1.406 1.406 1.406h5.625c.775 0 1.406-.631 1.406-1.406v-3.75c0-.775-.631-1.406-1.406-1.406m-3.282 5.625H8.563a.47.47 0 0 1-.469-.469v-3.75a.47.47 0 0 1 .469-.469h2.344v4.688zm3.75-.468a.47.47 0 0 1-.469.469h-2.344v-4.688h2.344a.47.47 0 0 1 .469.469v3.75"
                      fill="#000000"></path>
                  <path
                      d="M14.188 39.5H8.563c-.775 0-1.406.631-1.406 1.406v3.75c0 .775.631 1.406 1.406 1.406h5.625c.775 0 1.406-.631 1.406-1.406v-3.75c0-.775-.631-1.406-1.406-1.406m-3.282 5.625H8.563a.47.47 0 0 1-.469-.469v-3.75a.47.47 0 0 1 .469-.469h2.344v4.688zm3.75-.469a.47.47 0 0 1-.469.469h-2.344v-4.688h2.344a.47.47 0 0 1 .469.469v3.75"
                      fill="#000000"></path>
                  <path
                      d="M14.188 48.875H8.563c-.775 0-1.406.631-1.406 1.406v3.75c0 .775.631 1.406 1.406 1.406h5.625c.775 0 1.406-.631 1.406-1.406v-3.75c0-.775-.631-1.406-1.406-1.406M10.906 54.5H8.563a.47.47 0 0 1-.469-.469v-3.75a.47.47 0 0 1 .469-.469h2.344V54.5zm3.75-.469a.47.47 0 0 1-.469.469h-2.344v-4.688h2.344a.47.47 0 0 1 .469.469v3.75"
                      fill="#000000"></path>
                  <path
                      d="M48.406 31.063v3.75c0 .775.631 1.406 1.406 1.406h5.625c.775 0 1.406-.631 1.406-1.406v-3.75c0-.775-.631-1.406-1.406-1.406h-5.625a1.407 1.407 0 0 0-1.406 1.406m4.688-.469h2.344a.47.47 0 0 1 .469.469v3.75a.47.47 0 0 1-.469.469h-2.344v-4.688m-.938 4.687h-2.344a.47.47 0 0 1-.469-.469v-3.75a.47.47 0 0 1 .469-.469h2.344v4.688"
                      fill="#000000"></path>
                  <path
                      d="M55.438 39.5h-5.625c-.775 0-1.406.631-1.406 1.406v3.75c0 .775.631 1.406 1.406 1.406h5.625c.775 0 1.406-.631 1.406-1.406v-3.75c0-.775-.631-1.406-1.406-1.406m-3.282 5.625h-2.344a.47.47 0 0 1-.469-.469v-3.75a.47.47 0 0 1 .469-.469h2.344v4.688m3.75-.469a.47.47 0 0 1-.469.469h-2.344v-4.688h2.344a.47.47 0 0 1 .469.469v3.75"
                      fill="#000000"></path>
                  <path
                      d="M55.438 48.875h-5.625c-.775 0-1.406.631-1.406 1.406v3.75c0 .775.631 1.406 1.406 1.406h5.625c.775 0 1.406-.631 1.406-1.406v-3.75c0-.775-.631-1.406-1.406-1.406M52.156 54.5h-2.344a.47.47 0 0 1-.469-.469v-3.75a.47.47 0 0 1 .469-.469h2.344V54.5m3.75-.469a.47.47 0 0 1-.469.469h-2.344v-4.688h2.344a.47.47 0 0 1 .469.469v3.75"
                      fill="#000000"></path>
                  <path
                      d="M22.499 36.348c-.527-.178-.76-.28-.76-.512c0-.188.194-.35.597-.35c.399 0 .691.102.854.172l.207-.663a2.778 2.778 0 0 0-1.044-.183c-.967 0-1.549.475-1.549 1.094c0 .527.443.862 1.124 1.072c.491.155.686.286.686.512c0 .237-.225.393-.65.393c-.394 0-.776-.112-1.025-.226l-.188.679c.23.113.692.221 1.16.221c1.123 0 1.651-.517 1.651-1.126c0-.512-.34-.846-1.063-1.083"
                      fill="#000000"></path>
                  <path
                      d="M26.276 35.492c.327 0 .589.063.776.134l.188-.651c-.163-.076-.527-.162-1.007-.162c-1.239 0-2.236.689-2.236 1.929c0 1.035.729 1.815 2.145 1.815c.498 0 .881-.08 1.051-.156l-.141-.641a2.59 2.59 0 0 1-.771.119c-.825 0-1.311-.459-1.311-1.186c.001-.808.572-1.201 1.306-1.201"
                      fill="#000000"></path>
                  <path d="M30.254 36.268h-1.525v-1.396h-.928v3.631h.928v-1.52h1.525v1.52h.923v-3.631h-.923z"
                        fill="#000000"></path>
                  <path
                      d="M33.788 34.813c-1.208 0-1.991.813-1.991 1.901c0 1.035.71 1.849 1.924 1.849c1.197 0 2.01-.723 2.01-1.912c-.001-1.004-.686-1.838-1.943-1.838m-.017 3.098c-.62 0-.996-.502-.996-1.213c0-.706.364-1.234.989-1.234c.638 0 .99.561.99 1.213c0 .706-.359 1.234-.983 1.234"
                      fill="#000000"></path>
                  <path
                      d="M38.144 34.813c-1.209 0-1.992.813-1.992 1.901c0 1.035.71 1.849 1.924 1.849c1.198 0 2.011-.723 2.011-1.912c-.001-1.004-.688-1.838-1.943-1.838m-.019 3.098c-.62 0-.996-.502-.996-1.213c0-.706.364-1.234.989-1.234c.639 0 .99.561.99 1.213c0 .706-.358 1.234-.983 1.234"
                      fill="#000000"></path>
                  <path d="M41.622 34.872h-.929v3.631h2.557v-.69h-1.628z" fill="#000000"></path>
                  <path
                      d="M38.563 26.375a6.563 6.563 0 1 0-13.126 0a6.563 6.563 0 1 0 13.126 0m-11.25 0a4.689 4.689 0 1 1 9.378.002a4.689 4.689 0 0 1-9.378-.002"
                      fill="#000000"></path>
                  <path
                      d="M32.938 27.313v-3.75c0-.516-.422-.938-.938-.938s-.938.422-.938.938v2.813h-.938c-.516 0-.938.422-.938.938s.422.938.938.938H32a.943.943 0 0 0 .938-.939"
                      fill="#000000"></path>
                  <path
                      d="M61.063 58.25h-.938v-30h.634c1.055 0 1.53-.755 1.059-1.677l-3.077-6.021c-.472-.922-1.721-1.677-2.775-1.677H40.107l-7.17-5.804v-2.29c3.75 2.992 7.5-6.446 11.25-3.453c-3.75-5.294-7.5 1.841-11.25-3.453v-.937C32.938 2.422 32.516 2 32 2s-.938.422-.938.938v10.134l-7.17 5.804H8.035c-1.055 0-2.304.755-2.775 1.677l-3.077 6.021c-.472.922.004 1.677 1.059 1.677h.634v30h-.938a.94.94 0 0 0-.938.937v1.875a.94.94 0 0 0 .938.937h58.125a.94.94 0 0 0 .937-.937v-1.875a.94.94 0 0 0-.937-.938M17 58.25H5.75v-30h8.937c.018.163.05.318.1.459c.245.685.957 1.416 2.214 1.416V58.25zm25 2.594H22v-1.5h20v1.5M26.375 58.25V47h5.156v11.25h-5.156m6.094 0V47h5.156v11.25h-5.156m12.656 0H39.5V47h1.875v-1.881s-6.443-3.893-8.487-5.348a1.586 1.586 0 0 0-1.775 0c-2.044 1.455-8.487 5.348-8.487 5.348V47H24.5v11.25h-5.625v-30H17c-.516 0-.611-.269-.214-.596l14.49-11.934c.199-.163.462-.245.724-.245s.524.082.724.245l14.49 11.934c.397.327.302.596-.214.596h-1.875v30m13.125 0H47V30.125c1.257 0 1.969-.731 2.214-1.416c.05-.141.082-.296.1-.459h8.937v30z"
                      fill="#000000"></path>
                  <path d="M29.246 52.156h1.348v.681h-1.348z" fill="#000000"></path>
                  <path d="M33.406 52.156h1.348v.681h-1.348z" fill="#000000"></path>
                </svg>
                <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                    required // Make this field required
                >
                  <option value="" disabled>Select School</option>
                  {schools.map(school => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-items-start">
                <a
                    href="/login"
                    className="link link-primary font-semibold text-xs no-underline text-left p-1"
                >
                  Sudah punya akun?
                </a>
              </div>
              <div
                  onClick={handleRegister}
                  className="btn btn-block btn-primary"
              >
                Register
              </div>
              <div className="divider text-sm">OR</div>
              <div className="w-full flex justify-center items-center gap-4">
                <button className="btn btn-circle dark:btn-neutral">
                  <img className="w-6" src="/icons8-google.svg" alt="google"/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
  );
};

export default Register;

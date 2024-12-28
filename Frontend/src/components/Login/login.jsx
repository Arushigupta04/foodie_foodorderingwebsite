// import React, { useState, useEffect } from "react";
// import "./login.css";
// import SignInImage from "../../assets/log.jpg";
// import { useCookies } from "react-cookie";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const serverURL = "https://foodie-foodorderingwebsite.onrender.com";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [cookies, setCookie] = useCookies(["token", "userEmail"]); // Save user email in cookies
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${serverURL}/api/signin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log(data);
//       localStorage.setItem("token", data.token);  

//       if (response.ok) {
//         setCookie("token", data.token, { path: "/" });
//         setCookie("userEmail", email, { path: "/" }); // Save email in cookies
//         toast.success("Login successful! Redirecting...", {
//           position: "top-right",
//           autoClose: 3000, // Auto-close after 3 seconds
//         });
//         setTimeout(() => (window.location.href = "/menu"), 2000);
//       } else {
//         setError(data.error || "Something went wrong");
//         toast.error(data.error || "Login failed. Please try again.", {
//           position: "top-right",
//           autoClose: 3000, // Auto-close after 3 seconds
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred, please try again later.");
//       toast.error("An error occurred, please try again later.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   // Automatically clear error after 3 seconds
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(""), 3000);
//       return () => clearTimeout(timer); // Clear timeout on component unmount
//     }
//   }, [error]);

//   return (
//     <>
//       <section className="sign-in">
//         <div className="container">
//           <div className="signin-content">
//             <div className="signin-image">
//               <figure>
//                 <img src={SignInImage} alt="sign in" />
//               </figure>
//               <a href="/sign-up" className="signup-image-link">
//                 Create an account
//               </a>
//             </div>

//             <div className="signin-form">
//               <h2 className="form-title">Sign in</h2>
//               <form onSubmit={handleSubmit} className="register-form" id="login-form">
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     placeholder="Your Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-group password-group">
//                   <input
//                     type={passwordVisible ? "text" : "password"}
//                     name="password"
//                     id="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <span
//                     className="eye-icon"
//                     onClick={() => setPasswordVisible(!passwordVisible)}
//                   >
//                     {passwordVisible ? (
//                       <i className="fas fa-eye-slash"></i>
//                     ) : (
//                       <i className="fas fa-eye"></i>
//                     )}
//                   </span>
//                 </div>
//                 <div className="form-group form-button">
//                   <input
//                     type="submit"
//                     name="signin"
//                     id="signin"
//                     className="form-submit"
//                     value="Log in"
//                   />
//                 </div>
//                 {error && <p className="error-text">{error}</p>}
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//       <ToastContainer />
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import "./login.css";
import SignInImage from "../../assets/log.jpg";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";  // Add react-router-dom for navigation

const serverURL = "https://foodie-foodorderingwebsite.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token", "userEmail"]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();  // For navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state to true

    try {
      const response = await fetch(`${serverURL}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);

      if (response.ok) {
        setCookie("token", data.token, { path: "/" });
        setCookie("userEmail", email, { path: "/" });
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/menu"), 2000);  // Redirect using React Router
      } else {
        setError(data.error || "Something went wrong");
        toast.error(data.error || "Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred, please try again later.");
      toast.error("An error occurred, please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);  // Set loading state back to false
    }
  };

  // Automatically clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={SignInImage} alt="sign in" />
              </figure>
              <a href="/sign-up" className="signup-image-link">
                Create an account
              </a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <form onSubmit={handleSubmit} className="register-form" id="login-form">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group password-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </span>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value={loading ? "Logging in..." : "Log in"} // Change button text when loading
                    disabled={loading}  // Disable button when loading
                  />
                </div>
                {error && <p className="error-text">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;

// export default Login;

import React from "react";
import onsoo from "../assets/Images/futuristic-sports-car-qx65b3sxm4ed6g6v.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
const Login = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const Navigate = useNavigate();

  const googleSubmit = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const userRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          },
        );
        const emails = userRes.data.email;
        if (!emails) {
          alert("Google login failed: No email found");
          return;
        }
        // Only send email to backend for Google login
        const blockedDomains = ["opayq.com", "tempmail.com", "mailinator.com"];
        const emailDomain = emails.split("@")[1];
        if (!blockedDomains.includes(emailDomain)) {
          axios
            .post(
              "http://localhost:3000/authorisation/login",
              { googleEmail: emails },
              { withCredentials: true },
            )
            .then((response) => {
              if (response.data.status === "success") {
                console.log(response.data);
                Navigate("/dashboard", { replace: true });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
              } else {
                alert("Record does not exist");
              }
            })
            .catch((error) => {
              console.error("Error during login:", error);
              alert("Login failed");
            });
        } else {
          alert(
            "Login with temporary or disposable email addresses is not allowed.",
          );
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
  });

  const submit = async () => {
    const formData = {
      email,
      passWord,
    };
    try {
      const postData = await axios.post(
        "http://localhost:3000/authorisation/login",
        formData,
      );
      console.log(postData);
      const response = await postData.data;
      if (response.status == "success") {
        localStorage.setItem("token", response.token);
        Navigate("/dashboard");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-full m-0 overflow-hidden">
      <div className="grid grid-cols-1 gap-0 mt-0 rounded-lg h-fit bg-slate-50">
        <div>
          <h3 className="mt-0 mb-10 ml-2 text-sm font-bold text-black ">
            HOSPITAL MANAGEMENT
          </h3>
          <div
            className="flex flex-col items-center justify-center pb-5 pl-20 pr-20 
          border-2 border-gray-300 rounded-lg h-fit w-[70%] lg:w-[35%] mx-auto my-20"
          >
            <h1 className="mt-2 mb-4 text-4xl font-bold">
              Holla,
              <br /> Welcome Back
            </h1>

            <p className="mb-16 text-sm text-teal-950">
              Hey,Welcome back to your special place
            </p>
            <div className="grid grid-cols-1 font-semibold">
              <div>
                <label className="font-semibold">Email:</label>
                <input
                  type="email"
                  className="lg:w-[100%]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="font-semibold">password:</label>{" "}
                <input
                  type="password"
                  className="lg:w-[100%]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input type="checkbox" />{" "}
                <label className="font-semibold">Remember me</label>
              </div>

              <input
                type="Button"
                value="Sign in"
                onClick={submit}
                className="text-lg bg-blue-700 cursor-pointer text-cyan-100"
              />
              <p className="my-8 text-sm text-center text-teal-950">
                Or Sign in With
              </p>
              <input
                type="Button"
                value="Google"
                onClick={googleSubmit}
                className="text-lg font-bold text-black cursor-pointer bg-slate-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

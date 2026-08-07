import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../Data/BackEndUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const emailRef = useRef<any>();
    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();
    const navigate = useNavigate();

    async function signup(){
        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(BACKEND_URL + "/app/v1/signup", {
            email,
            username,
            password
        })

        alert("You have signed up");
        navigate("/signin");
    }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create Account
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 ">
          <Input reference={emailRef} placeholder="Enter Email" type="email" />
          <Input reference={usernameRef} placeholder="Enter Username" type="string" />
          <Input reference={passwordRef} placeholder="Enter Password" type="password" />
        </div>

        {/* Button */}
        <div className="mt-6">
          <Button 
            onClick={signup}
            variant="primary" 
            size="md" 
            text="Submit" 
            fullWidth={true} 
          />
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
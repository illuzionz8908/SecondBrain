import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../Data/BackEndUrl";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernamerRef = useRef<any>();
    const passowrdRef = useRef<any>();
    const navigate = useNavigate();

    async function signin(){
        const username = usernamerRef.current?.value;
        const password = passowrdRef.current?.value;

        const response = await axios.post(BACKEND_URL + "/app/v1/signin", {
            username,
            password
        })

        const jwt = response.data.token;
        localStorage.setItem("token", jwt);

        //redirect the user to the dashboard if its authenticated
        navigate("/dashboard");
    }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input reference={usernamerRef} placeholder="Enter your username" type="string" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input reference={passowrdRef} placeholder="Enter your password" type="password" />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mt-2">
          <a href="/forgot-password" className="text-sm text-purple-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Button 
            onClick={signin}
            variant="primary" 
            size="md" 
            text="Sign In" 
            fullWidth={true} 
          />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
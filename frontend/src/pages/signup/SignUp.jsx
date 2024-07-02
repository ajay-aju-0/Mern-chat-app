import { useState } from "react"
import { Link } from "react-router-dom"
import GenderCheckBox from "./GenderCheckBox"
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {
    const [ inputs, setInputs ] = useState({
        fullname:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:""
    });

    const { signup, loading } = useSignup();

    const handleCheckBoxChange = (gender) => {
        setInputs({...inputs,gender})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await signup(inputs);
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Sign up &nbsp; 
                <span className="text-blue-500">
                    ChatApp
                </span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="label p-2">
                        <span className="text-base font-bold label-text text-white">Fullname</span>
                    </label>
                    <input type="text" 
                           placeholder="Enter fullname" 
                           className="w-full input input-bordered h-10"
                           value={inputs.fullname}
                           onChange={(e)=>setInputs({...inputs,fullname:e.target.value})} />
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base font-bold label-text text-white">Username</span>
                    </label>
                    <input type="text"
                           placeholder="Enter username" 
                           className="w-full input input-bordered h-10"
                           value={inputs.username}
                           onChange={(e)=>setInputs({...inputs,username:e.target.value})} />
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base font-bold label-text text-white">Password</span>
                    </label>
                    <input type="password"
                           placeholder="Enter password"
                           className="w-full input input-bordered h-10"
                           value={inputs.password}
                           onChange={(e)=>setInputs({...inputs,password:e.target.value})} />
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base font-bold label-text text-white">Confirm Password</span>
                    </label>
                    <input type="password"
                           placeholder="Enter password"
                           className="w-full input input-bordered h-10"
                           value={inputs.confirmPassword}
                           onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})} />
                </div>

                <GenderCheckBox onCheckBoxChange = {handleCheckBoxChange} selectedGender = {inputs.gender} />                <div className="inline-block"></div>

                <Link to="/login" className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block font-semibold ml-20">
                    Already have an account?
                </Link>

                <div>
                    <button className="btn btn-block btn-sm mt-2 bg-blue-400 font-bold" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
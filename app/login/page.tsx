"use client";
import React, {useState } from "react";
import { useForm } from "react-hook-form";
import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ButtonLoaderSvg, ClosedPassSvge, DiabotsLogo, OpenPassSvg } from "@/components/Svgs";
import {redirect} from "next/navigation"
type SignInFormData = {
  email: string;
  labName: string;
  password: string;
  confirmPassword: string;
};


const LoginPage:React.FC = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setError,
  } = useForm<SignInFormData>();
 
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const userData = session.data?.user
  const submitSignInForm = async (data: SignInFormData) => {
    console.log("Data found:", data);
    try {
      const res = await signIn("credentials", {redirect: false,email: data.email,password: data.password});

      if (res?.status === 200) {
        router.push('/lab-planner')
        reset();
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const inputChange = (e:any) => {
    const { name, value } = e.target;
    let passMessage = ''; 
  if (name === 'email') {

    if (!emailRegex.test(value)) {
      setError('email', { type: 'manual', message: 'Invalid email format' });
    } else {
      clearErrors('email'); 
    }
  }
  }

  return (
        <>
        <div
        className="absolute inset-0 z-30 flex h-screen w-screen items-center justify-center overflow-y-auto scroll-smooth bg-gray-700 bg-opacity-10"></div>
        <div className="absolute top-10 left-10 h-16 w-16">
         <Link href='/' className="hover:bg-black">
          <DiabotsLogo/>
         </Link>
         
        </div>
        <Link href='/contact-form' className="absolute z-50 top-10 right-10 text-lg font-semibold"><span>Contact Us</span></Link>
      <div
        className="absolute top-1/2 left-1/2 z-50 w-4/12 translate-x-[-50%] translate-y-[-50%] min-w-[25rem] bg-white px-6 pb-6 pt-8">
        <button
          className="-pt-10 absolute top-1 right-1 rounded-full fill-gray-500 pr-1 pb-1 hover:bg-gray-700 hover:fill-white">
          <Link href='/' className="hover:fill-white"><svg viewBox="0 0 20 20" className="h-6 w-6">
            <path d="M13.414 12l3.293 3.293a1 1 0 11-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 11-1.414-1.414L10.586 12l-3.293-3.293a1 1 0 111.414-1.414L12 10.586l3.293-3.293a1 1 0 111.414 1.414L13.414 12z" />
          </svg></Link>
          </button>
          <div className="rounded-lg border-x border-b border-gray-800 pb-4 mt-5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSignIn(true)}
                className={`appearance-none ${
                  isSignIn
                    ? "border-t-[3px] border-r border-gray-800 bg-white text-gray-700"
                    : "border-t-[3px] border-l-2 border-gray-800 bg-gray-800 text-white"
                } -ml-[0.05rem] w-full rounded-tl-md border-l border-r-gray-600 py-2 px-4 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none font-bold`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`appearance-none ${
                  isSignIn
                    ? "border-t-[3px] border-l-2 border-gray-800 bg-gray-800 text-white"
                    : "border-t-[3px] border-r border-gray-800 bg-white text-gray-800"
                } -mr-[0.05rem] w-full rounded-tr-md border-l border-r-gray-600 py-2 px-4 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none font-bold`}
              >
                Sign Up
              </button>
             
            </div>
            {isSignIn ? (
              <>
                <form onSubmit={handleSubmit(submitSignInForm)}>
                  <div className="mb-4 mt-4 px-4">
                    <div className="flex justify-start items-center">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Email {errors.email && errorMessage ? <span className="text-rose-600 font-bold text-sm">*</span> : <span className="">*</span>}
                    </label>
                    {errors.email && (
                      <span className="text-xs text-rose-600 ml-2 -mt-2">
                        {errors.email.message}
                      </span>
                    )}
                    {errorMessage && (
                      <span className="text-xs text-red-600 ml-2 -mt-2">Invalid email or password.</span>
                    )
                    }
                    </div>
                    <input
                      id="email"
                      type="text"
                      autoComplete='new-password'
                      {...register('email', {
                      required: 'required',
                      pattern: {
                      value: emailRegex,
                      message: 'Invalid email format',
                      },
                   })}
                   onChange={inputChange}
                      className="appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"/>
              </div>
                  <div className="mb-6 px-4">
                  <div className="flex justify-start items-center">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      Password  {errors.password ? <span className="text-rose-600 font-bold text-sm">*</span> : <span className="">*</span>}
                    </label>
                    {errors.password && (
                      <span className="text-xs text-rose-600 ml-2 -mt-2">
                         {errors.password.message}
                      </span>
                    )}
                    </div>
                    <div className="flex justify-between items-center">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "required",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/,
                          message:
                            "Invalid Password",
                        },
                      })}
                      onChange={inputChange}
                      className="appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"
                    />
                    <div className="absolute right-[3.5rem]" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (<OpenPassSvg/>) : (<ClosedPassSvge/>)}
                    </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center justify-between px-5">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-800" required={false}/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500 dark:text-gray-800">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <span
                    //   onClick={() => setPassReset(false)}
                      className="inline-block cursor-pointer align-baseline text-sm font-bold text-gray-800 hover:text-gray-500"
                    >
                      <Link href='/forgotform'>Forgot Password?</Link>
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4">
                  <button
                    type="submit"
                    className={`focus:shadow-outline w-full rounded-full bg-gray-800 py-2 px-4 font-bold text-white hover:bg-gray-700 focus:outline-none flex justify-center items-center ${
                      isSubmitting ? "cursor-not-allowed" : ""
                    }`}
                  >
                  {isSubmitting ? (
                    <><ButtonLoaderSvg/> <span>Sign In</span></>
                    ) : (
                      "Sign In"
                    )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <SignUpForm/>
            )}
          </div>
      </div>
      </>
      
  );
};

export default LoginPage;
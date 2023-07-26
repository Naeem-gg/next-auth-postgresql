"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ButtonLoaderSvg, ClosedPassSvge, OpenPassSvg } from "./Svgs";

type SignupFormData = {
  name: string;
  email: string;
  labname: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm<SignupFormData>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;

  const submitsignUpForm = async (response: SignupFormData) => {
    console.log("Data found:", response);
    if (response.email) {
      const value  = response.email;
      if (!emailRegex.test(value)) {
        setError("email", { type: "manual", message: "Invalid email format" });
      } else if (/[A-Z]/.test(value)) {
        setError("email", { type: "manual", message: "Email should not contain uppercase letters" });
      } else {
        clearErrors("email");
        try {
          const res = await axios.post("/api/register", response);
          console.log(res);
          reset();
          setErrorMessage(
            "You have successfully registered. Please proceed to the login page."
          );
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 500) {
              setErrorMessage("Email already exist.");
            }
          }
        }
      }
    }
    
  };
  const inputChange = (e: any) => {
    const { name, value } = e.target;
    let passMessage = "";
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setError("email", { type: "manual", message: "Invalid email format" });
      } else if (/[A-Z]/.test(value)) {
        setError("email", { type: "manual", message: "Email should not contain uppercase letters" });
      } else {
        clearErrors("email");
      }
    }
    if (name === "password") {
      if (!passwordRegex.test(value)) {
        if (!/(?=.*[a-z])/.test(value)) {
          passMessage += "\n- At least one lowercase letter";
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          passMessage += "\n- At least one uppercase letter";
        }
        if (!/(?=.*\d)/.test(value)) {
          passMessage += "\n- At least one digit";
        }
        if (!/(?=.*[!@#$%^&*()])/.test(value)) {
          passMessage += "\n- At least one special character";
        }
        if (value.length < 8) {
          passMessage += "\n- Minimum 8 characters";
        }
        setError("password", {
          type: "manual",
          message: passMessage,
        });
      } else {
        clearErrors("password");
      }
    }
    if (name === "name") {
      if (!/^[A-Za-z\s]*$/ .test(value)) {
        setError("name", {
          type: "manual",
          message: "Name should contain only letters",
        });
      } else if (value.length < 5) {
        setError("name", {
          type: "manual",
          message: "Name should have a minimum of 5 characters",
        });
      } else {
        clearErrors("name");
      }
    }
    if (name === "labname") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setError("labname", {
          type: "manual",
          message: "Lab Name should contain only letters",
        });
      } else if (value.length < 5) {
        setError("labname", {
          type: "manual",
          message: "Lab Name should have a minimum of 5 characters",
        });
      } else {
        clearErrors("labname");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitsignUpForm)} className="space-y-4">
      <div className="mb-4 mt-4 px-4">
        {errorMessage && (
          <h4
            className={
              errorMessage === "Email already exist."
                ? "rounded-md border-2 border-red-400 bg-red-100 px-3 py-1 text-sm text-red-500"
                : "rounded-md border-2 border-green-400 bg-green-100 px-3 py-1 text-sm text-green-500"
            }
          >
            {errorMessage}
          </h4>
        )}
      </div>
      <div className="mb-4 px-4">
        <div className="flex items-center justify-start">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Name{" "}
            {errors.name ? (
              <span className="text-sm font-bold text-rose-600">*</span>
            ) : (
              <span className="">*</span>
            )}
          </label>
          {errors.name && (
            <span className="ml-2 -mt-2 text-xs text-rose-600">
              {errors.name.message}
            </span>
          )}
        </div>
        <input
          id="name"
          type="text"
          autoComplete="new-password"
          {...register("name", {
            required: "required",
          })}
          onChange={inputChange}
          className="w-full appearance-none rounded border border-gray-300 py-2 px-4 leading-tight text-gray-700 focus:border-gray-700 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mb-4 mt-4 px-4">
        <div className="flex items-center justify-start">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-800"
          >
            Email{" "}
            {errors.email ? (
              <span className="text-sm font-bold text-rose-600">*</span>
            ) : (
              <span className="">*</span>
            )}
          </label>
          {errors.email && (
            <span className="ml-2 -mt-2 text-xs text-rose-600">
              {errors.email.message}
            </span>
          )}
          {/* // : (
                    //     <span className="text-xs text-rose-600 ml-2 -mt-2">
                    //       {errorMessage === 'Email already exists.' ? 'Email already exists.': ''}
                    //     </span>
                    // )} */}
        </div>
        <input
          id="email"
          type="text"
          autoComplete="new-password"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: emailRegex,
              message: "Invalid email format",
            },
          })}
          onChange={inputChange}
          className="w-full appearance-none rounded border border-gray-300 py-2 px-4 leading-tight text-gray-800 focus:border-gray-800 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mb-4 px-4">
        <div className="flex items-center justify-start">
          <label
            htmlFor="labname"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Lab Name{" "}
            {errors.labname ? (
              <span className="text-sm font-bold text-rose-600">*</span>
            ) : (
              <span className="">*</span>
            )}
          </label>
          {errors.labname && (
            <span className="ml-2 -mt-2 text-xs text-rose-600">
              {errors.labname.message}
            </span>
          )}
        </div>
        <input
          id="labname"
          type="text"
          autoComplete="new-password"
          {...register("labname", {
            required: "required",
          })}
          onChange={inputChange}
          className="w-full appearance-none rounded border border-gray-300 py-2 px-4 leading-tight text-gray-700 focus:border-gray-700 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mb-6 px-4">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-gray-700"
          >Password
            {errors.password ? (
              <span className="text-sm font-bold text-rose-600">*</span>
            ) : (
              <span className="">*</span>
            )}
          </label>
          {errors.password && (
            <p className="mb-2 rounded-md border border-rose-400 bg-rose-100 px-3 py-1 text-sm text-rose-500">
              {errors.password.message}
            </p>
          )}
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "required",
              pattern: {
                value: passwordRegex,
                message:
                  "Password must contain at least one capital letter, one small letter, one number, one Special character, and be at least 8 characters",
              },
            })}
            onChange={inputChange}
            className="w-full appearance-none rounded border border-gray-300 py-2 px-4 leading-tight text-gray-700 focus:border-gray-700 focus:bg-white focus:outline-none"
          />
      </div>
      <div className="mb-4 px-4">
        <div className="flex items-center justify-start">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-bold text-gray-700"
          >Confirm Password
            {errors.confirmPassword ? (
              <span className="text-sm font-bold text-rose-600">*</span>
            ) : (
              <span className="">*</span>
            )}
          </label>
          {errors.confirmPassword && (
            <span className="ml-2 -mt-2 text-xs text-rose-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: "required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          onChange={inputChange}
          className="w-full appearance-none rounded border border-gray-300 py-2 px-4 leading-tight text-gray-700 focus:border-gray-800 focus:bg-white focus:outline-none"
        />
      </div>
      <div className='mb-4 px-4 flex justify-start items-center'>
      <input type="checkbox" className='w-4 h-4 appe' onClick={() => setShowPassword(!showPassword)}/><span className='text-sm ml-1'>Show password</span>
      </div>
      <div className="flex items-center justify-between px-4">
        <button
          type="submit"
          className={`focus:shadow-outline flex w-full items-center justify-center rounded-full bg-gray-800 py-2 px-4 font-bold text-white hover:bg-gray-700 focus:outline-none ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <ButtonLoaderSvg />
              <span>Sign Up</span>
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
      {/* <div className="w-full flex items-center justify-between py-5 px-4">
                        <hr className="w-full bg-gray-400" />
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  " />
                    </div>
                  <div className="px-4">
                  <button aria-label="Continue with google" role="button" className="bg-white appearance-none border border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-800 flex">
                        <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                            <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                            <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                            <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                        </svg>
                        <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                    </button>
                  </div> */}
    </form>
  );
};

export default SignUpForm;

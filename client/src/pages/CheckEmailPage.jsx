import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserAstronaut } from 'react-icons/fa6';

export default function RegisterPage() {
  const [data, setData] = useState({
    email: '',
  });

  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2">
          <FaUserAstronaut size={60} />
        </div>

        <h3 className="font-bold">Welcome to Chat App</h3>

        <form
          className="grid gap-4 mt-2 "
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const URL = `${import.meta.env.VITE_BACKEND_URL}/api/email`;

            try {
              const response = await axios.post(URL, data);

              toast.success(response.data.message);

              console.log('response', response);

              if (response.data.success) {
                setData({
                  email: '',
                });

                navigate('/password', {
                  state: response?.data?.data,
                });
              }
            } catch (error) {
              toast.error(error?.response?.data?.message);
            }
          }}
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus: outline-primary "
              value={data.email}
              onChange={(event) => {
                setData((currentState) => {
                  return { ...currentState, email: event.target.value };
                });
              }}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-1 font-bold text-white leading-relaxed tracking-wide">
            Next
          </button>
        </form>

        <p className="my-2 text-center ">
          New User ?{' '}
          <Link to={'/register'} className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

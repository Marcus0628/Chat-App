import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: '',
  });

  const [uploadPhoto, setUploadPhoto] = useState('');

  const navigate = useNavigate();

  /*
  const handleOnChange = (event) => {
    const { name, value } = e.target;

    setData((currentState) => {
      return {
        ...currentState,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = (event)=>{
    const file = event.target.file[0]

    setUploadPhoto(file)
    }

  const handleClearUploadPhoto = (event)=>{
    setUploadPhoto(null)
    }  

  */

  //console.log(uploadPhoto);

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <h3 className="font-bold">Welcome to Chat App</h3>

        <form
          className="grid gap-4 mt-5 "
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`;

            try {
              const response = await axios.post(URL, data);
              //console.log('response', response);

              toast.success(response.data.message);

              if (response.data.success) {
                setData({
                  name: '',
                  email: '',
                  password: '',
                  profile_pic: '',
                });

                navigate('/email');
              }
            } catch (error) {
              toast.error(error?.response?.data?.message);
              //console.log('error', error);
            }

            console.log(data);
          }}
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus: outline-primary "
              value={data.name}
              onChange={(event) => {
                setData((currentState) => {
                  return { ...currentState, name: event.target.value };
                });
              }}
              required
            />
          </div>

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

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus: outline-primary "
              value={data.password}
              onChange={(event) => {
                setData((currentState) => {
                  return { ...currentState, password: event.target.value };
                });
              }}
              required
            />
          </div>

          {/* Profilepic */}
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Profile Picture:
              <div className="h-14 bg-slate-200 flex justify-center items-center border-2 rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto.name
                    : 'Upload Your Profile Picture'}
                </p>

                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={(event) => {
                      event.preventDefault();
                      //event.stopPropagation();
                      setUploadPhoto('');
                    }}
                  >
                    <IoMdClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              name="profile_pic"
              id="profile_pic"
              className="bg-slate-100 px-2 py-1 focus: outline-primary hidden "
              onChange={async (event) => {
                const uploadPhoto = await uploadFile(event.target.files[0]);

                console.log('uploadPhoto', uploadPhoto);

                setUploadPhoto(event.target.files[0]);

                setData((currentState) => {
                  return { ...currentState, profile_pic: uploadPhoto?.url };
                });
              }}
            />
          </div>

          <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-1 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>

        <p className="my-2 text-center ">
          Already have account ?{' '}
          <Link to={'/email'} className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

export default function CheckPasswordPage() {
  const [data, setData] = useState({
    password: '',
  });

  console.log(data);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location.state);

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email');
    }
  }, []);

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2 flex flex-col justify-center items-center">
          {/* <FaUserAstronaut size={60} /> */}
          <Avatar
            width={60}
            height={60}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />

          <h2 className="font-semibold text-lg mt-1">{location.state?.name}</h2>
        </div>

        <form
          className="grid gap-4 mt-2 "
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;

            try {
              // const response = await axios.post(URL, {
              //   userId: location?.state?._id,
              //   password: data.password,
              // });

              const response = await axios({
                method: 'POST',
                url: URL,
                data: {
                  userId: location?.state?._id,
                  password: data.password,
                },
                withCredentials: true,
              });

              console.log('response', response);

              toast.success(response.data.message);

              if (response.data.success) {
                dispatch(setToken(response?.data?.token));
                localStorage.setItem('token', response?.data?.token);

                setData({
                  password: '',
                });

                navigate('/');
              }
            } catch (error) {
              toast.error(error?.response?.data?.message);
            }
          }}
        >
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

          <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-1 font-bold text-white leading-relaxed tracking-wide">
            Login
          </button>
        </form>

        <p className="my-2 text-center ">
          <Link
            to={'/forgot-password'}
            className="hover:text-primary font-semibold"
          >
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
}

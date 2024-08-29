import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  setOnlineUser,
  setSocketConnection,
  setUser,
  Logout,
} from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png';
import io from 'socket.io-client';

export default function Homepage() {
  const user = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  console.log('redux user', user);

  async function fetchUserDetails() {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;

      const response = await axios({
        method: 'GET',
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(Logout());
        navigate('/email');
      }

      console.log('Current User Details', response);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  /**Socket Connection*/
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socketConnection.on('onlineUser', (data) => {
      console.log('Data:', data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  console.log('location', location);

  const basePath = location.pathname === '/';

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar />
      </section>

      {/**message component **/}
      <section className={`${basePath && 'hidden'} `}>
        <Outlet />
      </section>

      <div
        className={` justify-center items-center flex-col gap-2 hidden ${
          !basePath ? 'hidden' : 'lg:flex'
        }`}
      >
        <div>
          <img src={logo} alt="Logo" width={250} />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
}

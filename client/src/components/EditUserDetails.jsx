import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import uploadFile from '../helpers/uploadFile';
import Divider from './Divider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

function EditUserDetails({ onClose, user }) {
  const [data, setData] = useState({
    _id: user?._id,
    name: user?.name,
    profile_pic: user?.profile_pic,
  });

  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((currentState) => {
      return {
        ...currentState,
        ...user,
      };
    });
  }, [user]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-5 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit User Details</p>

        <form
          className="grid gap-3 mt-3"
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            try {
              const url = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`;

              const response = await axios({
                method: 'POST',
                url: url,
                data: data,
                withCredentials: true,
              });

              console.log('response', response);

              toast.success(response?.data?.message);

              if (response.data.success) {
                dispatch(setUser(response.data.data));
                onClose();
              }
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data.message);
            }
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={data.name}
              onChange={(event) => {
                setData((currentState) => {
                  return { ...currentState, name: event.target.value };
                });
              }}
              className="w-full py-1 px-2 focus:outline-primary border-0.5 "
            />
          </div>

          <div>
            <label htmlFor="profile_pic">Photo: </label>
            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />

              <button
                type="button"
                className="font-semibold"
                onClick={() => {
                  uploadPhotoRef.current.click();
                }}
              >
                Change Photo
              </button>

              <input
                type="file"
                className="hidden"
                id="profile_pic"
                name="profile_pic"
                ref={uploadPhotoRef}
                onChange={async (event) => {
                  const uploadPhoto = await uploadFile(event.target.files[0]);

                  console.log('uploadPhoto', uploadPhoto);

                  setData((currentState) => {
                    return {
                      ...currentState,
                      profile_pic: uploadPhoto?.url,
                    };
                  });
                }}
              />
            </div>
          </div>

          <Divider />

          <div className="flex gap-2 w-fit ml-auto  ">
            <button
              type="button"
              className="border-primary text-primary border px-4 py-1 rounded hover:bg-primary hover:text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-primary  bg-primary text-white border px-4 py-1 rounded hover:bg-secondary "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserDetails;

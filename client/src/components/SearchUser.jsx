import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import CircularLoading from './CircularLoading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';

function SearchUser({ onClose }) {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchUser = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`;
    try {
      setLoading(true);
      const response = await axios.post(URL, { search: search });

      setTimeout(() => {
        setLoading(false);
      }, 1000);

      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  console.log('searchUser', searchUser);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0  bg-slate-700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-10 p-2">
        {/* Input Search User */}
        <div className="bg-white h-14 overflow-hidden flex ">
          <input
            type="text"
            placeholder="Search User by name, email..."
            className="w-full outline-none py-1 h-full px-2"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/* Display Search User */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/* No User Found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No User Found</p>
          )}

          {/* Loading */}
          {loading && (
            <p>
              <CircularLoading />
            </p>
          )}

          {/* User */}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>
      </div>

      <div
        className=" absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white "
        onClick={onClose}
      >
        <button>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}

export default SearchUser;

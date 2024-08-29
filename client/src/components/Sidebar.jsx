import React, { useEffect, useState } from 'react';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import { FiArrowUpLeft } from 'react-icons/fi';
import SearchUser from './SearchUser';
import { FaImage } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa6';
import { Logout } from '../redux/userSlice';

function Sidebar() {
  const user = useSelector((state) => state?.user);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchUserOpen, setSearchUserOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('editUserOpen', editUserOpen);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('sidebar', user._id);

      socketConnection.on('conversation', (data) => {
        console.log('conversation', data);

        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser.sender?._id === conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });
        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        {/* Chat */}
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && 'bg-slate-200'
              }`
            }
            title="Chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          {/* Search Users */}
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            title="Add Friend"
            onClick={(event) => {
              setSearchUserOpen((currentState) => {
                return !currentState;
              });
            }}
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* User Details */}
          <button
            className="mx-auto"
            title={user?.name}
            onClick={(event) => {
              setEditUserOpen((currentState) => {
                return !currentState;
              });
            }}
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
            <div></div>
          </button>
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            title="Logout"
            onClick={() => {
              dispatch(Logout());
              navigate('/email');
              localStorage.clear();
            }}
          >
            <span className="-ml-2">
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className="  h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-12">
              <div
                className="flex justify-center items-center my-4
               text-slate-500"
              >
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}

          {allUser.map((conv, index) => {
            return (
              <NavLink
                to={'/' + conv?.userDetails?._id}
                key={conv?._id}
                className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary cursor-pointer rounded hover:bg-slate-100"
              >
                <div>
                  <Avatar
                    imageUrl={conv.userDetails.profile_pic}
                    name={conv?.userDetails?.name}
                    width={40}
                    height={40}
                    userId={conv?.userDetails?._id}
                  />
                </div>

                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-base ">
                    {conv.userDetails.name}
                  </h3>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <div className=" flex items-center gap-1 ">
                      {/* Image on SideBar */}
                      {conv?.lastMsg?.imageURL && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}

                      {/* Video on SideBar */}
                      {conv?.lastMsg?.videoURL && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className="text-ellipsis line-clamp-1 text-slate-500">
                      {conv?.lastMsg?.text}
                    </p>
                  </div>
                </div>

                {/*Unseem Message  */}
                {Boolean(conv?.unseenMsg) && (
                  <p className="text-xs w-6 h-6 flex justify-center items-center  ml-auto p-1 bg-primary text-white font-semibold rounded-full">
                    {conv?.unseenMsg}
                  </p>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/**Edit User Details**/}
      {editUserOpen && (
        <EditUserDetails
          onClose={(event) => {
            setEditUserOpen(false);
          }}
          user={user}
        />
      )}

      {/**Seach User**/}
      {searchUserOpen && (
        <SearchUser
          onClose={(event) => {
            setSearchUserOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Sidebar;

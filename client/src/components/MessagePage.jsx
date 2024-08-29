import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { HiDotsVertical } from 'react-icons/hi';
import { FaAngleLeft } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { FaImage } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { IoMdSend } from 'react-icons/io';
import uploadFile from '../helpers/uploadFile';
import CircularLoading from './CircularLoading';
import backgroundImage from '../assets/wallpaper.jpeg';
import moment from 'moment';

function MessagePage() {
  const params = useParams();
  const user = useSelector((state) => state?.user);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    profile_pic: '',
    online: false,
    _id: '',
  });

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);

  const [message, setMessage] = useState({
    text: '',
    imageUrl: '',
    videoUrl: '',
  });

  const [loading, setLoading] = useState(false);

  const [allMessage, setAllMessage] = useState([]);

  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [allMessage]);

  console.log('params', params.userId);
  //console.log('socketConnection', socketConnection);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);

      socketConnection.emit('seen', params.userId);

      socketConnection.on('message-user', (data) => {
        console.log('User Details', data);
        setDataUser(data);
      });

      socketConnection.on('message', (data) => {
        console.log('message data', data);
        setAllMessage(data);
      });
    }
  }, [socketConnection, params, user]);

  console.log(dataUser);
  console.log('message', message);

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-no-repeat bg-cover "
    >
      <header className=" sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4 ">
          <Link to={'/'} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>

          <div className="w-12 h-12">
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>

        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical />
          </button>
        </div>
      </header>

      {/* Show All Message */}
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        {/* All Message Show Here */}
        <div className="flex flex-col gap-2 py-2 mx-2" ref={currentMessage}>
          {allMessage.map((msg, index) => {
            return (
              <div
                className={`bg-white p-1 py-1 my-2 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                  user._id === msg.msgByUserId ? 'ml-auto bg-teal-100' : ''
                }`}
              >
                <div className="w-full relative">
                  {/* Image */}
                  {msg?.imageURL && (
                    <img
                      src={msg?.imageURL}
                      className="w-full h-full object-scale-down"
                    />
                  )}

                  {/* Video */}
                  {msg?.videoURL && (
                    <video
                      src={msg?.videoURL}
                      className="w-full h-full object-scale-down"
                      controls
                    ></video>
                  )}
                </div>

                <p className="px-2">{msg.text}</p>
                <p className="text-xs ml-auto w-fit bg-tra">
                  {moment(msg.createdtAt).format('hh:mm')}
                </p>
              </div>
            );
          })}
        </div>

        {/* Upload Image Display */}
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={() => {
                setMessage((currentState) => {
                  return { ...currentState, imageUrl: '' };
                });
                setOpenImageVideoUpload(false);
              }}
            >
              <IoMdClose size={30} />
            </div>

            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                alt="Please Upload a Image"
                className=" aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}
        {/* Upload Video Display */}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={() => {
                setMessage((currentState) => {
                  return { ...currentState, videoUrl: '' };
                });
                setOpenImageVideoUpload(false);
              }}
            >
              <IoMdClose size={30} />
            </div>

            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                className=" aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              ></video>
            </div>
          </div>
        )}
        {loading && (
          <div className="w-full h-full sticky bottom-0 flex justify-center items-center">
            <CircularLoading />
          </div>
        )}
      </section>

      {/* Send Message */}
      <section className="h-16 bg-white flex items-center px-4">
        <div className=" relative ">
          <button
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
            onClick={(event) => {
              setOpenImageVideoUpload((currentState) => {
                return !currentState;
              });
            }}
          >
            <FaPlus size={20} />
          </button>

          {/* Video and Image(Pop-up) */}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3  hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>

                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3  hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  id="uploadImage"
                  onChange={async (event) => {
                    setLoading(true);

                    const uploadImage = await uploadFile(event.target.files[0]);

                    setLoading(false);

                    setOpenImageVideoUpload(false);

                    setMessage((currentState) => {
                      return { ...currentState, imageUrl: uploadImage?.url };
                    });
                  }}
                  className="hidden"
                />

                <input
                  type="file"
                  id="uploadVideo"
                  onChange={async (event) => {
                    setLoading(true);

                    const uploadVideo = await uploadFile(event.target.files[0]);

                    setLoading(false);

                    setOpenImageVideoUpload(false);

                    setMessage((currentState) => {
                      return { ...currentState, videoUrl: uploadVideo?.url };
                    });
                  }}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>

        {/* Input Box */}
        <form
          action=""
          className="h-full w-full flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();

            if (message.text || message.imageUrl || message.videoUrl) {
              if (socketConnection) {
                socketConnection.emit('new message', {
                  sender: user?._id,
                  receiver: params.userId,
                  text: message.text,
                  imageUrl: message.imageUrl,
                  videoUrl: message.videoUrl,
                  msgByUserId: user?._id,
                });

                setMessage({
                  text: '',
                  imageUrl: '',
                  videoUrl: '',
                });
              }
            }
          }}
        >
          <input
            type="text"
            placeholder="Type Here Message..."
            className="py-1 px-4 outline-none w-full h-full"
            value={message.text}
            onChange={(event) => {
              setMessage((currentState) => {
                return { ...currentState, text: event.target.value };
              });
            }}
          />

          <button className="text-primary hover:text-secondary">
            <IoMdSend size={28} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default MessagePage;

import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

function Avatar({ userId, name, imageUrl, width, height }) {
  let avatarName = '';

  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  if (name) {
    const splitName = name?.split(' ');

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-cyan-200',
    'bg-sky-200',
  ];

  const randomNumber = Math.floor(Math.random() * bgColor.length);

  const isOnline = onlineUser.includes(userId);

  //console.log(randomNumber);

  return (
    <div className="relative">
      <div
        className={`text-slate-800 overflow-hidden rounded-full font-bold `}
        style={{ width: width + 'px', height: height + 'px' }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            width={width}
            height={height}
            className="overflow-hidden rounded-full"
          />
        ) : name ? (
          <div
            style={{ width: width + 'px', height: height + 'px' }}
            className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}
          >
            {avatarName}
          </div>
        ) : (
          <FaUserAstronaut size={width} />
        )}

        {isOnline && (
          <div className="bg-green-600 p-1 absolute bottom-0.5 right-0.5 z-10 rounded-full w-2.5 h-2.5"></div>
        )}
      </div>
    </div>
  );
}

export default Avatar;

import Image from 'next/image';
import { useEffect, useState } from 'react';
import getAvatarUrl from '../../services/getAnImageFromStorage';

// @ts-ignore
const Avatar = ({ userId }) => {
  // console.log('userId: ', userId);
  const noImage = '/noProfileImage.png';
  const [avatarUrl, setAvatarUrl] = useState(noImage);

  useEffect(() => {
    getAvatarUrl(userId).then((url) => {
      setAvatarUrl(url);
    });
  }, [userId]);

  return (
    <div className='hidden md:grid md:object-center md:m-4 md:w-64 md:h-64'>
      <Image
        className='inline object-cover rounded-full'
        src={avatarUrl}
        width={256}
        height={256}
        alt='Profile image'
      />
    </div>
  );
};

export default Avatar;

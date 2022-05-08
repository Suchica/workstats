import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import GearIcon from '../../public/gear-svgrepo-com.svg';

interface GearIconType {
  mt: number;
  mb: number;
  href: string;
  alt: string;
}

const GearIconLink = ({ mt, mb, href, alt }: GearIconType) => {
  return (
    <Link href={href} passHref={true}>
      {/* Instead of opening a separate tab, it's too slow and doesn't take advantage of Next's good features. */}
      <a target='_blank' className={`mt-${mt} mb-${mb} ml-2`}>
        <Image
          src={GearIcon}
          alt={alt}
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
        />
      </a>
    </Link>
  );
};

export default GearIconLink;

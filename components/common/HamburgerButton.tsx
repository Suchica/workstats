interface HamburgerProps {
  color: string;
  handleClick: () => void;
  margin?: string;
}

const HamburgerButton = ({ color, handleClick, margin }: HamburgerProps) => {
  return (
    <button
      className={`flex items-center justify-center w-7 h-7 rounded-full focus:outline-none focus:shadow-outline ${margin}`}
      onClick={handleClick}
    >
      <svg
        className={`h-7 w-7 ${color}`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 6h16M4 12h16M4 18h16'
        />
      </svg>
    </button>
  );
};

export default HamburgerButton;

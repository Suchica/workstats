import { useEffect, useState } from 'react';

interface SpecifyPeriodFixedTermTypes {
  currentTimeframe?: {
    timeframe: {
      label: string;
    };
    setTimeFrame({}): void; // func dispatchSetState
  };
  label: string;
}

const SpecifyPeriodFixedTerm = ({
  currentTimeframe,
  label
}: SpecifyPeriodFixedTermTypes) => {
  const [bgColor, setBgColor] = useState('bg-white');
  const [textColor, setTextColor] = useState('slate-800');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setBgColor(
      currentTimeframe?.timeframe.label === label ? 'bg-gray-500' : 'bg-white'
    );
    setTextColor(
      currentTimeframe?.timeframe.label === label ? 'white' : 'slate-800'
    );
    setDisabled(currentTimeframe?.timeframe.label === label ? true : false);
  }, [currentTimeframe, label]);

  const handleOnClick = () => {
    currentTimeframe?.setTimeFrame({ label: label });
  };

  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className={`rounded-lg ${bgColor} shadow text-${textColor} text-sm md:text-base px-2 md:px-3 py-1 mx-1 md:mx-2 my-1`}
    >
      {label}
    </button>
  );
};

export default SpecifyPeriodFixedTerm;

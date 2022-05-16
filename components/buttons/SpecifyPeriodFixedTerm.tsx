interface SpecifyPeriodFixedTermTypes {
  bgColor?: string;
  disabled?: boolean;
  label: string;
  textColor?: string;
}

const SpecifyPeriodFixedTerm = ({
  bgColor = 'bg-white',
  disabled = false,
  label,
  textColor = 'slate-800'
}: SpecifyPeriodFixedTermTypes) => {
  return (
    <button
      disabled={disabled}
      className={`rounded-lg ${bgColor} shadow text-${textColor} px-3 py-1 mx-2 my-1`}
    >
      {label}
    </button>
  );
};

export default SpecifyPeriodFixedTerm;

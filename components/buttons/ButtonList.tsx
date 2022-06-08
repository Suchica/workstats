import SpecifyPeriodFixedTerm from './SpecifyPeriodFixedTerm';

const ButtonList = () => {
  return (
    <div>
      <h2 className='text-xl mt-4 mb-2 px-5'>Select a time period (WIP)</h2>
      <div className='flex flex-wrap mt-4 px-2'>
        <SpecifyPeriodFixedTerm
          label='Full'
          disabled={true}
          bgColor='bg-gray-500'
          textColor='white'
        />
        <SpecifyPeriodFixedTerm label='This Year' disabled={true} />
        <SpecifyPeriodFixedTerm label='Last Year' disabled={true} />
        <SpecifyPeriodFixedTerm label='This Month' disabled={true} />
        <SpecifyPeriodFixedTerm label='Last Month' disabled={true} />
        <SpecifyPeriodFixedTerm label='This Week' disabled={true} />
        <SpecifyPeriodFixedTerm label='Last Week' disabled={true} />
      </div>
    </div>
  );
};

export default ButtonList;

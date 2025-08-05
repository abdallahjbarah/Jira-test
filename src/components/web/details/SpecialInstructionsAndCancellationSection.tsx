
const SpecialInstructionsAndCancellationSection = ({
  specialInstructions,
  cancellationPolicy,
}: {
  specialInstructions: string;
  cancellationPolicy: string;
}) => {
  return (
    <div className='flex flex-col laptopM:flex-row justify-between items-start w-full gap-10'>
      <div className='flex-1'>
        <h2 className='font-custom-700 text-custom-22 laptopM:text-custom-30 text-text_1 mb-10'>
          Special Instructions
        </h2>
        <div
          className='font-custom-400 text-custom-16 laptopM:text-custom-16  text-text_2'
          dangerouslySetInnerHTML={{ __html: specialInstructions }}
        />
      </div>
      <div className='flex-1'>
        <h2 className='font-custom-700 text-custom-22 laptopM:text-custom-30 text-text_1 mb-10'>
          Cancellation Policy
        </h2>
        <div
          className='font-custom-400 text-custom-22 laptopM:text-custom-26 text-text_2'
          dangerouslySetInnerHTML={{ __html: cancellationPolicy }}
        />
      </div>
    </div>
  );
};

export default SpecialInstructionsAndCancellationSection;

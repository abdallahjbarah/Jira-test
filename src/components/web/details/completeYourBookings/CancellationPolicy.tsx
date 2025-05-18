interface CancellationPolicyProps {
  policy: string;
}

const CancellationPolicy: React.FC<CancellationPolicyProps> = ({ policy }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
        Cancellation Policy
      </h2>
      <p className='text-gray-500 font-custom-400 font-sans text-xl'>
        {policy}
      </p>
    </div>
  );
};

export default CancellationPolicy; 
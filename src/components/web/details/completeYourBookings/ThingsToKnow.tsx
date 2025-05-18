interface ThingsToKnowProps {
  content: string;
  onReadMore: () => void;
}

const ThingsToKnow: React.FC<ThingsToKnowProps> = ({ content, onReadMore }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
        Things to Know
      </h2>
      <p className='font-custom-400 text-text_1 font-sans text-xl'>
        {content}{' '}
        <button 
          onClick={onReadMore}
          className='underline font-custom-500 text-text_1 font-sans text-xl'
        >
          Read more
        </button>
      </p>
    </div>
  );
};

export default ThingsToKnow; 
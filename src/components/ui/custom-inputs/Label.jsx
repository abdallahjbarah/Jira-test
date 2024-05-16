export default function Label({ text, isRequired = false, forId, style }) {
  return (
    <label className={`mb-[4px] ${style}`} htmlFor={forId}>
      <span className='text-grayscale_3 select-none text-custom-xs font-medium leading-custom-24'>
        {text}
      </span>
      {isRequired && (
        <span className='text-custom-xs font-medium leading-custom-24 text-red-500'>
          {' '}
          *
        </span>
      )}
    </label>
  );
}

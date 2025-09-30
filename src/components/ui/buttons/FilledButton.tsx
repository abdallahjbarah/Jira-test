import { ReactElement, ReactNode } from 'react';
import CustomLink from '../CustomLink';

interface FilledButtonProps {
  path?: string;
  text: string;
  icon?: ReactNode;
  width?: string;
  height?: string;
  iconLeft?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  buttonType: 'button' | 'submit' | 'reset';
  isDisable?: boolean;
  className?: string;
}

function FilledButton({
  path,
  text,
  icon,
  width,
  height,
  iconLeft = false,
  isButton = false,
  onClick,
  buttonType,
  isDisable,
  className = 'rounded-custom-16',
}: FilledButtonProps): ReactElement {
  const buttonStyles = {
    normal: `text-custom-16 font-custom-700 bg-primary_1 justify-center items-center inline-flex text-primary_4 hover:bg-primary_2 transaction-colors duration-200 select-none mobileMtext-custom-24 ${className}`,
    disabled: `text-custom-16 font-custom-700 bg-secondary_4 justify-center items-center inline-flex text-primary_2 transaction-colors duration-200 select-none mobileM:text-custom-24 ${className}`,
  };

  const buttonClass = isDisable ? buttonStyles.disabled : buttonStyles.normal;

  return isButton ? (
    <button
      onClick={onClick}
      type={buttonType || 'button'}
      disabled={isDisable}
      className={`${width} ${height} ${buttonClass}`}
    >
      {iconLeft ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      )}
    </button>
  ) : isDisable ? (
    <div className={`${width} ${height} ${buttonStyles.disabled}`}>{text}</div>
  ) : (
    <CustomLink path={path || ''}>
      <button type='button' className={`${width} ${height} ${buttonClass}`}>
        {iconLeft ? (
          <>
            {icon}
            {text}
          </>
        ) : (
          <>
            {text}
            {icon}
          </>
        )}
      </button>
    </CustomLink>
  );
}

export default FilledButton;

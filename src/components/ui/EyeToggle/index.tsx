import React from 'react';
import Image from 'next/image';

interface EyeToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

const EyeToggle: React.FC<EyeToggleProps> = ({ isOpen, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="transform transition-transform hover:scale-110"
        >
            {isOpen ? (
                <Image
                    src="/SVGs/shared/eye.svg"
                    alt="Show password"
                    width={24}
                    height={24}
                    className="[&>path]:fill-[#47C409]"
                />
            ) : (
                <Image
                    src="/SVGs/shared/eye-slash.svg"
                    alt="Hide password"
                    width={24}
                    height={24}
                    className="[&>path]:fill-[#47C409]"
                />
            )}
        </button>
    );
};

export default EyeToggle; 
import React from 'react';
import Image from 'next/image';

interface ProfilePhotoUploadProps {
    profileImage: string | null;
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
    profileImage,
    onImageUpload,
}) => {
    return (
        <div className='flex flex-col items-center space-y-4'>
            <div className='relative group'>
                <div className='relative w-40 h-40 overflow-hidden bg-gray-100 rounded-full'>
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt='Profile'
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <svg
                            className='absolute w-44 h-44 text-gray-400 -left-2'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                                clipRule='evenodd'
                            />
                        </svg>
                    )}
                    {/* Camera Icon Overlay */}
                    <div
                        className='absolute bottom-0 left-0 right-0 h-12 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer'
                        onClick={() => document.getElementById('profile-upload')?.click()}
                    >
                        <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                            />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                        </svg>
                    </div>
                </div>
                <input
                    type='file'
                    id='profile-upload'
                    className='hidden'
                    accept='image/*'
                    onChange={onImageUpload}
                />
            </div>
        </div>
    );
};

export default ProfilePhotoUpload; 
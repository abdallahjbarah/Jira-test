'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ProfilePhotoUpload from '@/components/shared/ProfilePhotoUpload';
import { CountrySelectionModal } from '@/components/shared/CountriesSelectionModal/CountrySelectionModal';
import Image from 'next/image';
import DateRangePicker from '@/components/shared/DateRangePicker';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ProfilePage(): React.ReactElement {
    const { t } = useTranslation();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showCountryModal, setShowCountryModal] = useState(false);
    const [country, setCountry] = useState({ code: 'jo', name: 'Jordan', dialCode: '962' });
    const [searchQuery, setSearchQuery] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [location, setLocation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [nationalitySearch, setNationalitySearch] = useState('');
    const [locationSearch, setLocationSearch] = useState('');

    const nationalityRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);
    const genderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (nationalityRef.current && !nationalityRef.current.contains(event.target as Node)) {
                setShowNationalityDropdown(false);
                setNationalitySearch('');
            }
            if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
                setShowLocationDropdown(false);
                setLocationSearch('');
            }
            if (genderRef.current && !genderRef.current.contains(event.target as Node)) {
                setShowGenderDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Helper to format input as DD-MM-YYYY
    function formatBirthdayInput(value: string) {
        let digits = value.replace(/\D/g, '');
        digits = digits.slice(0, 8);
        let formatted = '';
        if (digits.length > 0) formatted += digits.slice(0, 2);
        if (digits.length > 2) formatted += '-' + digits.slice(2, 4);
        if (digits.length > 4) formatted += '-' + digits.slice(4, 8);
        return formatted;
    }

    // Helper to validate and parse DD-MM-YYYY to Date
    function parseBirthday(birthday: string): Date | null {
        const [d, m, y] = birthday.split('-');
        if (d && m && y && d.length === 2 && m.length === 2 && y.length === 4) {
            const date = new Date(`${y}-${m}-${d}`);
            if (!isNaN(date.getTime())) return date;
        }
        return null;
    }

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-2 py-8">
            {/* Header */}
            <div className="absolute right-0 top-0">
                <div className="h-[90px] w-[420px] overflow-hidden">
                    <div className="absolute right-0 top-0 h-[90px] w-[420px] rounded-bl-[60px] bg-[#FE360A] flex items-center justify-end pr-10">
                        <span className="text-white text-[26px] font-bold">Personal Information</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[600px] px-8 py-10 mt-16 mb-8">
                {/* Profile Photo */}
                <div className="flex flex-col items-center mb-8">
                    <ProfilePhotoUpload
                        profileImage={profileImage}
                        onImageUpload={handleImageUpload}
                    />
                </div>
                {/* Form */}
                <form className="space-y-5">
                    {/* Name */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-500 text-[14px] mb-1">First Name</label>
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" className="w-full h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-500 text-[14px] mb-1">Last Name</label>
                            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" className="w-full h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md" />
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-gray-500 text-[14px] mb-1">Email</label>
                        <input value="" disabled placeholder="Email" className="w-full h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md" />
                    </div>
                    {/* Phone (match signup page, but fit width) */}
                    <div className="flex w-full gap-2">
                        <div className="w-[111px]">
                            <button
                                type="button"
                                onClick={() => setShowCountryModal(true)}
                                style={{ border: '1px solid #EEEEEE' }}
                                className="flex w-[111px] h-[48px] items-center justify-between bg-white rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] hover:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] focus:border-[#47C409] transform transition-all hover:shadow-md"
                            >
                                <div className="country-select flex items-center gap-2">
                                    <div className="flag">
                                        <span className={`fi fi-${country.code} w-[20px] h-[13px]`}></span>
                                    </div>
                                    <div className="phone-code w-[31px] h-[17px] text-gray-900">
                                        +{country.dialCode}
                                    </div>
                                </div>
                                <div className="arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
                                        <path fill="none" stroke="#555555" strokeWidth="1.5" d="M1 1l4 4 4-4"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="Phone Number"
                            className="flex-1 h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md"
                        />
                    </div>
                    <CountrySelectionModal
                        isOpen={showCountryModal}
                        onClose={() => setShowCountryModal(false)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onCountrySelect={c => { setCountry(c); setShowCountryModal(false); }}
                    />
                    {/* Birthday */}
                    <div className="relative">
                        <label className="block text-gray-500 text-[14px] mb-1">Birthday</label>
                        <input
                            value={birthday}
                            onChange={e => setBirthday(formatBirthdayInput(e.target.value))}
                            placeholder="DD-MM-YYYY"
                            className="w-full h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md pr-12"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-0 bottom-0 my-auto flex items-center justify-center h-[48px] w-[24px] p-0 m-0 z-10 pt-6"
                            onClick={() => setShowDatePicker(true)}
                            tabIndex={-1}
                            style={{ lineHeight: 0 }}
                        >
                            <Image src="/SVGs/shared/calendar-2.svg" alt="Calendar" width={24} height={24} />
                        </button>
                    </div>
                    {showDatePicker && (
                        <div
                            className="fixed inset-0 z-[9999] flex items-center justify-center"
                            onClick={e => {
                                if (e.target === e.currentTarget) setShowDatePicker(false);
                            }}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-60" style={{ pointerEvents: 'auto' }} />
                            <div
                                className="relative z-10"
                                style={{ pointerEvents: 'auto' }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
                                        <button
                                            onClick={() => setShowDatePicker(false)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            <XMarkIcon className="h-6 w-6 text-gray-500" />
                                        </button>
                                    </div>
                                    <DateRangePicker
                                        selectedDates={(() => {
                                            const parsed = parseBirthday(birthday);
                                            return parsed ? [parsed] : [];
                                        })()}
                                        onChange={(dates) => {
                                            if (dates.length > 0) {
                                                const date = dates[0];
                                                const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
                                                setBirthday(formattedDate);
                                                setShowDatePicker(false);
                                            }
                                        }}
                                        mode="single"
                                        minDate={new Date(1900, 0, 1)}
                                        maxDate={new Date()}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Gender */}
                    <div>
                        <label className="block text-gray-500 text-[14px] mb-1">Gender</label>
                        <div className="relative" ref={genderRef}>
                            <input
                                value={gender}
                                readOnly
                                placeholder="Gender"
                                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                className="w-full h-[48px] rounded-[8px] border border-[#EEEEEE] px-4 text-[16px] font-medium text-black bg-white focus:border-[#47C409] focus:ring-1 focus:ring-[#47C409] pr-10 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                            >
                                <Image src="/SVGs/shared/arrow-down.svg" alt="Dropdown" width={16} height={16} />
                            </button>
                            {showGenderDropdown && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-[#EEEEEE] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                    <div className="py-1">
                                        {['Female', 'Male', 'Prefer not to say'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className="w-full px-4 py-2 text-left text-[16px] font-medium text-black hover:bg-gray-50 focus:outline-none"
                                                onClick={() => {
                                                    setGender(option);
                                                    setShowGenderDropdown(false);
                                                }}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Nationality */}
                    <div>
                        <label className="block text-gray-500 text-[14px] mb-1">Nationality</label>
                        <div className="relative" ref={nationalityRef}>
                            <input
                                value={nationality}
                                readOnly
                                placeholder="Nationality"
                                onClick={() => setShowNationalityDropdown(!showNationalityDropdown)}
                                className="w-full h-[48px] rounded-[8px] border border-[#EEEEEE] px-4 text-[16px] font-medium text-black bg-white focus:border-[#47C409] focus:ring-1 focus:ring-[#47C409] pr-10 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setShowNationalityDropdown(!showNationalityDropdown)}
                            >
                                <Image src="/SVGs/shared/arrow-down.svg" alt="Dropdown" width={16} height={16} />
                            </button>
                            {showNationalityDropdown && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-[#EEEEEE] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] max-h-[300px] overflow-y-auto">
                                    <div className="py-1">
                                        <div className="px-4 py-2 sticky top-0 bg-white border-b border-[#EEEEEE]">
                                            <input
                                                type="text"
                                                placeholder="Search nationality..."
                                                value={nationalitySearch}
                                                onChange={(e) => setNationalitySearch(e.target.value)}
                                                className="w-full h-[40px] rounded-[8px] border border-[#EEEEEE] px-4 text-[16px] font-medium text-black bg-white focus:border-[#47C409] focus:ring-1 focus:ring-[#47C409]"
                                            />
                                        </div>
                                        {[
                                            'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguan', 'Argentine', 'Armenian', 'Australian',
                                            'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian', 'Belarusian', 'Belgian', 'Belizean', 'Beninese',
                                            'Bhutanese', 'Bolivian', 'Bosnian', 'Botswanan', 'Brazilian', 'British', 'Bruneian', 'Bulgarian', 'Burkinabe', 'Burmese',
                                            'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian',
                                            'Comoran', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech', 'Danish', 'Djibouti', 'Dominican',
                                            'Dutch', 'East Timorese', 'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean', 'Eritrean', 'Estonian', 'Ethiopian', 'Fijian',
                                            'Filipino', 'Finnish', 'French', 'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian', 'Greek', 'Grenadian',
                                            'Guatemalan', 'Guinea-Bissauan', 'Guinean', 'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian', 'Icelander', 'Indian',
                                            'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian', 'Jamaican', 'Japanese', 'Jordanian',
                                            'Kazakhstani', 'Kenyan', 'Kittian and Nevisian', 'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian', 'Lebanese', 'Liberian', 'Libyan',
                                            'Liechtensteiner', 'Lithuanian', 'Luxembourger', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivan', 'Malian', 'Maltese',
                                            'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian', 'Moldovan', 'Monacan', 'Mongolian', 'Moroccan', 'Mosotho',
                                            'Motswana', 'Mozambican', 'Namibian', 'Nauruan', 'Nepalese', 'New Zealander', 'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean',
                                            'Northern Irish', 'Norwegian', 'Omani', 'Pakistani', 'Palauan', 'Panamanian', 'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish',
                                            'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Rwandan', 'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean',
                                            'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander',
                                            'Somali', 'South African', 'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss',
                                            'Syrian', 'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian or Tobagonian', 'Tunisian', 'Turkish',
                                            'Tuvaluan', 'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani', 'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian',
                                            'Zimbabwean'
                                        ].filter(option =>
                                            option.toLowerCase().includes(nationalitySearch.toLowerCase())
                                        ).map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className="w-full px-4 py-2 text-left text-[16px] font-medium text-black hover:bg-gray-50 focus:outline-none"
                                                onClick={() => {
                                                    setNationality(option);
                                                    setShowNationalityDropdown(false);
                                                }}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Location */}
                    <div>
                        <label className="block text-gray-500 text-[14px] mb-1">Location</label>
                        <div className="relative" ref={locationRef}>
                            <input
                                value={location}
                                readOnly
                                placeholder="Location"
                                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                className="w-full h-[48px] rounded-[8px] border border-[#EEEEEE] px-4 text-[16px] font-medium text-black bg-white focus:border-[#47C409] focus:ring-1 focus:ring-[#47C409] pr-10 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                            >
                                <Image src="/SVGs/shared/arrow-down.svg" alt="Dropdown" width={16} height={16} />
                            </button>
                            {showLocationDropdown && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-[#EEEEEE] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] max-h-[300px] overflow-y-auto">
                                    <div className="py-1">
                                        <div className="px-4 py-2 sticky top-0 bg-white border-b border-[#EEEEEE]">
                                            <input
                                                type="text"
                                                placeholder="Search location..."
                                                value={locationSearch}
                                                onChange={(e) => setLocationSearch(e.target.value)}
                                                className="w-full h-[40px] rounded-[8px] border border-[#EEEEEE] px-4 text-[16px] font-medium text-black bg-white focus:border-[#47C409] focus:ring-1 focus:ring-[#47C409]"
                                            />
                                        </div>
                                        {[
                                            'Amman-Jordan', 'Abu Dhabi-UAE', 'Dubai-UAE', 'Riyadh-Saudi Arabia', 'Jeddah-Saudi Arabia',
                                            'Cairo-Egypt', 'Alexandria-Egypt', 'Beirut-Lebanon', 'Doha-Qatar', 'Kuwait City-Kuwait',
                                            'Manama-Bahrain', 'Muscat-Oman', 'Sanaa-Yemen', 'Baghdad-Iraq', 'Damascus-Syria',
                                            'Jerusalem-Palestine', 'Tel Aviv-Israel', 'Istanbul-Turkey', 'Ankara-Turkey', 'Tehran-Iran',
                                            'London-UK', 'Manchester-UK', 'Paris-France', 'Lyon-France', 'Berlin-Germany',
                                            'Munich-Germany', 'Rome-Italy', 'Milan-Italy', 'Madrid-Spain', 'Barcelona-Spain',
                                            'New York-USA', 'Los Angeles-USA', 'Chicago-USA', 'Toronto-Canada', 'Vancouver-Canada',
                                            'Sydney-Australia', 'Melbourne-Australia', 'Tokyo-Japan', 'Osaka-Japan', 'Seoul-South Korea',
                                            'Beijing-China', 'Shanghai-China', 'Mumbai-India', 'Delhi-India', 'Singapore-Singapore',
                                            'Kuala Lumpur-Malaysia', 'Jakarta-Indonesia', 'Bangkok-Thailand', 'Manila-Philippines', 'Hanoi-Vietnam',
                                            'Moscow-Russia', 'St. Petersburg-Russia', 'Warsaw-Poland', 'Prague-Czech Republic', 'Vienna-Austria',
                                            'Amsterdam-Netherlands', 'Brussels-Belgium', 'Stockholm-Sweden', 'Oslo-Norway', 'Copenhagen-Denmark',
                                            'Athens-Greece', 'Lisbon-Portugal', 'Dublin-Ireland', 'Helsinki-Finland', 'Budapest-Hungary',
                                            'Bucharest-Romania', 'Sofia-Bulgaria', 'Zagreb-Croatia', 'Belgrade-Serbia', 'Ljubljana-Slovenia',
                                            'Bratislava-Slovakia', 'Vilnius-Lithuania', 'Riga-Latvia', 'Tallinn-Estonia', 'Kiev-Ukraine',
                                            'Minsk-Belarus', 'Tbilisi-Georgia', 'Yerevan-Armenia', 'Baku-Azerbaijan', 'Almaty-Kazakhstan',
                                            'Tashkent-Uzbekistan', 'Ashgabat-Turkmenistan', 'Dushanbe-Tajikistan', 'Bishkek-Kyrgyzstan', 'Ulaanbaatar-Mongolia',
                                            'Kathmandu-Nepal', 'Dhaka-Bangladesh', 'Colombo-Sri Lanka', 'Male-Maldives', 'Thimphu-Bhutan',
                                            'Naypyidaw-Myanmar', 'Phnom Penh-Cambodia', 'Vientiane-Laos', 'Bandar Seri Begawan-Brunei', 'Dili-East Timor',
                                            'Port Moresby-Papua New Guinea', 'Suva-Fiji', 'Apia-Samoa', "Nuku'alofa-Tonga", 'Tarawa-Kiribati',
                                            'Majuro-Marshall Islands', 'Palikir-Micronesia', 'Yaren-Nauru', 'Funafuti-Tuvalu', 'South Tarawa-Kiribati'
                                        ].filter(option =>
                                            option.toLowerCase().includes(locationSearch.toLowerCase())
                                        ).map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className="w-full px-4 py-2 text-left text-[16px] font-medium text-black hover:bg-gray-50 focus:outline-none"
                                                onClick={() => {
                                                    setLocation(option);
                                                    setShowLocationDropdown(false);
                                                }}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex gap-6 justify-center mt-8">
                        <button type="submit" className="w-[160px] h-[56px] rounded-[8px] bg-[#47C409] text-white text-[20px] font-bold shadow-lg hover:bg-[#3ba007] transition">Save</button>
                        <button type="button" className="w-[160px] h-[56px] rounded-[8px] bg-[#47C409] text-white text-[20px] font-bold shadow-lg hover:bg-[#3ba007] transition">Cancel</button>
                    </div>
                </form>
            </div>
        </main>
    );
} 
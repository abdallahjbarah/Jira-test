import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { countries as countriesData } from 'countries-list';

interface Country {
    code: string;
    name: string;
    dialCode: string;
}

interface CountrySelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onCountrySelect: (country: Country) => void;
}

export const CountrySelectionModal: React.FC<CountrySelectionModalProps> = ({
    isOpen,
    onClose,
    searchQuery,
    onSearchChange,
    onCountrySelect,
}) => {
    const countries = React.useMemo(() => {
        return Object.entries(countriesData)
            .map(([code, data]) => ({
                code: code.toLowerCase(),
                name: data.name,
                dialCode: data.phone.toString(),
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredCountries = React.useMemo(() => {
        return countries.filter(country =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country.dialCode.includes(searchQuery)
        );
    }, [countries, searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 animate-fadeIn">
                {/* Modal Header */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="flex w-full justify-center">
                        <h2 className="w-[114px] h-[24px] text-center font-bold text-[#222222] leading-[24px]">
                            Country Key
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute right-6 rounded-full p-1 hover:bg-gray-100 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                {/* Search Input */}
                <div className="mb-6 flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-[312px] h-[48px] rounded-[24px] border-none bg-white px-4 text-gray-700 shadow-[0px_3px_20px_rgba(0,0,0,0.08)] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-lg"
                    />
                    <div className="mt-6 h-[1px] w-[312px] bg-[#EEEEEE]"></div>
                </div>

                {/* Countries List */}
                <div className="max-h-[400px] overflow-y-auto">
                    {filteredCountries.map((country) => (
                        <button
                            key={country.code}
                            type="button"
                            onClick={() => onCountrySelect(country)}
                            className="flex w-full items-center justify-between px-2 py-3 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flag">
                                    <span className={`fi fi-${country.code} w-[20px] h-[13px]`}></span>
                                </div>
                                <span className="text-gray-900">{country.name}</span>
                            </div>
                            <div className="phone-code w-[31px] h-[17px] text-gray-500">
                                +{country.dialCode}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}; 
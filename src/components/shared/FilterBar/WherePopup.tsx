import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import { useFetchSearchDestination } from '@/lib/apis/shared/useFetchSearchDestination';
import debounce from '@/utils/helpers/debounce';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const FILTERS = [
    { key: 'all', label: 'All', icon: '' },
    { key: 'experiences', label: 'Experiences', icon: '/SVGs/shared/experincesz.svg' },
    { key: 'stays', label: 'Stays', icon: '/SVGs/shared/stays-icon.svg' },
    { key: 'events', label: 'Events', icon: '/SVGs/shared/events-icon.svg' },
    { key: 'offers', label: 'Offers & Packages', icon: '/SVGs/shared/offers.svg' },
    { key: 'products', label: 'Products', icon: '/SVGs/shared/products.svg' },
];

interface WherePopupProps {
    isOpen: boolean;
    onClose: () => void;
    currentCollectionStatus?: string;
    onNext?: (selectedLocation: { type: string; id?: string; name: string; searchType: string }) => void;
    onClear?: () => void;
    onFilterSelect?: (filterKey: string) => void;
}

const WherePopup: React.FC<WherePopupProps> = ({ isOpen, onClose, currentCollectionStatus, onNext, onClear, onFilterSelect }) => {
    const [selected, setSelected] = useState(currentCollectionStatus || 'all');
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<{ type: string; id?: string; name: string; searchType: string } | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useTranslation();

    const { data: searchResults, isLoading } = useFetchSearchDestination(debouncedSearchText);

    const debouncedSetSearch = React.useCallback(
        debounce((value: string) => {
            setDebouncedSearchText(value);
        }, 300),
        []
    );

    // Reset search text when popup opens
    React.useEffect(() => {
        if (isOpen) {
            setSearchText('');
            setDebouncedSearchText('');
            setShowSuggestions(false);
        }
    }, [isOpen]);

    const handleFilterSelect = (filterKey: string) => {
        setSelected(filterKey);
        onFilterSelect?.(filterKey);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        debouncedSetSearch(value);
        setShowSuggestions(!!value);
        setSelectedLocation(null);
    };

    const handleSearchResultSelect = (result: any) => {
        const { searchType } = result;
        setSearchText(searchType === 'site' ? result.name :
                     searchType === 'city' ? result.city :
                     result.country);
        setSelectedLocation({
            type: searchType,
            id: searchType === 'site' ? result._id :
                searchType === 'city' ? result.cityId :
                result._id,
            name: searchType === 'site' ? result.name :
                  searchType === 'city' ? result.city :
                  result.country,
            searchType
        });
        setShowSuggestions(false);
    };

    const handleNext = () => {
        const lang = searchParams.get('lang') || 'en';

        if (selectedLocation) {
            if (selectedLocation.type === 'site') {
                router.push(`/${lang}/details/${selectedLocation.id}`);
                onClose();
            } else {
                // Apply location selection
                onNext?.(selectedLocation);

                // Navigate based on selected filter
                if (selected === 'all') {
                    router.push(`/${lang}`);
                } else {
                    router.push(`/${lang}/${selected}`);
                }
                onClose();
            }
        } else {
            // If no location selected, just navigate based on filter
            if (selected === 'all') {
                router.push(`/${lang}`);
            } else {
                router.push(`/${lang}/${selected}`);
            }
            onClose();
        }
    };

    const handleClose = () => {
        setSelected(currentCollectionStatus || 'all');
        setSearchText('');
        setDebouncedSearchText('');
        setShowSuggestions(false);
        setSelectedLocation(null);
        onClose();
    };

    const handleClearSearch = () => {
        // Clear all local state
        setSearchText('');
        setDebouncedSearchText('');
        setShowSuggestions(false);
        setSelectedLocation(null);
        setSelected(currentCollectionStatus || 'all');

        // Clear parent state
        if (onClear) {
            onClear();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} width="400px" canClose>
            <div className="flex flex-col">
                <div className="px-4 pt-4">
                <div className="flex gap-3 overflow-x-auto pb-2">
                        {FILTERS.map((filter) => {
                            const isSelected = selected === filter.key;
                            return (
                        <button
                            key={filter.key}
                            onClick={() => handleFilterSelect(filter.key)}
                                    className={`flex flex-col items-center px-5 py-1 rounded-full transition-all whitespace-nowrap
                                        ${isSelected ? 'bg-[#FF3A1E] text-white' : 'bg-gray-50 text-black'}
                            `}
                        >
                            {filter.key === 'all' ? (
                                        <span className="text-base font-custom-500 pt-3">{filter.label}</span>
                            ) : (
                                <>
                                            {filter.icon && (
                                                <Image
                                                    src={filter.icon}
                                                    alt={filter.label}
                                                    width={26}
                                                    height={26}
                                                    className={`mb-0.5 transition-all ${
                                                        isSelected
                                                            ? 'filter brightness-0 invert'
                                                            : 'brightness-0 opacity-60'
                                                    }`}
                                                />
                                            )}
                                            <span className="text-sm font-custom-500">{filter.label}</span>
                                </>
                            )}
                        </button>
                            );
                        })}
                    </div>

                    <div className="mt-6 mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                placeholder={t('Search Destination')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF3A1E] focus:outline-none transition-colors"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                <Image
                                    src="/SVGs/shared/search-icon.svg"
                                    alt="Search"
                                    width={20}
                                    height={20}
                                    className="opacity-50"
                                />
                                <button
                                    onClick={handleClearSearch}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Image
                                        src="/SVGs/shared/close-icon.svg"
                                        alt="Clear"
                                        width={16}
                                        height={16}
                                        className="opacity-50"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {showSuggestions && (searchResults?.results?.length > 0 || isLoading) && (
                    <div className="border-t border-gray-100">
                        <div className="max-h-[240px] overflow-y-auto px-4">
                            {isLoading ? (
                                <div className="p-4 text-center text-gray-500">{t('common.loading')}</div>
                            ) : (
                                searchResults?.results.map((result: any, index: number) => (
                                    <button
                                        key={`${result.searchType}-${index}`}
                                        onClick={() => handleSearchResultSelect(result)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors rounded-lg"
                                    >
                                        <Image
                                            src={`/SVGs/shared/${result.searchType === 'city' ? 'map-icon' : result.searchType === 'country' ? 'language' : 'search-icon'}.svg`}
                                            alt={result.searchType}
                                            width={16}
                                            height={16}
                                            className="opacity-60"
                                        />
                                        <span className="flex-1">
                                            {result.searchType === 'site' ? result.name :
                                             result.searchType === 'city' ? result.city :
                                             result.country}
                                        </span>
                                        <span className="text-sm text-gray-400 capitalize">
                                            {result.searchType}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className="px-4 pb-6 pt-4 border-t border-gray-100 mt-2">
                    <div className="flex justify-center">
                    <button
                            onClick={handleNext}
                            disabled={!selectedLocation}
                            className={`w-full max-w-[340px] py-2.5 font-medium rounded-lg transition-colors
                                ${selectedLocation
                                    ? 'bg-[#FF3A1E] text-white hover:bg-[#E63219]'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                            {t('next')}
                    </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default WherePopup;

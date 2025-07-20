import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import { useFetchSearchDestination } from '@/lib/apis/shared/useFetchSearchDestination';
import debounce from '@/utils/helpers/debounce';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/apis';

const FILTERS = [
  { key: 'all', label: 'All', icon: '' },
  {
    key: 'experiences',
    label: 'Experiences',
    icon: '/SVGs/shared/experincesz.svg',
  },
  { key: 'stays', label: 'Stays', icon: '/SVGs/shared/stays-icon.svg' },
  { key: 'events', label: 'Events', icon: '/SVGs/shared/events-icon.svg' },
  {
    key: 'offers',
    label: 'Offers & Packages',
    icon: '/SVGs/shared/offers.svg',
  },
  { key: 'products', label: 'Products', icon: '/SVGs/shared/products.svg' },
];

const SUGGESTIONS_API_URL =
  'https://api.staging.bookagri.com/sites/suggestions?search=';

const fetchInitialSuggestions = async () => {
  // If you want to pass coordinates, add them as a query param here
  const response = await api.url('/sites/suggestions').get().json();
  return response;
};

interface WherePopupProps {
  isOpen: boolean;
  onClose: () => void;
  currentCollectionStatus?: string;
  onNext?: (selectedLocation: {
    type: string;
    id?: string;
    name: string;
    searchType: string;
  }) => void;
  onClear?: () => void;
  onFilterSelect?: (filterKey: string) => void;
  filtersValue?: any;
}

const WherePopup: React.FC<WherePopupProps> = ({
  isOpen,
  onClose,
  currentCollectionStatus,
  onNext,
  onClear,
  onFilterSelect,
  filtersValue,
}) => {
  const [selected, setSelected] = useState(currentCollectionStatus || 'all');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    type: string;
    id?: string;
    name: string;
    searchType: string;
  } | null>(null);
  const [hasTyped, setHasTyped] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const { data: searchResults, isLoading } =
    useFetchSearchDestination(debouncedSearchText);
  const {
    data: initialSuggestions,
    isLoading: isLoadingInitialSuggestions,
    error: initialSuggestionsError,
  } = useQuery({
    queryKey: ['initial-suggestions'],
    queryFn: fetchInitialSuggestions,
    enabled: isOpen && !hasTyped,
    refetchOnWindowFocus: false,
  });

  const debouncedSetSearch = React.useCallback(
    debounce((value: string) => {
      setDebouncedSearchText(value);
    }, 300),
    []
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  // Reset search text when popup opens
  React.useEffect(() => {
    if (isOpen) {
      setSearchText('');
      setDebouncedSearchText('');
      setShowSuggestions(true); // Show suggestions when popup opens
      setHasTyped(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Update internal state when filtersValue changes
  React.useEffect(() => {
    if (filtersValue) {
      // If you want to sync any specific filter to the popup, do it here
      // Example: setSearchText(filtersValue.destinationText || '');
    }
  }, [filtersValue]);

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
    setHasTyped(!!value);
  };

  const handleSearchResultSelect = (result: any) => {
    const { searchType } = result;
    setSearchText(
      searchType === 'site'
        ? result.name
        : searchType === 'city'
          ? result.city
          : result.country
    );
    setSelectedLocation({
      type: searchType,
      id:
        searchType === 'site'
          ? result._id
          : searchType === 'city'
            ? result.cityId
            : result._id,
      name:
        searchType === 'site'
          ? result.name
          : searchType === 'city'
            ? result.city
            : result.country,
      searchType,
    });
    setShowSuggestions(false);
  };

  const handleNext = () => {
    // If a suggestion was picked, use it
    if (selectedLocation) {
      if (selectedLocation.type === 'site') {
        router.push(
          `/${searchParams.get('lang') || 'en'}/details/${selectedLocation.id}`
        );
        onClose();
      } else {
        // Apply location selection
        onNext?.(selectedLocation);
        onClose();
      }
    } else if (searchText.trim()) {
      // If user typed something but didn't pick a suggestion, treat it as a custom location
      const customLocation = {
        type: 'custom',
        name: searchText.trim(),
        searchType: 'custom',
      };
      setSelectedLocation(customLocation);
      onNext?.(customLocation);
      onClose();
    } else {
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
    <Modal isOpen={isOpen} onClose={handleClose} width='400px' canClose>
      <div
        className='flex flex-col'
        style={{ minHeight: '350px', maxHeight: '420px', overflow: 'hidden' }}
      >
        <div className='px-4 pt-4 flex-1 overflow-hidden'>
          <div className='flex gap-3 overflow-x-auto pb-2'>
            {FILTERS.map(filter => {
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
                    <span className='text-base font-custom-500 pt-3'>
                      {filter.label}
                    </span>
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
                      <span className='text-sm font-custom-500'>
                        {filter.label}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div className='mt-6 mb-4'>
            <div className='relative'>
              <input
                ref={inputRef}
                type='text'
                value={searchText}
                onChange={handleSearchChange}
                placeholder={t('Search Destination')}
                className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF3A1E] focus:outline-none transition-colors'
              />
              <div className='absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2'>
                <Image
                  src='/SVGs/shared/search-icon.svg'
                  alt='Search'
                  width={20}
                  height={20}
                  className='opacity-50'
                />
                <button
                  onClick={handleClearSearch}
                  className='p-1 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <Image
                    src='/SVGs/shared/close-icon.svg'
                    alt='Clear'
                    width={16}
                    height={16}
                    className='opacity-50'
                  />
                </button>
              </div>
            </div>
            {/* Suggestions dropdown */}
            {showSuggestions &&
              hasTyped &&
              searchResults &&
              searchResults.results?.length > 0 && (
                <div className='absolute z-10 left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg'>
                  <div className='max-h-60 overflow-y-auto'>
                    {searchResults.results.map((result: any, idx: number) => (
                      <div
                        key={result._id || result.cityId || result.country}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors w-full shadow-md rounded-lg bg-white ${idx !== 0 ? 'border-t border-gray-200' : ''}`}
                        style={{
                          ...(idx !== 0 ? {} : {}),
                          transition: 'background 0.2s, color 0.2s',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#47C409';
                          e.currentTarget.style.color = '#fff';
                          Array.from(
                            e.currentTarget.querySelectorAll('span, svg, img')
                          ).forEach(el => {
                            if (
                              el.tagName === 'SPAN' &&
                              !el.classList.contains('type-badge')
                            )
                              (el as HTMLElement).style.color = '#fff';
                            if (el.tagName === 'IMG')
                              (el as HTMLImageElement).style.filter =
                                'brightness(0) invert(1)';
                          });
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = '';
                          e.currentTarget.style.color = '';
                          Array.from(
                            e.currentTarget.querySelectorAll('span, svg, img')
                          ).forEach(el => {
                            if (
                              el.tagName === 'SPAN' &&
                              !el.classList.contains('type-badge')
                            )
                              (el as HTMLElement).style.color = '';
                            if (el.tagName === 'IMG')
                              (el as HTMLImageElement).style.filter = '';
                          });
                        }}
                        onClick={() => handleSearchResultSelect(result)}
                      >
                        <Image
                          src='/SVGs/shared/map-icon.svg'
                          alt='Location'
                          width={20}
                          height={20}
                          className='opacity-60 flex-shrink-0'
                        />
                        <div className='flex-1 min-w-0'>
                          <span className='truncate block w-full overflow-hidden whitespace-nowrap font-medium text-gray-900'>
                            {result.name || result.city || result.country}
                          </span>
                          <div className='flex items-center gap-2 mt-0.5'>
                            {(result.city || result.country) && (
                              <span className='truncate block w-full overflow-hidden whitespace-nowrap text-xs text-gray-500'>
                                {result.city && result.country
                                  ? `${result.city}, ${result.country}`
                                  : result.city || result.country}
                              </span>
                            )}
                            {result.searchType && (
                              <span
                                className='ml-2 px-2 py-0.5 rounded bg-gray-100 text-xs capitalize type-badge'
                                style={{ color: '#FE3B0A' }}
                              >
                                {result.searchType}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {/* Initial suggestions before typing */}
            {showSuggestions &&
              !hasTyped &&
              initialSuggestions &&
              (initialSuggestions as any)?.results?.length > 0 && (
                <div className='absolute z-10 left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg'>
                  <div className='max-h-60 overflow-y-auto'>
                    {(initialSuggestions as any).results.map(
                      (suggestion: any, idx: number) => (
                        <div
                          key={
                            suggestion._id ||
                            suggestion.cityId ||
                            suggestion.country
                          }
                          className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors w-full shadow-md rounded-lg bg-white ${idx !== 0 ? 'border-t border-gray-200' : ''}`}
                          style={{
                            ...(idx !== 0 ? {} : {}),
                            transition: 'background 0.2s, color 0.2s',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#47C409';
                            e.currentTarget.style.color = '#fff';
                            Array.from(
                              e.currentTarget.querySelectorAll('span, svg, img')
                            ).forEach(el => {
                              if (
                                el.tagName === 'SPAN' &&
                                !el.classList.contains('type-badge')
                              )
                                (el as HTMLElement).style.color = '#fff';
                              if (el.tagName === 'IMG')
                                (el as HTMLImageElement).style.filter =
                                  'brightness(0) invert(1)';
                            });
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = '';
                            e.currentTarget.style.color = '';
                            Array.from(
                              e.currentTarget.querySelectorAll('span, svg, img')
                            ).forEach(el => {
                              if (
                                el.tagName === 'SPAN' &&
                                !el.classList.contains('type-badge')
                              )
                                (el as HTMLElement).style.color = '';
                              if (el.tagName === 'IMG')
                                (el as HTMLImageElement).style.filter = '';
                            });
                          }}
                          onClick={() => handleSearchResultSelect(suggestion)}
                        >
                          <Image
                            src='/SVGs/shared/map-icon.svg'
                            alt='Location'
                            width={20}
                            height={20}
                            className='opacity-60 flex-shrink-0'
                          />
                          <div className='flex-1 min-w-0'>
                            <span className='truncate block w-full overflow-hidden whitespace-nowrap font-medium text-gray-900'>
                              {suggestion.name ||
                                suggestion.city ||
                                suggestion.country}
                            </span>
                            <div className='flex items-center gap-2 mt-0.5'>
                              {(suggestion.city || suggestion.country) && (
                                <span className='truncate block w-full overflow-hidden whitespace-nowrap text-xs text-gray-500'>
                                  {suggestion.city && suggestion.country
                                    ? `${suggestion.city}, ${suggestion.country}`
                                    : suggestion.city || suggestion.country}
                                </span>
                              )}
                              {suggestion.searchType && (
                                <span
                                  className='ml-2 px-2 py-0.5 rounded bg-gray-100 text-xs capitalize type-badge'
                                  style={{ color: '#FE3B0A' }}
                                >
                                  {suggestion.searchType}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {showSuggestions && !hasTyped && isLoadingInitialSuggestions && (
              <div className='absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-2 p-4 text-center text-gray-500'>
                Loading suggestions...
              </div>
            )}
          </div>
        </div>

        <div className='px-4 pb-6 pt-4 border-t border-gray-100 mt-2'>
          <div className='flex justify-center'>
            <button
              onClick={handleNext}
              disabled={
                !searchText.trim() && !selectedLocation && selected === 'all'
              }
              className={`w-full max-w-[340px] py-2.5 font-medium rounded-lg transition-colors
                                ${
                                  !searchText.trim() &&
                                  !selectedLocation &&
                                  selected === 'all'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#FF3A1E] text-white hover:bg-[#E63219]'
                                }
                            `}
            >
              {t('next')}
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .type-badge {
          color: #fe3b0a !important;
        }
        .type-badge:hover {
          color: #fe3b0a !important;
        }
      `}</style>
    </Modal>
  );
};

export default WherePopup;

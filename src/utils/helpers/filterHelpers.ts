import { ReadonlyURLSearchParams } from 'next/navigation';

export interface CollectionFilter {
  type?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  infants?: number;
  [key: string]: any; // For advanced filters
}

export interface FilterFormValues {
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  region: string;
  type: string;
  filters: any;
}

/**
 * Builds a filter object from URL search parameters
 * @param searchParams - The URL search parameters
 * @param baseType - The base collection type filter value
 * @returns A filter object to be used with the collections API
 */
export const buildFiltersFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  baseType?: string,
): CollectionFilter => {
  const baseFilter: CollectionFilter = {
    type: baseType,
  };

  // Extract individual filter parameters from URL
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const infants = searchParams.get('infants');
  const advancedFilters = searchParams.get('filters');

  // Add filters to base filter object if they exist
  if (checkIn) baseFilter.checkIn = checkIn;
  if (checkOut) baseFilter.checkOut = checkOut;
  if (adults) baseFilter.adults = Number(adults);
  if (children) baseFilter.children = Number(children);
  if (infants) baseFilter.infants = Number(infants);

  // Parse and merge advanced filters
  if (advancedFilters) {
    try {
      const parsedFilters = JSON.parse(advancedFilters);
      Object.assign(baseFilter, parsedFilters);
    } catch (error) {
      console.error('Failed to parse advanced filters:', error);
    }
  }

  return baseFilter;
};

/**
 * Builds URL search parameters from a filter object
 * @param filters - The filter object
 * @param currentParams - Current URL search parameters to preserve other params
 * @returns URLSearchParams object ready to be used in URL
 */
export const buildSearchParamsFromFilters = (
  filters: CollectionFilter,
  currentParams: ReadonlyURLSearchParams,
): URLSearchParams => {
  const params = new URLSearchParams(currentParams);

  // Update individual filter params
  if (filters.checkIn) {
    params.set('checkIn', filters.checkIn);
  } else {
    params.delete('checkIn');
  }

  if (filters.checkOut) {
    params.set('checkOut', filters.checkOut);
  } else {
    params.delete('checkOut');
  }

  if (filters.adults && filters.adults > 0) {
    params.set('adults', filters.adults.toString());
  } else {
    params.delete('adults');
  }

  if (filters.children && filters.children > 0) {
    params.set('children', filters.children.toString());
  } else {
    params.delete('children');
  }

  if (filters.infants && filters.infants > 0) {
    params.set('infants', filters.infants.toString());
  } else {
    params.delete('infants');
  }

  // Handle advanced filters
  const advancedFilters = { ...filters };
  delete advancedFilters.type;
  delete advancedFilters.checkIn;
  delete advancedFilters.checkOut;
  delete advancedFilters.adults;
  delete advancedFilters.children;
  delete advancedFilters.infants;

  if (Object.keys(advancedFilters).length > 0) {
    params.set('filters', JSON.stringify(advancedFilters));
  } else {
    params.delete('filters');
  }

  return params;
};

/**
 * Initializes form default values from URL search parameters
 * @param searchParams - The URL search parameters
 * @returns Default values object for react-hook-form
 */
export const getFormDefaultsFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
): FilterFormValues => {
  return {
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: {
      adults: Number(searchParams.get('adults')) || 0,
      children: Number(searchParams.get('children')) || 0,
      infants: Number(searchParams.get('infants')) || 0,
    },
    region: searchParams.get('region') || '',
    type: searchParams.get('type') || 'all',
    filters: searchParams.get('filters')
      ? JSON.parse(searchParams.get('filters')!)
      : {},
  };
};

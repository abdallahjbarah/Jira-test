import { ReadonlyURLSearchParams } from 'next/navigation';
import { clearObject } from './clearObject';

/**
 * Maps frontend field names to backend API field names
 */
const getBackendFieldName = (frontendKey: string): string => {
  const fieldMapping: Record<string, string> = {
    beds: 'numberOfBeds',
    bedrooms: 'numberOfBedrooms',
    bathrooms: 'numberOfBathrooms',
    experienceLevel: 'levelOfDifficulty',
    bookingOptions: 'bookOptions',
  };

  return fieldMapping[frontendKey] || frontendKey;
};

export interface CollectionFilter {
  type?: string;
  checkinTime?: string;
  checkoutTime?: string;
  adults?: number;
  children?: number;
  infants?: number;
  country?: string;
  city?: number | string;
  destinationText?: string;
  capacity?: number;

  // Advanced filters - aligned with backend API
  priceRange?: [number, number];
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];
  amenities?: string[];
  bookOptions?: string[];
  accessibilityFeatures?: string[];
  bookagriBadge?: boolean;
  specialOffers?: boolean;

  // Stay-specific filters - aligned with backend field names
  numberOfBedrooms?: number;
  numberOfBeds?: number;
  numberOfBathrooms?: number;
  includesExperience?: boolean;
  accessProvider?: boolean;

  // Experience-specific filters
  experienceTypes?: string[];
  levelOfDifficulty?: string;
  ageSuitability?: string[];
  timeOfDay?: string[];
  duration?: string[];
  packageDuration?: string[];

  [key: string]: unknown;
}

export interface FilterFormValues {
  filters: CollectionFilter;
}

export const buildFiltersFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  baseType?: string | null
): CollectionFilter => {
  const baseFilter: CollectionFilter = {
    type: baseType ?? undefined,
  };

  const checkinTime = searchParams.get('checkinTime');
  const checkoutTime = searchParams.get('checkoutTime');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const infants = searchParams.get('infants');
  const country = searchParams.get('country');
  const city = searchParams.get('city');
  const capacity = searchParams.get('capacity');
  const advancedFilters = searchParams.get('filters');
  const experienceTypes = searchParams.get('experienceTypes');

  if (checkinTime) baseFilter.checkinTime = checkinTime;
  if (checkoutTime) baseFilter.checkoutTime = checkoutTime;
  if (adults) baseFilter.adults = Number(adults);
  if (children) baseFilter.children = Number(children);
  if (infants) baseFilter.infants = Number(infants);
  if (country) baseFilter.country = country;
  if (city) baseFilter.city = city;
  if (capacity) baseFilter.capacity = Number(capacity);
  if (experienceTypes) baseFilter.experienceTypes = [experienceTypes];

  if (advancedFilters) {
    try {
      const parsedFilters = JSON.parse(advancedFilters);
      Object.assign(baseFilter, parsedFilters);
    } catch (error) {
      // Silent fail for invalid JSON
    }
  }

  return clearObject(baseFilter);
};

export const buildSearchParamsFromFilters = (
  filters: CollectionFilter,
  currentParams: ReadonlyURLSearchParams
): URLSearchParams => {
  // Create a new URLSearchParams instance instead of copying currentParams
  // This ensures we start with a clean slate
  const params = new URLSearchParams();

  // Handle basic filters
  if (filters.checkinTime) {
    params.set('checkinTime', filters.checkinTime);
  }

  if (filters.checkoutTime) {
    params.set('checkoutTime', filters.checkoutTime);
  }

  // Calculate total capacity from guests (adults + children + infants)
  const totalGuests =
    (filters.adults || 0) + (filters.children || 0) + (filters.infants || 0);
  if (totalGuests > 0) {
    params.set('capacity', totalGuests.toString());
  }

  if (filters.country) {
    params.set('country', filters.country);
  }

  if (filters.city) {
    params.set('city', filters.city.toString());
  }

  if (filters.experienceTypes && Array.isArray(filters.experienceTypes)) {
    filters.experienceTypes.forEach(type => {
      params.append('experienceTypes', type);
    });
  }

  // Handle capacity parameter (which might be set separately)
  if (filters.capacity && filters.capacity > 0) {
    params.set('capacity', filters.capacity.toString());
  }

  // Handle price range - convert to minPrice and maxPrice for backend
  if (
    filters.priceRange &&
    Array.isArray(filters.priceRange) &&
    filters.priceRange.length === 2
  ) {
    const [minPrice, maxPrice] = filters.priceRange;
    if (minPrice > 0) {
      params.set('minPrice', minPrice.toString());
    }
    if (maxPrice < 100) {
      params.set('maxPrice', maxPrice.toString());
    }
  }

  // Handle all other advanced filters
  const advancedFilters = { ...filters };
  delete advancedFilters.type;
  delete advancedFilters.checkinTime;
  delete advancedFilters.checkoutTime;
  delete advancedFilters.adults; // Remove from advanced filters since we handle it as capacity
  delete advancedFilters.children; // Remove from advanced filters since we handle it as capacity
  delete advancedFilters.infants; // Remove from advanced filters since we handle it as capacity
  delete advancedFilters.country;
  delete advancedFilters.city;
  delete advancedFilters.destinationText;
  delete advancedFilters.experienceTypes;
  delete advancedFilters.capacity; // Remove since we calculate it from guests
  delete advancedFilters.priceRange;

  // Add each advanced filter as its own query param - only meaningful values
  Object.entries(advancedFilters).forEach(([key, value]) => {
    // Skip default/empty values
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Skip default numeric values
    if (typeof value === 'number' && value === 0) {
      return;
    }

    // Skip default boolean values
    if (typeof value === 'boolean' && value === false) {
      return;
    }

    // Skip default arrays
    if (Array.isArray(value) && value.length === 0) {
      return;
    }

    // Skip default price range
    if (
      Array.isArray(value) &&
      value.length === 2 &&
      value[0] === 0 &&
      value[1] === 100
    ) {
      return;
    }

    // Map frontend field names to backend field names
    const backendKey = getBackendFieldName(key);

    if (Array.isArray(value)) {
      // Only add non-empty array values
      const nonEmptyValues = value.filter(
        v => v !== undefined && v !== null && v !== '' && v !== 0
      );
      nonEmptyValues.forEach(v => {
        params.append(backendKey, v.toString());
      });
    } else {
      params.set(backendKey, value.toString());
    }
  });

  return params;
};

export const getFormDefaultsFromSearchParams = (
  searchParams: ReadonlyURLSearchParams
): FilterFormValues => {
  const filters = buildFiltersFromSearchParams(searchParams);

  return {
    filters,
  };
};

export const getDefaultFilterValues = (
  collectionStatus?: string
): CollectionFilter => {
  const defaultFilters: CollectionFilter = {
    adults: 0,
    children: 0,
    infants: 0,
    capacity: 0,
    checkinTime: '',
    checkoutTime: '',
    city: undefined,
    country: undefined,
    destinationText: '',
    siteId: undefined,
    // Clear all advanced filters - use undefined instead of default values
    priceRange: undefined,
    languages: undefined,
    amenities: undefined,
    bookOptions: undefined,
    accessibilityFeatures: undefined,
    bookagriBadge: undefined,
    specialOffers: undefined,
    numberOfBedrooms: undefined,
    numberOfBeds: undefined,
    numberOfBathrooms: undefined,
    includesExperience: undefined,
    collectionType: undefined,
    experienceTypes: undefined,
    levelOfDifficulty: undefined,
    ageSuitability: undefined,
    timeOfDay: undefined,
    duration: undefined,
    packageDuration: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    accessProvider: undefined,
  };

  // Remove checkout time for experiences
  if (collectionStatus === 'experiences') {
    delete defaultFilters.checkoutTime;
  }

  return defaultFilters;
};

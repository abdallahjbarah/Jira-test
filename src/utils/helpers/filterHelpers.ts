import { ReadonlyURLSearchParams } from 'next/navigation';
import { clearObject } from './clearObject';

/**
 * Backend API filter interface - matches SiteQueryDTO exactly
 */
export interface BackendFilterParams {
  // Pagination
  skip?: number;
  limit?: number;

  // Basic filters
  type?: 'Experience' | 'Stay' | 'Event' | 'Offers & Packages';
  status?: number;
  city?: string;
  country?: string;
  capacity?: number;

  // Stay-specific filters
  numberOfBeds?: number;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;

  // Advanced filters
  amenities?: string[];
  bookOptions?: string[];
  accessibilityFeatures?: string[];
  experienceTypes?: string[];
  languages?: string[];

  // Date filters
  startDateTime?: number;
  endDateTime?: number;

  // Price filters
  minPrice?: number;
  maxPrice?: number;

  // Boolean filters
  bookagriBadge?: boolean;
  includesExperience?: boolean;
  accessProvider?: boolean;
  specialOffers?: boolean;

  // Experience-specific filters
  levelOfDifficulty?: ('easy' | 'moderate' | 'difficult')[];
  ageSuitability?: ('infants' | 'children' | 'adults')[];
  timeOfDay?: ('morning' | 'afternoon' | 'evening')[];
  duration?: ('short' | 'moderate' | 'extended' | 'fullDay')[];
  packageDuration?: ('halfDay' | 'fullDay')[];

  // Location filters
  coordinates?: number[];
}

/**
 * Frontend filter interface - what the UI components use
 */
export interface FrontendFilter {
  // Basic filters
  type?: string;
  startDateTime?: number;
  endDateTime?: number;
  adults?: number;
  children?: number;
  infants?: number;
  country?: string;
  city?: string;
  destinationText?: string;

  // Advanced filters
  priceRange?: [number, number];
  languages?: string[];
  amenities?: string[];
  bookOptions?: string[];
  accessibilityFeatures?: string[];
  bookagriBadge?: boolean;
  specialOffers?: boolean;

  // Stay-specific filters
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
}

/**
 * Form values interface for React Hook Form
 */
export interface FilterFormValues {
  filters: FrontendFilter;
}

/**
 * Maps frontend collection types to backend API types
 */
const getBackendType = (frontendType: string): BackendFilterParams['type'] => {
  const typeMapping: Record<string, BackendFilterParams['type']> = {
    experiences: 'Experience',
    stays: 'Stay',
    events: 'Event',
    offers: 'Offers & Packages',
  };

  return typeMapping[frontendType] || undefined;
};

/**
 * Maps frontend field names to backend field names
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

/**
 * Converts frontend filters to backend API parameters
 */
export const convertToBackendFilters = (
  frontendFilters: FrontendFilter,
  collectionStatus?: string
): BackendFilterParams => {
  const backendFilters: BackendFilterParams = {};

  // Handle collection type
  if (frontendFilters.type || collectionStatus) {
    const type = frontendFilters.type || collectionStatus;
    if (type) {
      backendFilters.type = getBackendType(type);
    }
  }

  // Handle basic filters
  if (frontendFilters.startDateTime) {
    backendFilters.startDateTime = frontendFilters.startDateTime;
  }

  if (frontendFilters.endDateTime) {
    backendFilters.endDateTime = frontendFilters.endDateTime;
  }

  if (frontendFilters.country) {
    backendFilters.country = frontendFilters.country;
  }

  if (frontendFilters.city) {
    backendFilters.city = frontendFilters.city;
  }

  // Calculate capacity from guests
  const totalGuests =
    (frontendFilters.adults || 0) +
    (frontendFilters.children || 0) +
    (frontendFilters.infants || 0);
  if (totalGuests > 0) {
    backendFilters.capacity = totalGuests;
  }

  // Handle price range
  if (
    frontendFilters.priceRange &&
    Array.isArray(frontendFilters.priceRange) &&
    frontendFilters.priceRange.length === 2
  ) {
    const [minPrice, maxPrice] = frontendFilters.priceRange;
    if (minPrice > 0) {
      backendFilters.minPrice = minPrice;
    }
    if (maxPrice < 100) {
      backendFilters.maxPrice = maxPrice;
    }
  }

  // Handle stay-specific filters
  if (frontendFilters.numberOfBeds) {
    backendFilters.numberOfBeds = frontendFilters.numberOfBeds;
  }

  if (frontendFilters.numberOfBedrooms) {
    backendFilters.numberOfBedrooms = frontendFilters.numberOfBedrooms;
  }

  if (frontendFilters.numberOfBathrooms) {
    backendFilters.numberOfBathrooms = frontendFilters.numberOfBathrooms;
  }

  // Handle boolean filters
  if (frontendFilters.bookagriBadge !== undefined) {
    backendFilters.bookagriBadge = frontendFilters.bookagriBadge;
  }

  if (frontendFilters.includesExperience !== undefined) {
    backendFilters.includesExperience = frontendFilters.includesExperience;
  }

  if (frontendFilters.accessProvider !== undefined) {
    backendFilters.accessProvider = frontendFilters.accessProvider;
  }

  if (frontendFilters.specialOffers !== undefined) {
    backendFilters.specialOffers = frontendFilters.specialOffers;
  }

  // Handle array filters
  if (frontendFilters.amenities && Array.isArray(frontendFilters.amenities)) {
    backendFilters.amenities = frontendFilters.amenities;
  }

  if (
    frontendFilters.bookOptions &&
    Array.isArray(frontendFilters.bookOptions)
  ) {
    backendFilters.bookOptions = frontendFilters.bookOptions;
  }

  if (
    frontendFilters.accessibilityFeatures &&
    Array.isArray(frontendFilters.accessibilityFeatures)
  ) {
    backendFilters.accessibilityFeatures =
      frontendFilters.accessibilityFeatures;
  }

  if (
    frontendFilters.experienceTypes &&
    Array.isArray(frontendFilters.experienceTypes)
  ) {
    backendFilters.experienceTypes = frontendFilters.experienceTypes;
  }

  if (frontendFilters.languages && Array.isArray(frontendFilters.languages)) {
    backendFilters.languages = frontendFilters.languages;
  }

  // Handle experience-specific filters
  if (frontendFilters.levelOfDifficulty) {
    backendFilters.levelOfDifficulty = [
      frontendFilters.levelOfDifficulty as any,
    ];
  }

  if (
    frontendFilters.ageSuitability &&
    Array.isArray(frontendFilters.ageSuitability)
  ) {
    backendFilters.ageSuitability = frontendFilters.ageSuitability as any;
  }

  if (frontendFilters.timeOfDay && Array.isArray(frontendFilters.timeOfDay)) {
    backendFilters.timeOfDay = frontendFilters.timeOfDay as any;
  }

  if (frontendFilters.duration && Array.isArray(frontendFilters.duration)) {
    backendFilters.duration = frontendFilters.duration as any;
  }

  if (
    frontendFilters.packageDuration &&
    Array.isArray(frontendFilters.packageDuration)
  ) {
    backendFilters.packageDuration = frontendFilters.packageDuration as any;
  }

  return clearObject(backendFilters);
};

/**
 * Builds frontend filters from URL search parameters
 */
export const buildFiltersFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  collectionStatus?: string
): FrontendFilter => {
  const filters: FrontendFilter = {};

  // Handle collection type
  if (collectionStatus) {
    filters.type = collectionStatus;
  }

  // Handle basic filters
  const startDateTime = searchParams.get('startDateTime');
  const endDateTime = searchParams.get('endDateTime');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const infants = searchParams.get('infants');
  const country = searchParams.get('country');
  const city = searchParams.get('city');
  const capacity = searchParams.get('capacity');

  if (startDateTime) filters.startDateTime = Number(startDateTime);
  if (endDateTime) filters.endDateTime = Number(endDateTime);
  if (adults) filters.adults = Number(adults);
  if (children) filters.children = Number(children);
  if (infants) filters.infants = Number(infants);
  if (country) filters.country = country;
  if (city) filters.city = city;

  // Handle capacity - distribute to guests if not already set
  if (capacity && !filters.adults && !filters.children && !filters.infants) {
    const totalCapacity = Number(capacity);
    filters.adults = totalCapacity;
  }

  // Handle array parameters
  const experienceTypes = searchParams.getAll('experienceTypes');
  if (experienceTypes.length > 0) {
    filters.experienceTypes = experienceTypes;
  }

  const amenities = searchParams.getAll('amenities');
  if (amenities.length > 0) {
    filters.amenities = amenities;
  }

  const bookOptions = searchParams.getAll('bookOptions');
  if (bookOptions.length > 0) {
    filters.bookOptions = bookOptions;
  }

  const accessibilityFeatures = searchParams.getAll('accessibilityFeatures');
  if (accessibilityFeatures.length > 0) {
    filters.accessibilityFeatures = accessibilityFeatures;
  }

  const languages = searchParams.getAll('languages');
  if (languages.length > 0) {
    filters.languages = languages;
  }

  // Handle numeric filters
  const numberOfBeds = searchParams.get('numberOfBeds');
  const numberOfBedrooms = searchParams.get('numberOfBedrooms');
  const numberOfBathrooms = searchParams.get('numberOfBathrooms');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  if (numberOfBeds) filters.numberOfBeds = Number(numberOfBeds);
  if (numberOfBedrooms) filters.numberOfBedrooms = Number(numberOfBedrooms);
  if (numberOfBathrooms) filters.numberOfBathrooms = Number(numberOfBathrooms);

  // Handle price range
  if (minPrice || maxPrice) {
    filters.priceRange = [
      minPrice ? Number(minPrice) : 0,
      maxPrice ? Number(maxPrice) : 100,
    ];
  }

  // Handle boolean filters
  const bookagriBadge = searchParams.get('bookagriBadge');
  const includesExperience = searchParams.get('includesExperience');
  const accessProvider = searchParams.get('accessProvider');
  const specialOffers = searchParams.get('specialOffers');

  if (bookagriBadge) filters.bookagriBadge = bookagriBadge === 'true';
  if (includesExperience)
    filters.includesExperience = includesExperience === 'true';
  if (accessProvider) filters.accessProvider = accessProvider === 'true';
  if (specialOffers) filters.specialOffers = specialOffers === 'true';

  // Handle experience-specific filters
  const levelOfDifficulty = searchParams.getAll('levelOfDifficulty');
  if (levelOfDifficulty.length > 0) {
    filters.levelOfDifficulty = levelOfDifficulty[0]; // Single value for frontend
  }

  const ageSuitability = searchParams.getAll('ageSuitability');
  if (ageSuitability.length > 0) {
    filters.ageSuitability = ageSuitability;
  }

  const timeOfDay = searchParams.getAll('timeOfDay');
  if (timeOfDay.length > 0) {
    filters.timeOfDay = timeOfDay;
  }

  const duration = searchParams.getAll('duration');
  if (duration.length > 0) {
    filters.duration = duration;
  }

  const packageDuration = searchParams.getAll('packageDuration');
  if (packageDuration.length > 0) {
    filters.packageDuration = packageDuration;
  }

  return clearObject(filters);
};

/**
 * Builds URL search parameters from frontend filters
 */
export const buildSearchParamsFromFilters = (
  filters: FrontendFilter,
  currentParams: ReadonlyURLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams();

  // Handle basic filters
  if (filters.type) {
    params.set('type', filters.type);
  }

  if (filters.startDateTime) {
    params.set('startDateTime', filters.startDateTime.toString());
  }

  if (filters.endDateTime) {
    params.set('endDateTime', filters.endDateTime.toString());
  }

  if (filters.country) {
    params.set('country', filters.country);
  }

  if (filters.city) {
    params.set('city', filters.city);
  }

  // Handle guest counts
  if (filters.adults && filters.adults > 0) {
    params.set('adults', filters.adults.toString());
  }

  if (filters.children && filters.children > 0) {
    params.set('children', filters.children.toString());
  }

  if (filters.infants && filters.infants > 0) {
    params.set('infants', filters.infants.toString());
  }

  // Calculate and set capacity
  const totalGuests =
    (filters.adults || 0) + (filters.children || 0) + (filters.infants || 0);
  if (totalGuests > 0) {
    params.set('capacity', totalGuests.toString());
  }

  // Handle price range
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

  // Handle stay-specific filters
  if (filters.numberOfBeds && filters.numberOfBeds > 0) {
    params.set('numberOfBeds', filters.numberOfBeds.toString());
  }

  if (filters.numberOfBedrooms && filters.numberOfBedrooms > 0) {
    params.set('numberOfBedrooms', filters.numberOfBedrooms.toString());
  }

  if (filters.numberOfBathrooms && filters.numberOfBathrooms > 0) {
    params.set('numberOfBathrooms', filters.numberOfBathrooms.toString());
  }

  // Handle boolean filters
  if (filters.bookagriBadge === true) {
    params.set('bookagriBadge', 'true');
  }

  if (filters.includesExperience === true) {
    params.set('includesExperience', 'true');
  }

  if (filters.accessProvider === true) {
    params.set('accessProvider', 'true');
  }

  if (filters.specialOffers === true) {
    params.set('specialOffers', 'true');
  }

  // Handle array filters
  if (filters.experienceTypes && Array.isArray(filters.experienceTypes)) {
    filters.experienceTypes.forEach(type => {
      params.append('experienceTypes', type);
    });
  }

  if (filters.amenities && Array.isArray(filters.amenities)) {
    filters.amenities.forEach(amenity => {
      params.append('amenities', amenity);
    });
  }

  if (filters.bookOptions && Array.isArray(filters.bookOptions)) {
    filters.bookOptions.forEach(option => {
      params.append('bookOptions', option);
    });
  }

  if (
    filters.accessibilityFeatures &&
    Array.isArray(filters.accessibilityFeatures)
  ) {
    filters.accessibilityFeatures.forEach(feature => {
      params.append('accessibilityFeatures', feature);
    });
  }

  if (filters.languages && Array.isArray(filters.languages)) {
    filters.languages.forEach(language => {
      params.append('languages', language);
    });
  }

  // Handle experience-specific filters
  if (filters.levelOfDifficulty) {
    params.set('levelOfDifficulty', filters.levelOfDifficulty);
  }

  if (filters.ageSuitability && Array.isArray(filters.ageSuitability)) {
    filters.ageSuitability.forEach(age => {
      params.append('ageSuitability', age);
    });
  }

  if (filters.timeOfDay && Array.isArray(filters.timeOfDay)) {
    filters.timeOfDay.forEach(time => {
      params.append('timeOfDay', time);
    });
  }

  if (filters.duration && Array.isArray(filters.duration)) {
    filters.duration.forEach(duration => {
      params.append('duration', duration);
    });
  }

  if (filters.packageDuration && Array.isArray(filters.packageDuration)) {
    filters.packageDuration.forEach(duration => {
      params.append('packageDuration', duration);
    });
  }

  return params;
};

/**
 * Gets form default values from search parameters
 */
export const getFormDefaultsFromSearchParams = (
  searchParams: ReadonlyURLSearchParams
): FilterFormValues => {
  const filters = buildFiltersFromSearchParams(searchParams);
  return { filters };
};

/**
 * Gets default filter values based on collection status
 */
export const getDefaultFilterValues = (
  collectionStatus?: string
): FrontendFilter => {
  const defaultFilters: FrontendFilter = {
    adults: 0,
    children: 0,
    infants: 0,
    startDateTime: undefined,
    endDateTime: undefined,
    city: undefined,
    country: undefined,
    destinationText: '',
    // Clear all advanced filters
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
    experienceTypes: undefined,
    levelOfDifficulty: undefined,
    ageSuitability: undefined,
    timeOfDay: undefined,
    duration: undefined,
    packageDuration: undefined,
    accessProvider: undefined,
  };

  // Set collection type
  if (collectionStatus) {
    defaultFilters.type = collectionStatus;
  }

  // Remove end date time for experiences
  if (collectionStatus === 'experiences') {
    delete defaultFilters.endDateTime;
  }

  return defaultFilters;
};

import { ReadonlyURLSearchParams } from 'next/navigation';
import { clearObject } from './clearObject';

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
  [key: string]: any;
}

export interface FilterFormValues {
  filters: CollectionFilter;
}

export const buildFiltersFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  baseType?: string | null,
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
  const advancedFilters = searchParams.get('filters');
  const experienceTypes = searchParams.get('experienceTypes');

  if (checkinTime) baseFilter.checkinTime = checkinTime;
  if (checkoutTime) baseFilter.checkoutTime = checkoutTime;
  if (adults) baseFilter.adults = Number(adults);
  if (children) baseFilter.children = Number(children);
  if (infants) baseFilter.infants = Number(infants);
  if (country) baseFilter.country = country;
  if (city) baseFilter.city = city;
  if (experienceTypes) baseFilter.experienceTypes = experienceTypes;

  if (advancedFilters) {
    try {
      const parsedFilters = JSON.parse(advancedFilters);
      Object.assign(baseFilter, parsedFilters);
    } catch (error) { }
  }

  return clearObject(baseFilter);
};

export const buildSearchParamsFromFilters = (
  filters: CollectionFilter,
  currentParams: ReadonlyURLSearchParams,
): URLSearchParams => {
  const params = new URLSearchParams(currentParams);

  if (filters.checkinTime) {
    params.set('checkinTime', filters.checkinTime);
  } else {
    params.delete('checkinTime');
  }

  if (filters.checkoutTime) {
    params.set('checkoutTime', filters.checkoutTime);
  } else {
    params.delete('checkoutTime');
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

  if (filters.country) {
    params.set('country', filters.country);
  } else {
    params.delete('country');
  }

  if (filters.city) {
    params.set('city', filters.city.toString());
  } else {
    params.delete('city');
  }

  if (filters.experienceTypes) {
    params.set('experienceTypes', filters.experienceTypes);
  } else {
    params.delete('experienceTypes');
  }

  // Remove known filters from advancedFilters
  const advancedFilters = { ...filters };
  delete advancedFilters.type;
  delete advancedFilters.checkinTime;
  delete advancedFilters.checkoutTime;
  delete advancedFilters.adults;
  delete advancedFilters.children;
  delete advancedFilters.infants;
  delete advancedFilters.country;
  delete advancedFilters.city;
  delete advancedFilters.destinationText;
  delete advancedFilters.experienceTypes;

  // Instead of serializing advancedFilters as JSON, add each as its own query param
  Object.entries(advancedFilters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      params.delete(key);
    } else if (Array.isArray(value)) {
      // Remove any existing values for this key
      params.delete(key);
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== '') {
          params.append(key, v.toString());
        }
      });
    } else {
      params.set(key, value.toString());
    }
  });

  // Remove the old 'filters' param if present
  params.delete('filters');

  return params;
};

export const getFormDefaultsFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
): FilterFormValues => {
  const filters = buildFiltersFromSearchParams(searchParams);

  return {
    filters: filters,
  };
};

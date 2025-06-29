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

  if (checkinTime) baseFilter.checkinTime = checkinTime;
  if (checkoutTime) baseFilter.checkoutTime = checkoutTime;
  if (adults) baseFilter.adults = Number(adults);
  if (children) baseFilter.children = Number(children);
  if (infants) baseFilter.infants = Number(infants);
  if (country) baseFilter.country = country;
  if (city) baseFilter.city = city;

  if (advancedFilters) {
    try {
      const parsedFilters = JSON.parse(advancedFilters);
      Object.assign(baseFilter, parsedFilters);
    } catch (error) {}
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

  if (Object.keys(advancedFilters).length > 0) {
    params.set('filters', JSON.stringify(advancedFilters));
  } else {
    params.delete('filters');
  }

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

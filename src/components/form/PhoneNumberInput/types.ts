import { CountryCode } from 'libphonenumber-js';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  dialCode: string;
}

export interface PhoneNumberInputProps {
  phoneFieldName: string;
  phoneLocalFieldName: string;
  countryCodeFieldName: string;
  label?: string;
  required?: boolean;
  defaultCountry?: CountryCode | string;
  modalTitle?: string;
  modalSearchPlaceholder?: string;
  error?: string;
}

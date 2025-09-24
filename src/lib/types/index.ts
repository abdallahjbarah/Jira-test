import { Gender, NotificationPaths } from '../enums';

export interface UserLoginResponse {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  otp: string;
  countryCode: string;
  phoneNumber: string;
  tokens: any[];
  favoriteCollections: string[];
  languages: any[];
  fcmTokens: any[];
  isProfileCompleted: boolean;
  bookingsNotification: BookingsNotification;
  announcementsNotification: AnnouncementsNotification;
  offersNotification: OffersNotification;
  emailNotifications: boolean;
  currency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: number;
  gender?: Gender;
  nationality?: string;
  birthdate?: string;
  city?: string | number;
  country?: Country;
  profileImageUrl?: string;
  provider?: string;
}

export interface Role {
  _id: string;
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface BookingsNotification {
  newBooking: boolean;
  statusChanged: boolean;
  reminder: boolean;
  thankful: boolean;
  allEnabled: boolean;
}

export interface AnnouncementsNotification {
  newExperiences: boolean;
  newStays: boolean;
  newEvents: boolean;
  newAppRelease: boolean;
  allEnabled: boolean;
}

export interface OffersNotification {
  newPackages: boolean;
  newDiscount: boolean;
  allEnabled: boolean;
}

export interface Policies {
  _id: string;
  termsConditionsEn: string;
  privacyPolicyEn: string;
  termsConditionsAr: string;
  privacyPolicyAr: string;
  __v: number;
}

export interface Notification {
  _id: string;
  pathId: string;
  userId: string;
  readAt: any;
  descriptionEn: string;
  descriptionAr: string;
  titleEn: string;
  titleAr: string;
  typeEn: string;
  typeAr: string;
  path: NotificationPaths;
  createdAt: string;
  updatedAt: string;
  status: any;
}

export interface Country {
  _id: string;
  name: string;
  iso3: string;
  nationality: string;
  __v: number;
}

export interface Faq {
  _id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SitesResponse {
  message: string;
  sites: {
    data: Site[];
    maxPrice: number;
    minPrice: number;
    totalCount: number;
  };
  unavailbleDates: string[];
}

export interface SiteByIdResponse {
  message: string;
  site: Site;
  unavailbleDates?: number[];
}

export interface Site {
  _id: string;
  status: number;
  site_setup_status: number;
  type: string;
  name: string;
  longDescription: string;
  location: {
    type: string;
    coordinates: number[];
  };
  bookagriBadge: boolean;
  cancellationPolicy: string;
  cancellationTime: number;
  specialInstructions: string;
  host: {
    _id: string;
    description: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
  };
  amenities: {
    _id: string;
    nameEn: string;
    nameAr: string;
    category: {
      _id: string;
      nameEn: string;
      nameAr: string;
    }[];
    iconPath: string;
  }[];
  bookOptions: {
    _id: string;
    nameEn: string;
    nameAr: string;
    iconPath: string;
  }[];
  accessibilityFeatures: {
    _id: string;
    nameEn: string;
    nameAr: string;
  }[];
  googleLocationLink: string;
  capacity: number;
  whatToExpect: {
    images: string[];
    description: string;
  };
  ageSuitability: number;
  levelOfDifficulty: string;
  extras: Extra[];
  city: string;
  country: {
    _id: string;
    name: string;
  };
  images: string[];
  videos: string[];
  pricingInformation: {
    discount: number | null;
    personType: string;
    price: number;
    minUnit: number;
    maxUnit: number;
  }[];
  guide: {
    description: string;
    languages: string[];
    price: number;
    learnMore: string;
  };
  guideIsMandatory: boolean;
  transportation: {
    description: string;
    price: number;
    learnMore: string;
  };
  transportationIsMandatory: boolean;
  languages: {
    nameAr: string;
    nameEn: string;
  }[];
  experienceTypes: {
    _id: string;
    nameEn: string;
    nameAr: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  coHost?: {
    firstName: string;
    lastName: string;
    description: string;
    languages: {
      _id: string;
      nameAr: string;
      nameEn: string;
    }[];
    image: string;
  };
  mainImage: string;
  schedule: {
    startDateTime: number;
    endDateTime: number;
    days: {
      name: string;
      slots: {
        startTime: string;
        id: string;
      }[];
    }[];
  };
  guideIsIncluded: boolean;
  transportationIsIncluded: boolean;
  itineraryStops: {
    title: string;
    locationURL: string;
    details: string;
    duration: number;
  }[];
  duration: number;
  thingsToKnow: string;
  airportIsIncluded: boolean;
  wheelChair: boolean;
  paymentMethod: string[];
  accessProvider: boolean;
  timeOfDay: any[];
  startDateTime?: number;
  endDateTime?: number;
  stayDetails?: {
    description: string;
    numberOfBeds: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
  };
  stayNearby?: string;
  stayHouseRules?: string;
  airport?: {
    description: string;
    price: number;
    learnMore: string;
  };
}

export type Extra = {
  nameEn: string;
  nameAr: string;
  price: number;
};

export type PricingInformation = {
  discount: number | null;
  personType: string;
  price: number;
  minUnit: number;
  maxUnit: number;
};

export interface BankDetails {
  name: string;
  IBAN: string;
  bankName: string;
  swiftNumber: string;
  currency: string;
}

export interface PaymentMethod {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isEnabled: boolean;
  bankDetails?: BankDetails;
}

export interface AvailabilitySlot {
  startDateTime: number;
  endDateTime: number;
  slotId: string;
  isFullyBooked: boolean;
  _id: string;
}

export interface AvailabilityStaySlot {
  startDate: number;
  endDate: number;
  availabilitiesIds: string[];
}
export interface City {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

export interface ExperienceType {
  _id: string;
  nameEn: string;
  nameAr: string;
  isStayType: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isUsed: boolean;
}

export interface PricesRange {
  minPrice: number;
  maxPrice: number;
}

export interface Language {
  _id: string;
  nameEn: string;
  nameAr: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isUsed: boolean;
}

export interface Amenity {
  _id: string;
  nameEn: string;
  nameAr: string;
  category: AmenityCategory[];
  iconPath: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isUsed: boolean;
}

export interface AmenityCategory {
  _id: string;
  nameEn: string;
  nameAr: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookOption {
  _id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconPath: string;
  isStayType: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isUsed: boolean;
}

export interface AccessibilityFeature {
  _id: string;
  nameEn: string;
  nameAr: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isUsed: boolean;
}

export interface Continent {
  _id: string;
  nameEn: string;
  nameAr: string;
  countries: ContinentCountry[];
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ContinentCountry {
  _id: string;
  name: string;
  iso3: string;
}

export interface FavoriteCollection {
  _id: string;
  userId: string;
  collectionName: string;
  sites: Site[];
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Ticket {
  _id: string;
  subject: string;
  message: string;
  attachment: string;
  userId: UserId;
  createdAt: string;
  updatedAt: string;
  code: string;
  __v: number;
}

export interface UserId {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Booking {
  _id: string;
  status: number;
  siteId: Site;
  availabilityId: string[];
  userId: any;
  totalPrice: number;
  paymentMethod: BookingPaymentMethod;
  startDateTime: number;
  endDateTime: number;
  guests: Guests;
  hasGuide: boolean;
  hasTransportation: boolean;
  hasAirport: boolean;
  attachment: string;
  remindedAt: any;
  thankedAt: any;
  createdAt: string;
  updatedAt: string;
  code: string;
  paymentReference: string;
  __v: number;
}

export interface Guests {
  adults: number;
  children: number;
  infants: number;
}

export interface BookingDetails {
  canCancel: boolean;
  booking: Booking;
}

export interface BookingPaymentMethod {
  _id: string;
  isEnabled: boolean;
  description: string;
  name: string;
}

export interface CancelReason {
  _id: string;
  reasonEn: string;
  reasonAr: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FirebaseSSOData {
  idToken: string;
  provider: 'Apple' | 'Google' | 'Facebook';
  fcmToken?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;
  nationality?: string;
  countryId?: string;
  city?: string;
}

export interface FirebaseUserInfo {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  locale?: string;
  timezone?: string;
  providerId: string;
  customClaims?: any;
  providerData?: any[];
}

export interface FirebaseSSOResponse {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    photoURL?: string;
    phoneNumber?: string;
    providerId: string;
    emailVerified: boolean;
    status?: number;
    gender?: string;
    birthDate?: string;
    nationality?: string;
    city?: string;
    customClaims?: any;
    providerData?: any[];
  };
  token: string;
  isNewUser: boolean;
  profileCompletionRequired?: boolean;
  missingFields?: string[];
}

export interface SSOProvider {
  provider: 'google' | 'facebook' | 'apple';
  idToken: string;
  user: any;
}

export interface SimilarExperiencesResponse {
  totalCount: number;
  similarSites: SimilarSite[];
}

export interface SimilarSite {
  location: Location;
  _id?: string;
  status?: number;
  site_setup_status?: number;
  type?: string;
  name?: string;
  longDescription?: string;
  bookagriBadge?: boolean;
  cancellationPolicy?: string;
  cancellationTime?: number;
  specialInstructions?: string;
  host?: string;
  amenities?: string[];
  bookOptions?: string[];
  accessibilityFeatures?: string[];
  googleLocationLink?: string;
  capacity?: number;
  whatToExpect?: WhatToExpect;
  ageSuitability?: number;
  levelOfDifficulty?: string;
  extras?: Extra[];
  city?: string;
  country?: Country;
  images?: string[];
  videos?: any[];
  pricingInformation?: PricingInformation[];
  guide?: Guide;
  guideIsMandatory?: boolean;
  transportation?: Transportation;
  transportationIsMandatory?: boolean;
  languages?: any[];
  experienceTypes?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  coHost?: CoHost;
  mainImage?: string;
  schedule?: Schedule;
  guideIsIncluded?: boolean;
  transportationIsIncluded?: boolean;
  itineraryStops?: ItineraryStop[];
  duration?: number;
  thingsToKnow?: string;
  airportIsIncluded?: boolean;
  wheelChair?: boolean;
  paymentMethod?: any[];
  accessProvider?: boolean;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export interface WhatToExpect {
  images: any[];
  description: string;
}

export interface Country {
  _id: string;
  name: string;
  iso3: string;
}

export interface Guide {
  description: string;
  languages: string[];
  price: number;
  learnMore: string;
}

export interface Transportation {
  description: string;
  price: number;
  learnMore: string;
}

export interface CoHost {
  firstName: string;
  lastName: string;
  description: string;
  languages: string[];
  image: string;
}

export interface Schedule {
  startDateTime: number;
  endDateTime: number;
  days: any[];
}

export interface ItineraryStop {
  title: string;
  locationURL: string;
  details: string;
  duration: number;
}

export interface ReSendVerificationCodeResponse {
  message: string;
  email: string;
}

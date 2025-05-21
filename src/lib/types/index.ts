import { NotificationPaths, Gender } from '../enums';

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

// Policies

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

export interface City {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

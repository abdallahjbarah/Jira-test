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

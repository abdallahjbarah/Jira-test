export enum NotificationType {
  BOOKING = 'booking',
  ANNOUNCEMENT = 'announcement',
  OFFER = 'offer',
}

export enum NotificationCategory {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  PREVIOUS_DAYS = 'previous-days',
}

export enum FileFolder {
  PROFILE = 'profile',
  PAYMENT_INFO = 'paymentInfo',
}

export enum NotificationPaths {
  Bookings = 1,
  Offers = 2,
  newUpdates = 2,
  Thanks = 3,
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ApprovalStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  DECLINE = 2,
  PENDING = 3,
}

export enum BookingStatus {
  PENDING = 1,
  APPROVED = 2,
  DECLINED = 3,
  CANCELLED = 4,
  REFUNDED = 5,
  COMPLETED = 6,
  REFUND_REQUESTED = 7,
}

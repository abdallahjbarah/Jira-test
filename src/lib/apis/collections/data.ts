import { CollectionStatus } from '@/utils/constants';

export interface Collection {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  location: string;
  price: {
    amount: number;
    currency: string;
    per: string;
  };
  rating: {
    score: number;
    count: number;
  };
  images: {
    src: string;
    alt: string;
    isMain: boolean;
  }[];
  type: CollectionStatus;
  bookable: boolean;
}

export const collectionsData: Record<CollectionStatus, Collection[]> = {
  all: [],
  experiences: [
    {
      id: 'olive-harvesting-exp',
      title: {
        en: 'Olive Harvesting Experience',
        ar: 'التجربة الزراعية لحصاد الزيتون',
      },
      location: 'Ajloun, Jordan',
      price: {
        amount: 35,
        currency: 'JOD',
        per: 'person',
      },
      rating: {
        score: 4.7,
        count: 203,
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Olive tree plantation',
          isMain: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Olive harvesting tools',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Fresh picked olives',
          isMain: false,
        },
      ],
      type: 'experiences',
      bookable: true,
    },
  ],
  stays: [
    {
      id: 'desert-farm-stay',
      title: {
        en: 'Desert Farm Stay',
        ar: 'الإقامة في مزرعة الصحراء',
      },
      location: 'Wadi Rum, Jordan',
      price: {
        amount: 85,
        currency: 'JOD',
        per: 'night',
      },
      rating: {
        score: 4.9,
        count: 127,
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Desert farm with mountains in background',
          isMain: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Traditional desert accommodation',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Farm animals in desert setting',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Sunset view from farm stay',
          isMain: false,
        },
      ],
      type: 'stays',
      bookable: true,
    },
  ],
  events: [
    {
      id: 'agritech-expo-2023',
      title: {
        en: 'Annual Agritech Expo',
        ar: 'المعرض السنوي للتكنولوجيا الزراعية',
      },
      location: 'Balqa, Jordan',
      price: {
        amount: 25,
        currency: 'JOD',
        per: 'person',
      },
      rating: {
        score: 4.3,
        count: 155,
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Young corn plants growing in field',
          isMain: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Agricultural technology displays',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Agricultural conference',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Exhibition booths',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Technology demonstrations',
          isMain: false,
        },
      ],
      type: 'events',
      bookable: true,
    },
    {
      id: 'organic-farmers-market',
      title: {
        en: 'Weekend Organic Farmers Market',
        ar: 'سوق المزارع العضوية الأسبوعي',
      },
      location: 'Amman, Jordan',
      price: {
        amount: 0,
        currency: 'JOD',
        per: 'entry',
      },
      rating: {
        score: 4.4,
        count: 312,
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Farmers market with fresh produce',
          isMain: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Vegetable displays at farmers market',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Local vendors selling products',
          isMain: false,
        },
      ],
      type: 'events',
      bookable: false,
    },
  ],
  offers: [
    {
      id: 'honey-farm-visit-package',
      title: {
        en: 'Honey Farm Visit Package',
        ar: 'باقة الزيارة المعروضة لمزرعة العسل',
      },
      location: 'Irbid, Jordan',
      price: {
        amount: 50,
        currency: 'JOD',
        per: 'person',
      },
      rating: {
        score: 4.6,
        count: 89,
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Beehives at honey farm',
          isMain: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Honey extraction process',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Various honey products',
          isMain: false,
        },
      ],
      type: 'offers',
      bookable: true,
    },
  ],
  products: [
    {
      id: 'organic-olive-oil',
      title: {
        en: 'Premium Organic Olive Oil',
        ar: 'زيت زيتون عضوي عالي الجودة',
      },
      location: 'Jerash, Jordan',
      price: {
        amount: 15,
        currency: 'JOD',
        per: 'bottle',
      },
      rating: {
        score: 4.8,
        count: 234,
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Bottles of olive oil',
          isMain: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Olive oil production',
          isMain: false,
        },
        {
          src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
          alt: 'Olives used for oil production',
          isMain: false,
        },
      ],
      type: 'products',
      bookable: true,
    },
  ],
};

// Populate the 'all' category with all collections
collectionsData.all = [
  ...collectionsData.experiences,
  ...collectionsData.stays,
  ...collectionsData.events,
  ...collectionsData.offers,
  ...collectionsData.products,
];

export const wishlistData: Collection[] = [
  ...collectionsData.experiences,
  ...collectionsData.stays,
  ...collectionsData.events,
  ...collectionsData.offers,
  ...collectionsData.products,
];

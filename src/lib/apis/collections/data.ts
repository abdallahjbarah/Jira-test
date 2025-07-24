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
  startDateTime?: number;
  endDateTime?: number;
  languages?: {
    nameAr: string;
    nameEn: string;
  }[];
  host?: {
    _id: string;
    description: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
  };
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
  itineraryStops?: {
    title: string;
    locationURL: string;
    coordinates: [number, number];
    details: string;
    duration: number;
  }[];
  amenities?: {
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
  schedule?: {
    startDateTime: number;
    endDateTime: number;
    days: {
      name: string;
      slots?: {
        startTime: string;
        id: string;
      }[];
    }[];
  };
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
      host: {
        _id: '662a6214003594dc5abaf2c6',
        description: 'Bookagri  ',
        firstName: 'Bookagri',
        lastName: 'Bookagri',
        profileImageUrl:
          'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      coHost: {
        firstName: 'Khaled',
        lastName: 'Shrman ',
        description:
          'Khaled is an environmentalist whose passion is to revive and live  the memory of his grandparents village in this eco village when he was a kid. He has been supported by many volunteers from al over the world to help him build the eco village and rooms. He is very knowledgeable about nature and care for the environment. ',
        languages: [
          {
            _id: '65eed0654c7e924eb183cdeb',
            nameEn: 'Arabic',
            nameAr: 'العربية',
          },
          {
            _id: '6600169ee477ce9294eb680a',
            nameEn: 'English',
            nameAr: 'الانجليزية',
          },
        ],
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      amenities: [
        {
          _id: '663fc2ce32ced837bfb61b0f',
          nameEn: 'TV',
          nameAr: 'التلفزيون',
          category: [
            {
              _id: '663fc2a032ced837bfb61ae8',
              nameEn: 'Entertainment',
              nameAr: 'ترفيه',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '66466c06801cbbdcdb52d7f2',
          nameEn: 'Wifi',
          nameAr: 'واي فاي',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '664669d5801cbbdcdb52d2df',
          nameEn: 'Fridge',
          nameAr: 'ثلاجة',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '66466907801cbbdcdb52d0e4',
          nameEn: 'Kettle',
          nameAr: 'غلاية',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
      ],
      schedule: {
        startDateTime: 1717200000000,
        endDateTime: 1767225600000,
        days: [
          {
            name: 'Sunday',
            slots: [
              {
                startTime: '1717239600000',
                id: '898dc8e3-b5d3-489f-9df2-dac4c7528618',
              },
              {
                startTime: '1717205400000',
                id: '62769391-23cb-4953-8d4f-afc63a2a061e',
              },
            ],
          },
          {
            name: 'Monday',
            slots: [
              {
                startTime: '1717232400000',
                id: 'd392d113-6285-4e32-97ac-fc6be3ece521',
              },
              {
                startTime: '1717241400000',
                id: 'd7fb83c0-0915-4d0c-9cb5-87fe7bc40249',
              },
            ],
          },
          {
            name: 'Tuesday',
            slots: [
              {
                startTime: '1717230600000',
                id: '656270fe-0443-48cf-9499-6b434e1c9532',
              },
              {
                startTime: '1717241400000',
                id: '4e02047a-38de-43ad-b4f1-833081f31287',
              },
              {
                startTime: '1717250400000',
                id: '889da248-7561-4e3b-b408-768830ee6dd7',
              },
            ],
          },
          {
            name: 'Wednesday',
            slots: [
              {
                startTime: '1717230600000',
                id: 'a3f7a225-72b0-40d9-accf-6e5d6072e5a9',
              },
              {
                startTime: '1717239600000',
                id: 'f4c9ae1c-be91-4c15-bf3f-be33ee087234',
              },
              {
                startTime: '1717250400000',
                id: 'e6956b3a-1c6b-40ed-b7cf-a6b8184d04d0',
              },
            ],
          },
          {
            name: 'Thursday',
            slots: [
              {
                startTime: '1717230600000',
                id: 'aae7c1bc-2191-4af6-8b92-1769f355ee80',
              },
              {
                startTime: '1717239600000',
                id: 'd037635d-febc-4117-b2aa-5758d56732fc',
              },
              {
                startTime: '1717250400000',
                id: '09b0fb72-9bc5-4d44-85fe-5539a20f9d3d',
              },
              {
                startTime: '1717257600000',
                id: '7819a838-19db-450e-a3a4-4a291697a86b',
              },
            ],
          },
          {
            name: 'Friday',
            slots: [
              {
                startTime: '1717230600000',
                id: 'a7a58cb5-fabd-4874-9e4e-f6d33fc2146b',
              },
              {
                startTime: '1717239600000',
                id: 'a52b89be-0ebd-4177-830d-53e90c9378a4',
              },
              {
                startTime: '1717250400000',
                id: '51a9c275-59cc-4e49-aa4e-f9ca658f7a30',
              },
            ],
          },
          {
            name: 'Saturday',
            slots: [
              {
                startTime: '1717230600000',
                id: 'ab160deb-afde-4bbf-89d0-3448769368ca',
              },
              {
                startTime: '1717241400000',
                id: 'be58bd31-dd6e-4a4d-a885-0990e2d9554e',
              },
              {
                startTime: '1717250400000',
                id: 'c3eba63a-f51b-4ef6-9310-4d0fcc5a0bea',
              },
            ],
          },
        ],
      },
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
          startDateTime: new Date().setHours(13, 0, 0, 0),
    endDateTime: new Date().setHours(15, 0, 0, 0),
      languages: [
        {
          nameAr: 'العربية',
          nameEn: 'Arabic',
        },
        {
          nameAr: 'الانجليزية',
          nameEn: 'English',
        },
      ],
      host: {
        _id: '662a6214003594dc5abaf2c6',
        description: 'Bookagri  ',
        firstName: 'Bookagri',
        lastName: 'Bookagri',
        profileImageUrl:
          'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      coHost: {
        firstName: 'Khaled',
        lastName: 'Shrman ',
        description:
          'Khaled is an environmentalist whose passion is to revive and live  the memory of his grandparents village in this eco village when he was a kid. He has been supported by many volunteers from al over the world to help him build the eco village and rooms. He is very knowledgeable about nature and care for the environment. ',
        languages: [
          {
            _id: '65eed0654c7e924eb183cdeb',
            nameEn: 'Arabic',
            nameAr: 'العربية',
          },
          {
            _id: '6600169ee477ce9294eb680a',
            nameEn: 'English',
            nameAr: 'الانجليزية',
          },
        ],
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      amenities: [
        {
          _id: '663fc2ce32ced837bfb61b0f',
          nameEn: 'TV',
          nameAr: 'التلفزيون',
          category: [
            {
              _id: '663fc2a032ced837bfb61ae8',
              nameEn: 'Entertainment',
              nameAr: 'ترفيه',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '66466c06801cbbdcdb52d7f2',
          nameEn: 'Wifi',
          nameAr: 'واي فاي',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '664669d5801cbbdcdb52d2df',
          nameEn: 'Fridge',
          nameAr: 'ثلاجة',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '66466907801cbbdcdb52d0e4',
          nameEn: 'Kettle',
          nameAr: 'غلاية',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092806150-eeKgrzHKezbupPahVSccdN.png',
        },
      ],
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
      host: {
        _id: '662a6214003594dc5abaf2c6',
        description: 'Bookagri  ',
        firstName: 'Bookagri',
        lastName: 'Bookagri',
        profileImageUrl:
          'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      coHost: {
        firstName: 'Khaled',
        lastName: 'Shrman ',
        description:
          'Khaled is an environmentalist whose passion is to revive and live  the memory of his grandparents village in this eco village when he was a kid. He has been supported by many volunteers from al over the world to help him build the eco village and rooms. He is very knowledgeable about nature and care for the environment. ',
        languages: [
          {
            _id: '65eed0654c7e924eb183cdeb',
            nameEn: 'Arabic',
            nameAr: 'العربية',
          },
          {
            _id: '6600169ee477ce9294eb680a',
            nameEn: 'English',
            nameAr: 'الانجليزية',
          },
        ],
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      amenities: [
        {
          _id: '663fc2ce32ced837bfb61b0f',
          nameEn: 'TV',
          nameAr: 'التلفزيون',
          category: [
            {
              _id: '663fc2a032ced837bfb61ae8',
              nameEn: 'Entertainment',
              nameAr: 'ترفيه',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '66466c06801cbbdcdb52d7f2',
          nameEn: 'Wifi',
          nameAr: 'واي فاي',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        },
        {
          _id: '664669d5801cbbdcdb52d2df',
          nameEn: 'Fridge',
          nameAr: 'ثلاجة',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092885520-nKb5tBA2SEP3ARwvLBNugZ.png',
        },
        {
          _id: '66466907801cbbdcdb52d0e4',
          nameEn: 'Kettle',
          nameAr: 'غلاية',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092806150-eeKgrzHKezbupPahVSccdN.png',
        },
      ],
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
      host: {
        _id: '662a6214003594dc5abaf2c6',
        description: 'Bookagri  ',
        firstName: 'Bookagri',
        lastName: 'Bookagri',
        profileImageUrl:
          'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      coHost: {
        firstName: 'Khaled',
        lastName: 'Shrman ',
        description:
          'Khaled is an environmentalist whose passion is to revive and live  the memory of his grandparents village in this eco village when he was a kid. He has been supported by many volunteers from al over the world to help him build the eco village and rooms. He is very knowledgeable about nature and care for the environment. ',
        languages: [
          {
            _id: '65eed0654c7e924eb183cdeb',
            nameEn: 'Arabic',
            nameAr: 'العربية',
          },
          {
            _id: '6600169ee477ce9294eb680a',
            nameEn: 'English',
            nameAr: 'الانجليزية',
          },
        ],
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      amenities: [
        {
          _id: '663fc2ce32ced837bfb61b0f',
          nameEn: 'TV',
          nameAr: 'التلفزيون',
          category: [
            {
              _id: '663fc2a032ced837bfb61ae8',
              nameEn: 'Entertainment',
              nameAr: 'ترفيه',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092051674-id8n5j7GBFwy25nFsLXtc9.png',
        },
        {
          _id: '66466c06801cbbdcdb52d7f2',
          nameEn: 'Wifi',
          nameAr: 'واي فاي',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727091761376-vsRiBXvTkfNUyqpn3Nno2u.png',
        },
        {
          _id: '664669d5801cbbdcdb52d2df',
          nameEn: 'Fridge',
          nameAr: 'ثلاجة',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092885520-nKb5tBA2SEP3ARwvLBNugZ.png',
        },
        {
          _id: '66466907801cbbdcdb52d0e4',
          nameEn: 'Kettle',
          nameAr: 'غلاية',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092806150-eeKgrzHKezbupPahVSccdN.png',
        },
      ],
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
      host: {
        _id: '662a6214003594dc5abaf2c6',
        description: 'Bookagri  ',
        firstName: 'Bookagri',
        lastName: 'Bookagri',
        profileImageUrl:
          'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },
      coHost: {
        firstName: 'Khaled',
        lastName: 'Shrman ',
        description:
          'Khaled is an environmentalist whose passion is to revive and live  the memory of his grandparents village in this eco village when he was a kid. He has been supported by many volunteers from al over the world to help him build the eco village and rooms. He is very knowledgeable about nature and care for the environment. ',
        languages: [
          {
            _id: '65eed0654c7e924eb183cdeb',
            nameEn: 'Arabic',
            nameAr: 'العربية',
          },
          {
            _id: '6600169ee477ce9294eb680a',
            nameEn: 'English',
            nameAr: 'الانجليزية',
          },
        ],
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      },

      itineraryStops: [
        {
          title: 'Ariha/ Al Mugheir/ Karak',
          locationURL:
            'https://www.google.com/maps/search/?api=1&query=31.42930603346369,35.79149691414669&radius=1000',
          coordinates: [31.42930603346369, 35.79149691414669] as [
            number,
            number,
          ],
          details: 'Karaki farmers daily chores & life',
          duration: 2,
        },
        {
          title: 'Qsar Al-Azraq',
          locationURL:
            'https://www.google.com/maps/search/?api=1&query=31.35830912602621,35.748870009216326&radius=1000',
          coordinates: [31.42930603346369, 35.79149691414669] as [
            number,
            number,
          ],
          details:
            'Qasr al-Azraq is a large fortress located in present-day eastern Jordan. It is one of the desert castles, located on the outskirts of present-day Azraq',
          duration: 1,
        },
        {
          title: 'Umm Al Jimal',
          locationURL:
            'https://www.google.com/maps/search/?api=1&query=31.42930603346369,35.79149691414669&radius=1000',
          coordinates: [31.42930603346369, 35.79149691414669] as [
            number,
            number,
          ],
          details:
            'Umm el-Jimal, also known as Umm ej Jemāl, Umm al-Jimal, or Umm adj-Djimal, is a village in Northern Jordan approximately 17 kilometers east of Mafraq',
          duration: 0.75,
        },
        {
          title: 'Qasr Al-Harranah',
          locationURL:
            'https://www.google.com/maps/search/?api=1&query=31.42930603346369,35.79149691414669&radius=1000',
          coordinates: [31.42930603346369, 35.79149691414669] as [
            number,
            number,
          ],
          details:
            'Qasr Kharana, sometimes Qasr al-Harrana, Qasr al-Kharanah, Kharaneh, or Hraneh, is one of the best-known desert castles located in present-day eastern Jordan',
          duration: 1,
        },
        {
          title: 'Qasr Al-Hallabat',
          locationURL:
            'https://www.google.com/maps/search/?api=1&query=31.42930603346369,35.79149691414669&radius=1000',
          coordinates: [31.42930603346369, 35.79149691414669] as [
            number,
            number,
          ],
          details:
            'Umm el-Jimal, also known as Umm ej Jemāl, Umm al-Jimal, or Umm adj-Djimal, is a village in Northern Jordan approximately 17 kilometers east of Mafraq',
          duration: 0.75,
        },
      ],
      amenities: [
        {
          _id: '663fc2ce32ced837bfb61b0f',
          nameEn: 'TV',
          nameAr: 'التلفزيون',
          category: [
            {
              _id: '663fc2a032ced837bfb61ae8',
              nameEn: 'Entertainment',
              nameAr: 'ترفيه',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092051674-id8n5j7GBFwy25nFsLXtc9.png',
        },
        {
          _id: '66466c06801cbbdcdb52d7f2',
          nameEn: 'Wifi',
          nameAr: 'واي فاي',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727091761376-vsRiBXvTkfNUyqpn3Nno2u.png',
        },
        {
          _id: '664669d5801cbbdcdb52d2df',
          nameEn: 'Fridge',
          nameAr: 'ثلاجة',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092885520-nKb5tBA2SEP3ARwvLBNugZ.png',
        },
        {
          _id: '66466907801cbbdcdb52d0e4',
          nameEn: 'Kettle',
          nameAr: 'غلاية',
          category: [
            {
              _id: '6646673d801cbbdcdb52cc3e',
              nameEn: 'Home supplies',
              nameAr: 'مستلزمات المنزل',
            },
          ],
          iconPath:
            'https://agribooking.s3.me-south-1.amazonaws.com/icons/1727092806150-eeKgrzHKezbupPahVSccdN.png',
        },
      ],
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

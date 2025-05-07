interface Timezone {
  value: string;
  label: string;
}

const timezones: Timezone[] = [
  {
    value: 'Pacific/Honolulu',
    label: '(GMT-10:00) Hawaii',
  },
  {
    value: 'America/Juneau',
    label: '(GMT-9:00) Alaska',
  },
  {
    value: 'America/Tijuana',
    label: '(GMT-8:00) Tijuana, Pacific Time',
  },
  {
    value: 'America/Boise',
    label: '(GMT-7:00) Mountain Time',
  },
  {
    value: 'America/Chihuahua',
    label: '(GMT-7:00) Chihuahua, La Paz, Mazatlan',
  },
  {
    value: 'America/Phoenix',
    label: '(GMT-7:00) Arizona',
  },
  {
    value: 'America/Chicago',
    label: '(GMT-6:00) Central Time',
  },
  {
    value: 'America/Regina',
    label: '(GMT-6:00) Saskatchewan',
  },
  {
    value: 'America/Mexico_City',
    label: '(GMT-6:00) Guadalajara, Mexico City, Monterrey',
  },
  {
    value: 'America/Belize',
    label: '(GMT-6:00) Central America',
  },
  {
    value: 'America/Detroit',
    label: '(GMT-5:00) Eastern Time',
  },
  {
    value: 'America/Bogota',
    label: '(GMT-5:00) Bogota, Lima, Quito',
  },
  {
    value: 'America/Caracas',
    label: '(GMT-4:00) Caracas, La Paz',
  },
  {
    value: 'America/Santiago',
    label: '(GMT-3:00) Santiago',
  },
  {
    value: 'America/St_Johns',
    label: '(GMT-3:30) Newfoundland and Labrador',
  },
  {
    value: 'America/Sao_Paulo',
    label: '(GMT-3:00) Brasilia',
  },
  {
    value: 'America/Argentina/Buenos_Aires',
    label: '(GMT-3:00) Buenos Aires, Georgetown',
  },
  {
    value: 'America/Godthab',
    label: '(GMT-3:00) Greenland',
  },
  {
    value: 'Atlantic/Azores',
    label: '(GMT-1:00) Azores',
  },
  {
    value: 'Atlantic/Cape_Verde',
    label: '(GMT-1:00) Cape Verde Islands',
  },
  {
    value: 'GMT',
    label: '(GMT+0:00) Dublin, Edinburgh, Lisbon, London',
  },
  {
    value: 'Africa/Casablanca',
    label: '(GMT+0:00) Casablanca, Monrovia',
  },
  {
    value: 'Atlantic/Canary',
    label: '(GMT+0:00) Canary Islands',
  },
  {
    value: 'Europe/Belgrade',
    label: '(GMT+1:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  },
  {
    value: 'Europe/Sarajevo',
    label: '(GMT+1:00) Sarajevo, Skopje, Warsaw, Zagreb',
  },
  {
    value: 'Europe/Brussels',
    label: '(GMT+1:00) Brussels, Copenhagen, Madrid, Paris',
  },
  {
    value: 'Europe/Amsterdam',
    label: '(GMT+1:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  },
  {
    value: 'Africa/Algiers',
    label: '(GMT+1:00) West Central Africa',
  },
  {
    value: 'Europe/Bucharest',
    label: '(GMT+2:00) Bucharest',
  },
  {
    value: 'Africa/Cairo',
    label: '(GMT+2:00) Cairo',
  },
  {
    value: 'Europe/Helsinki',
    label: '(GMT+2:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius',
  },
  {
    value: 'Europe/Athens',
    label: '(GMT+2:00) Athens, Istanbul, Minsk',
  },
  {
    value: 'Asia/Jerusalem',
    label: '(GMT+2:00) Jerusalem',
  },
  {
    value: 'Africa/Harare',
    label: '(GMT+2:00) Harare, Pretoria',
  },
  {
    value: 'Asia/Amman',
    label: '(GMT+3:00) Amman',
  },
  {
    value: 'Europe/Moscow',
    label: '(GMT+3:00) Moscow, St. Petersburg, Volgograd',
  },
  {
    value: 'Asia/Kuwait',
    label: '(GMT+3:00) Kuwait, Riyadh',
  },
  {
    value: 'Africa/Nairobi',
    label: '(GMT+3:00) Nairobi',
  },
  {
    value: 'Asia/Baghdad',
    label: '(GMT+3:00) Baghdad',
  },
  {
    value: 'Asia/Tehran',
    label: '(GMT+3:30) Tehran',
  },
  {
    value: 'Asia/Dubai',
    label: '(GMT+4:00) Abu Dhabi, Muscat',
  },
  {
    value: 'Asia/Kabul',
    label: '(GMT+4:30) Kabul',
  },
  {
    value: 'Asia/Baku',
    label: '(GMT+5:00) Baku, Tbilisi, Yerevan',
  },
  {
    value: 'Asia/Yekaterinburg',
    label: '(GMT+5:00) Ekaterinburg',
  },
  {
    value: 'Asia/Karachi',
    label: '(GMT+5:00) Islamabad, Karachi, Tashkent',
  },
  {
    value: 'Asia/Kolkata',
    label: '(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi',
  },
  {
    value: 'Asia/Colombo',
    label: '(GMT+5:30) Sri Jayawardenepura',
  },
  {
    value: 'Asia/Kathmandu',
    label: '(GMT+5:45) Kathmandu',
  },
  {
    value: 'Asia/Dhaka',
    label: '(GMT+6:00) Astana, Dhaka',
  },
  {
    value: 'Asia/Almaty',
    label: '(GMT+6:00) Almaty, Novosibirsk',
  },
  {
    value: 'Asia/Rangoon',
    label: '(GMT+6:30) Yangon Rangoon',
  },
  {
    value: 'Asia/Bangkok',
    label: '(GMT+7:00) Bangkok, Hanoi, Jakarta',
  },
  {
    value: 'Asia/Krasnoyarsk',
    label: '(GMT+7:00) Krasnoyarsk',
  },
  {
    value: 'Asia/Shanghai',
    label: '(GMT+8:00) Beijing, Chongqing, Hong Kong SAR, Urumqi',
  },
  {
    value: 'Asia/Kuala_Lumpur',
    label: '(GMT+8:00) Kuala Lumpur, Singapore',
  },
  {
    value: 'Asia/Taipei',
    label: '(GMT+8:00) Taipei',
  },
  {
    value: 'Australia/Perth',
    label: '(GMT+8:00) Perth',
  },
  {
    value: 'Asia/Irkutsk',
    label: '(GMT+8:00) Irkutsk, Ulaanbaatar',
  },
  {
    value: 'Asia/Seoul',
    label: '(GMT+9:00) Seoul',
  },
  {
    value: 'Asia/Tokyo',
    label: '(GMT+9:00) Osaka, Sapporo, Tokyo',
  },
  {
    value: 'Australia/Darwin',
    label: '(GMT+9:30) Darwin',
  },
  {
    value: 'Asia/Yakutsk',
    label: '(GMT+10:00) Yakutsk',
  },
  {
    value: 'Australia/Brisbane',
    label: '(GMT+10:00) Brisbane',
  },
  {
    value: 'Australia/Sydney',
    label: '(GMT+10:00) Canberra, Melbourne, Sydney',
  },
  {
    value: 'Pacific/Guam',
    label: '(GMT+10:00) Guam, Port Moresby',
  },
  {
    value: 'Australia/Hobart',
    label: '(GMT+10:00) Hobart',
  },
  {
    value: 'Asia/Vladivostok',
    label: '(GMT+10:00) Vladivostok',
  },
  {
    value: 'Asia/Magadan',
    label: '(GMT+11:00) Magadan, Solomon Islands, New Caledonia',
  },
  {
    value: 'Pacific/Fiji',
    label: '(GMT+12:00) Fiji Islands',
  },
  {
    value: 'Asia/Kamchatka',
    label: '(GMT+12:00) Kamchatka',
  },
  {
    value: 'Pacific/Auckland',
    label: '(GMT+12:00) Auckland, Wellington',
  },
  {
    value: 'Pacific/Tongatapu',
    label: "(GMT+13:00) Nuku'alofa",
  },
];

export default timezones;

import React, { ReactNode } from 'react';

interface StatisticItem {
  number: string;
  title: ReactNode;
}

export const statisticsData: StatisticItem[] = [
  {
    number: '40',
    title: React.createElement(
      React.Fragment,
      null,
      'Agritourism ',
      React.createElement('br'),
      ' experiences',
    ),
  },
  {
    number: '20',
    title: React.createElement(
      React.Fragment,
      null,
      'Years of experience ',
      React.createElement('br'),
      ' in tourism',
    ),
  },
  {
    number: '400',
    title: React.createElement(
      React.Fragment,
      null,
      'Women ',
      React.createElement('br'),
      ' empowered',
    ),
  },
  {
    number: '15000',
    title: React.createElement(
      React.Fragment,
      null,
      'Tourists ',
      React.createElement('br'),
      ' trust us',
    ),
  },
  {
    number: '1000',
    title: React.createElement(
      React.Fragment,
      null,
      'Yearly experiences ',
      React.createElement('br'),
      ' added',
    ),
  },
];

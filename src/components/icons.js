import React from 'react';

const Arrow = ({className, direction}) => {
  return direction === 'right' ? (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12M4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12M10,17L15,12L10,7V17Z"
      />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12M14,7L9,12L14,17V7Z"
      />
    </svg>
  );
};

const Calendar = props => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19,4H18V2H16V4H8V2H6V4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M5,8V6H19V8H5M10.56,18.46L16.5,12.53L15.43,11.47L10.56,16.34L8.45,14.23L7.39,15.29L10.56,18.46Z"
    />
  </svg>
);

const Check = props => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
    />
  </svg>
);

const Close = props => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
    />
  </svg>
);

const ListPoint = props => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
    />
  </svg>
);

const Menu = props => (
  <svg {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" />
  </svg>
);

const Number = ({className, value}) => {
  switch (value) {
    case 1:
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M10,7H14V17H12V9H10V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
          />
        </svg>
      );
    case 2:
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V15H15V17H11L9,17V13A2,2 0 0,1 11,11H13V9H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
          />
        </svg>
      );
    case 3:
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15,15A2,2 0 0,1 13,17H9V15H13V13H11V11H13V9H9V7H13A2,2 0 0,1 15,9V10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 15,13.5V15M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
          />
        </svg>
      );
    default:
      throw new Error('Prop "value" must be specified for number icon.');
  }
};

const Search = props => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
    />
  </svg>
);

const Tools = props => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M13.78 15.3L19.78 21.3L21.89 19.14L15.89 13.14L13.78 15.3M17.5 10.1C17.11 10.1 16.69 10.05 16.36 9.91L4.97 21.25L2.86 19.14L10.27 11.74L8.5 9.96L7.78 10.66L6.33 9.25V12.11L5.63 12.81L2.11 9.25L2.81 8.55H5.62L4.22 7.14L7.78 3.58C8.95 2.41 10.83 2.41 12 3.58L9.89 5.74L11.3 7.14L10.59 7.85L12.38 9.63L14.2 7.75C14.06 7.42 14 7 14 6.63C14 4.66 15.56 3.11 17.5 3.11C18.09 3.11 18.61 3.25 19.08 3.53L16.41 6.2L17.91 7.7L20.58 5.03C20.86 5.5 21 6 21 6.63C21 8.55 19.45 10.1 17.5 10.1Z"
    />
  </svg>
);

export const Icon = {
  Arrow,
  Calendar,
  Check,
  Close,
  ListPoint,
  Menu,
  Number,
  Search,
  Tools
};

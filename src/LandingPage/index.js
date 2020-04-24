import React from 'react';
import logo from '../assets/images/Cofind_logo_roh_neg.png';
import centerLogo from '../assets/images/Cofind_logo_roh_pos.png';
import {useLocale} from '../context/locale';
import {useMediaQuery} from 'react-responsive';
import {screens} from '../utils/constants';
import job_seeker from '../assets/images/job_seeker.jpg';
import job_offer from '../assets/images/job_offer.jpg';
import hero from '../assets/images/landing_1.jpg';
import {DesktopMenu} from './Menus/desktop';
import {MobileMenu} from './Menus/mobile';

export const menuItems = [
  {text: 'howItWorks', to: '#section-how-it-works'},
  {text: 'forWorker', to: '#section-for-worker'},
  {text: 'forEmployer', to: '#section-for-employer'},
  {text: 'listings', to: '#section-listings'},
  {text: 'contact', to: '#section-footer'}
];

const shortcuts = [
  {
    icon: (
      <svg className="h-16 lg:h-24 mx-auto text-green-500" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
        />
      </svg>
    ),
    headerKey: 'forWorker',
    contentKey: 'forWorkerDesc',
    to: '#section-for-worker'
  },
  {
    icon: (
      <svg className="h-16 lg:h-24 mx-auto text-green-500" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M13.78 15.3L19.78 21.3L21.89 19.14L15.89 13.14L13.78 15.3M17.5 10.1C17.11 10.1 16.69 10.05 16.36 9.91L4.97 21.25L2.86 19.14L10.27 11.74L8.5 9.96L7.78 10.66L6.33 9.25V12.11L5.63 12.81L2.11 9.25L2.81 8.55H5.62L4.22 7.14L7.78 3.58C8.95 2.41 10.83 2.41 12 3.58L9.89 5.74L11.3 7.14L10.59 7.85L12.38 9.63L14.2 7.75C14.06 7.42 14 7 14 6.63C14 4.66 15.56 3.11 17.5 3.11C18.09 3.11 18.61 3.25 19.08 3.53L16.41 6.2L17.91 7.7L20.58 5.03C20.86 5.5 21 6 21 6.63C21 8.55 19.45 10.1 17.5 10.1Z"
        />
      </svg>
    ),
    headerKey: 'forEmployer',
    contentKey: 'forEmployerDesc',
    to: '#section-for-employer'
  },
  {
    icon: (
      <svg className="h-16 lg:h-24 mx-auto text-green-500" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,4H18V2H16V4H8V2H6V4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M5,8V6H19V8H5M10.56,18.46L16.5,12.53L15.43,11.47L10.56,16.34L8.45,14.23L7.39,15.29L10.56,18.46Z"
        />
      </svg>
    ),
    headerKey: 'jobOffers',
    contentKey: 'listingsDesc',
    to: '#section-listings'
  }
];

const checkmark = (
  <svg className="h-8 w-8 mr-6 text-green-500" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
    />
  </svg>
);

const howItWorkSteps = ['howItWorks-1', 'howItWorks-2', 'howItWorks-3'];

export default () => {
  const {translate} = useLocale();
  const isDesktop = useMediaQuery({
    minWidth: screens.DESKTOP_MIN_WIDTH
  });

  return (
    <div className="w-full relative">
      {/* Navbar */}
      <div className="w-full py-6 px-4 lg:px-16 absolute z-10 flex items-end justify-between bg-black-75">
        <img
          className="w-auto h-20 lg:h-24"
          src={logo}
          alt={translate('logo')}
        />
        {isDesktop && <DesktopMenu />}
        {!isDesktop && <MobileMenu />}
      </div>

      {/* Hero */}
      <div
        className="text-white w-full h-96 lg:h-128 bg-cover flex flex-col items-center justify-center"
        style={{backgroundImage: `url(${hero}`}}
      >
        <div className="flex items-center z-10 relative">
          <svg className="h-8 lg:h-16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12M4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12M10,17L15,12L10,7V17Z"
            />
          </svg>
          <h1 className="mx-4 text-4xl lg:text-6xl font-bold uppercase">
            Cofind
          </h1>
          <svg className="h8 lg:h-16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12M14,7L9,12L14,17V7Z"
            />
          </svg>
        </div>
        <p className="text-3xl lg:text-5xl">{translate('slogan')}</p>
      </div>

      {/* Shortcuts */}
      <div
        className="z-20 flex flex-col items-center lg:justify-center"
        style={{marginTop: '-120px'}}
      >
        <div className="bg-white max-w-xs lg:max-w-full lg:pb-12 lg:pt-10 shadow-2xl lg:flex lg:justify-center">
          {shortcuts.map(({icon, headerKey, contentKey, to}, i) => {
            return (
              <div
                key={headerKey}
                className={`max-w-xs border-green-500 mx-12 lg:mx-0 py-6 lg:py-0 lg:px-12 text-center ${
                  i === 1
                    ? 'border-t-2 border-b-2 lg:border-t-0 lg:border-b-0 lg:border-l-2 lg:border-r-2'
                    : ''
                }`}
              >
                {icon}
                <h2 className="font-bold text-3xl">{translate(headerKey)}</h2>
                <p>{translate(contentKey)}</p>
                <a
                  className="bg-blue-500 rounded-lg block mt-6 py-2 px-4 text-white"
                  href={to}
                >
                  {translate('readMore')}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* How does it work */}
      <div id="section-how-it-works" className="my-24 px-4 max-w-3xl mx-auto">
        <h3 className="text-center text-3xl lg:text-5xl mb-4">
          {translate('howItWorks')}
        </h3>
        <p
          className="px-2 lg:px-0"
          dangerouslySetInnerHTML={{__html: translate('howItWorksDesc')}}
        />
        <ul className="mx-auto">
          {howItWorkSteps.map(step => (
            <li key={step} className="flex items-center my-3">
              {checkmark}{' '}
              <p className="max-w-xs lg:max-w-xl">{translate(step)}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Description 1 */}
      <div
        id="section-for-worker"
        style={{backgroundImage: `url(${job_seeker})`}}
        className="pt-12 pb-32 bg-contain lg:bg-cover"
      >
        <h3 className="uppercase text-4xl lg:text-6xl text-white text-center font-bold tracking-wide">
          {translate('forWorker')}
        </h3>
      </div>

      <div style={{marginTop: '-6rem'}} className="flex justify-center">
        <div className="bg-white max-w-3xl p-6 shadow-2xl">
          <p
            className="font-bold"
            dangerouslySetInnerHTML={{__html: translate('forWorkerIntro')}}
          />
          <ul>
            <li className="flex items-start my-3">
              <svg className="w-8 text-green-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10,7H14V17H12V9H10V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forWorker-1')}
              </p>
            </li>
            <li className="flex items-start my-3">
              <svg className="w-8 h-8 text-green-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V15H15V17H11L9,17V13A2,2 0 0,1 11,11H13V9H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forWorker-2')}
              </p>
            </li>
            <li className="flex items-center my-3">
              <svg className="w-8 text-green-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15,15A2,2 0 0,1 13,17H9V15H13V13H11V11H13V9H9V7H13A2,2 0 0,1 15,9V10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 15,13.5V15M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forWorker-3')}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider/logo */}
      <div className="py-24 lg:py-40">
        <img
          className="h-20 lg:h-32 mx-auto"
          src={centerLogo}
          alt={translate('logo')}
        />
      </div>

      {/* Description 2 */}
      <div
        id="section-for-employer"
        style={{backgroundImage: `url(${job_offer})`}}
        className="pt-12 pb-32 bg-contain lg:bg-cover"
      >
        <h3 className="uppercase text-4xl lg:text-6xl text-white text-center font-bold tracking-wide">
          {translate('forEmployer')}
        </h3>
      </div>

      <div style={{marginTop: '-6rem'}} className="flex justify-center">
        <div className="bg-white max-w-3xl p-6 shadow-2xl">
          <p className="font-bold"></p>
          <ul>
            <li className="flex items-start my-3">
              <svg className="w-8 text-blue-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10,7H14V17H12V9H10V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forEmployer-1')}
              </p>
            </li>
            <li className="flex items-start my-3">
              <svg className="w-8 h-8 text-blue-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V15H15V17H11L9,17V13A2,2 0 0,1 11,11H13V9H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forEmployer-2')}
              </p>
            </li>
            <li className="flex items-center my-3">
              <svg className="w-8 text-blue-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15,15A2,2 0 0,1 13,17H9V15H13V13H11V11H13V9H9V7H13A2,2 0 0,1 15,9V10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 15,13.5V15M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forEmployer-3')}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Listings */}
      <div id="section-listings" className="my-24 max-w-3xl mx-auto">
        <h3 className="text-center text-3xl lg:text-5xl mb-4">
          {translate('listings')}
        </h3>
        <p className="px-4">{translate('listingsDescLong')}</p>
        <div className="flex flex-col lg:flex-row justify-center mt-8 px-4">
          <a
            className="flex items-center justify-center text-lg border-green-500 border-2 py-3 px-6 rounded-lg mb-6 lg:mb-0 lg:mr-10"
            href="/"
          >
            {translate('viewJobOffers')}
            <svg className="w-8 text-green-500 ml-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z"
              />
            </svg>
          </a>
          <a
            href="/"
            className="flex items-center justify-center text-lg border-blue-500 border-2 py-3 px-6 rounded-lg"
          >
            {translate('viewWorkerOffers')}
            <svg className="w-8 text-blue-500 ml-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        id="section-footer"
        className="p-6 bg-gray-800 text-white flex flex-col-reverse lg:flex-row"
      >
        <img
          className="w-auto h-20 mx-auto lg:mx-0"
          src={logo}
          alt={translate('logo')}
        />
        <div className="ml-8">Kontaktandmed jm</div>
      </footer>
    </div>
  );
};

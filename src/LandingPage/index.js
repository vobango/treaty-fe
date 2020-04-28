import React from 'react';
import logo from '../assets/images/logo_neg.svg';
import centerLogo from '../assets/images/logo_pos.svg';
import {useLocale} from '../context/locale';
import {useMediaQuery} from 'react-responsive';
import {screens} from '../utils/constants';
import {DesktopMenu} from './Menus/desktop';
import {MobileMenu} from './Menus/mobile';
import {Icon} from '../components/icons';
import {ContactForm} from '../components/contactForm';
import Image from './images';

export const menuItems = [
  {text: 'howItWorks', to: '#section-how-it-works'},
  {text: 'forWorker', to: '#section-for-worker'},
  {text: 'forEmployer', to: '#section-for-employer'},
  {text: 'listings', to: '#section-listings'},
  {text: 'contact', to: '#section-contact'}
];

const shortcuts = [
  {
    icon: <Icon.Search className="h-16 lg:h-24 mx-auto text-green-500" />,
    headerKey: 'forWorker',
    contentKey: 'forWorkerDesc',
    to: '#section-for-worker'
  },
  {
    icon: <Icon.Tools className="h-16 lg:h-24 mx-auto text-green-500" />,
    headerKey: 'forEmployer',
    contentKey: 'forEmployerDesc',
    to: '#section-for-employer'
  },
  {
    icon: <Icon.Calendar className="h-16 lg:h-24 mx-auto text-green-500" />,
    headerKey: 'jobOffers',
    contentKey: 'listingsDesc',
    to: '#section-listings'
  }
];

const howItWorkSteps = ['howItWorks-1', 'howItWorks-2', 'howItWorks-3'];

export default () => {
  const {translate} = useLocale();
  const isDesktop = useMediaQuery({
    minWidth: screens.DESKTOP_MIN_WIDTH
  });

  return (
    <div className="w-full relative">
      {/* Navbar */}
      <div className="w-full py-6 px-4 lg:px-16 absolute z-20 flex items-start sm:items-end justify-between bg-black-75">
        <img
          className="h-16 sm:h-20 lg:h-24"
          src={logo}
          alt={translate('logo')}
        />
        {isDesktop && <DesktopMenu />}
        {!isDesktop && <MobileMenu />}
      </div>

      {/* Hero */}
      <div className="h-106 lg:h-128">
        <div className="absolute z-10 text-white w-full flex flex-col items-center justify-center pt-12 lg:pt-0 h-106 lg:h-128">
          <div className="flex items-center justify-center">
            <Icon.Arrow className="h-8 lg:h-16" direction="right" />
            <h1 className="mx-4 text-4xl lg:text-6xl font-bold uppercase">
              Cofind
            </h1>
            <Icon.Arrow className="h-8 lg:h-16" direction="left" />
          </div>
          <p className="text-3xl lg:text-5xl mt-4 tracking-wider">
            {translate('slogan')}
          </p>
          <div className="mt-8">
            <a
              className="rounded-lg px-6 lg:px-8 py-3 lg:py-4 text-lg lg:text-2xl bg-green-500 border-2 border-green-500 hover:bg-green-600 hover:border-green-600 focus:outline-none focus:shadow-outline active:bg-green-700 active:border-green-700"
              href="/sign-up"
            >
              {translate('register')}
            </a>
            <a
              className="rounded-lg px-6 lg:px-8 py-3 lg:py-4 ml-10 text-lg lg:text-2xl border-2 border-white hover:border-green-500 hover:text-green-500 focus:outline-none focus:shadow-outline active:border-green-700 active:text-green-700"
              href="/login"
            >
              {translate('login')}
            </a>
          </div>
        </div>
        <Image.Hero className="w-full relative h-full object-cover" />
      </div>

      {/* Shortcuts */}
      <div className="relative z-20 flex flex-col items-center lg:justify-center -mt-10 lg:-mt-32">
        <div className="bg-white max-w-xs lg:max-w-full lg:pb-12 lg:pt-10 shadow-2xl lg:flex lg:justify-center">
          {shortcuts.map(({icon, headerKey, contentKey, to}, i) => {
            return (
              <div
                key={headerKey}
                className={`max-w-xs border-green-500 flex flex-col mx-12 lg:mx-0 py-6 lg:py-0 lg:px-12 text-center ${
                  i === 1
                    ? 'border-t-2 border-b-2 lg:border-t-0 lg:border-b-0 lg:border-l-2 lg:border-r-2'
                    : ''
                }`}
              >
                {icon}
                <h2 className="font-bold text-3xl">{translate(headerKey)}</h2>
                <p>{translate(contentKey)}</p>
                <a
                  className="bg-blue-500 rounded-lg block mt-6 mx-auto py-2 px-6 text-white hover:shadow-outline active:bg-blue-600 focus:outline-none focus:shadow-outline"
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
      <div
        id="section-how-it-works"
        className="my-24 px-4 max-w-lg lg:max-w-3xl mx-auto"
      >
        <h3 className="text-center text-3xl lg:text-5xl mb-4">
          {translate('howItWorks')}
        </h3>
        <p
          className="px-2 lg:px-0 leading-relaxed"
          dangerouslySetInnerHTML={{__html: translate('howItWorksDesc')}}
        />
        <ul className="mx-auto mt-4">
          {howItWorkSteps.map(step => (
            <li key={step} className="flex items-center my-3">
              <Icon.ListPoint className="h-8 w-8 mr-3 sm:mr-4 lg:mr-6 text-green-500" />
              <p className="max-w-xs lg:max-w-xl">{translate(step)}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Description 1 */}
      <div id="section-for-worker">
        <h3 className="uppercase text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold tracking-wider absolute z-10 w-full pt-16">
          {translate('forWorker')}
        </h3>
        <Image.Jobseeker className="w-full relative h-64 lg:h-88 object-cover" />
      </div>

      <div className="flex justify-center -mt-24 lg:-mt-40 mb-32 relative z-10">
        <div className="bg-white max-w-3xl mx-4 p-6 shadow-2xl flex flex-col items-start">
          <p
            className="font-bold"
            dangerouslySetInnerHTML={{__html: translate('forWorkerIntro')}}
          />
          <ul>
            <li className="flex items-start my-3">
              <Icon.Number className="w-8 text-green-500 mr-3" value={1} />
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forWorker-1')}
              </p>
            </li>
            <li className="flex items-start my-3">
              <Icon.Number className="w-8 text-green-500 mr-3" value={2} />
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forWorker-2')}
              </p>
            </li>
            <li className="flex items-center my-3">
              <Icon.Number className="w-8 text-green-500 mr-3" value={3} />
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forWorker-3')}
              </p>
            </li>
          </ul>
          <a
            href="/sign-up"
            className="bg-green-500 rounded-lg px-6 py-3 mt-3 mb-2 mx-auto text-white font-bold hover:bg-green-600 focus:outline-none focus:shadow-outline active:bg-green-700"
          >
            {translate('registerNow')}
          </a>
        </div>
      </div>

      {/* Divider/logo */}
      <div className="pb-32 lg:pb-48" aria-hidden>
        <img
          className="h-20 lg:h-32 mx-auto"
          src={centerLogo}
          alt={translate('logo')}
        />
      </div>

      {/* Description 2 */}
      <div id="section-for-employer">
        <h3 className="uppercase text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold tracking-wider absolute z-10 w-full pt-16">
          {translate('forEmployer')}
        </h3>
        <Image.Joboffer className="w-full relative h-64 lg:h-88 object-cover" />
      </div>

      <div className="flex justify-center -mt-24 lg:-mt-40 mb-32 relative z-10">
        <div className="bg-white max-w-3xl mx-4 p-6 shadow-2xl flex flex-col items-start">
          <p className="font-bold">{translate('forEmployerIntro')}</p>
          <ul>
            <li className="flex items-start my-3">
              <Icon.Number className="w-8 text-blue-500 mr-3" value={1} />
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forEmployer-1')}
              </p>
            </li>
            <li className="flex items-start my-3">
              <Icon.Number className="w-8 text-blue-500 mr-3" value={2} />
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forEmployer-2')}
              </p>
            </li>
            <li className="flex items-center my-3">
              <Icon.Number className="w-8 text-blue-500 mr-3" value={3} />
              <p className="max-w-xs lg:max-w-2xl">
                {translate('forEmployer-3')}
              </p>
            </li>
          </ul>
          <a
            href="/sign-up"
            className="bg-blue-500 rounded-lg px-6 py-3 mt-3 mb-2 mx-auto text-white font-bold hover:bg-blue-600 focus:outline-none focus:shadow-outline active:bg-blue-700"
          >
            {translate('registerNow')}
          </a>
        </div>
      </div>

      {/* Listings */}
      <div
        id="section-listings"
        className="my-40 mx-4 sm:mx-auto max-w-lg lg:max-w-3xl"
      >
        <h3 className="text-center text-3xl lg:text-5xl mb-4">
          {translate('listings')}
        </h3>
        <p>{translate('listingsDescLong')}</p>
        <div className="flex flex-col lg:flex-row justify-center mt-8">
          <a
            className="flex items-center justify-center text-lg border-green-500 border-2 py-3 px-6 rounded-lg mb-6 lg:mb-0 lg:mr-10 hover:border-green-700 focus:outline-none focus:shadow-outline"
            href="/"
          >
            {translate('viewJobOffers')}
            <Icon.Arrow direction="right" className="w-8 text-green-500 ml-2" />
          </a>
          <a
            href="/"
            className="flex items-center justify-center text-lg border-blue-500 border-2 py-3 px-6 rounded-lg hover:border-blue-700 focus:outline-none focus:shadow-outline"
          >
            {translate('viewWorkerOffers')}
            <Icon.Arrow
              direction="right"
              className="w-8 text-blue-500 ml-2"
            />{' '}
          </a>
        </div>
      </div>

      {/* Contact form */}
      <div id="section-contact relative">
        <h3 className="uppercase text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold tracking-wider absolute z-10 w-full pt-16">
          Võta ühendust
        </h3>
        <Image.Contact className="w-full relative h-64 lg:h-88 object-cover" />
      </div>

      <div className="flex justify-center -mt-24 lg:-mt-40 mb-32 relative z-10">
        <div className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-4 px-6 py-8 shadow-2xl">
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <footer
        id="section-footer"
        className="p-6 bg-gray-800 text-white flex flex-col-reverse lg:flex-row"
      >
        <img
          aria-hidden
          className="w-auto h-20 mx-auto lg:mx-0"
          src={logo}
          alt={translate('logo')}
        />
        <div className="ml-8">Kontaktandmed jm</div>
      </footer>
    </div>
  );
};

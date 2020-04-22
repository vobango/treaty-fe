import React from 'react';
import logo from '../assets/images/Cofind_logo_roh_neg.png';
import centerLogo from '../assets/images/Cofind_logo_roh_pos.png';
import {useLocale} from '../context/locale';
import {useMediaQuery} from 'react-responsive';
import {screens} from '../utils/constants';
import Portal from '../Portal';
import job_seeker from '../assets/images/job_seeker.jpg';
import job_offer from '../assets/images/job_offer.jpg';
import hero from '../assets/images/landing_1.jpg';

const menuItems = [
  {text: 'howItWorks', to: '/'},
  {text: 'offerWork', to: '/'},
  {text: 'offerWorkers', to: '/'},
  {text: 'jobOffers', to: '/'},
  {text: 'workerOffers', to: '/'},
  {text: 'contact', to: '/'}
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
    header: 'Tööotsijale',
    content: 'Andmebaasi sisestatakse oma töösoovid ja oskused',
    to: '/'
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
    header: 'Tööpakkumised',
    content: 'Parimad pakkumised erialalist tööd',
    to: '/'
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
    header: 'Tööandjale',
    content: 'Ettevõtted, kes vajavad kiirelt vabu töökäsi',
    to: '/'
  }
];

const DesktopMenu = () => {
  const {translate} = useLocale();

  return (
    <nav className="flex items-center justify-center">
      <ul className="flex text-xl">
        {menuItems.map(({text, to}) => {
          return (
            <li className="mx-6 text-white font-bold" key={text}>
              <a
                href={to}
                className="border-0 border-b-2 border-transparent hover:border-white"
              >
                {translate(text)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const MobileMenu = () => {
  const {translate} = useLocale();
  const [menuVisible, setMenuVisibility] = React.useState(false);

  return (
    <div>
      {menuVisible && (
        <Portal id="menu">
          <div className="bg-white fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <nav className="flex items-center justify-center">
              <ul className="flex-col text-2xl">
                {menuItems.map(({text, to}) => {
                  return (
                    <li className="m-6 text-black font-bold" key={text}>
                      <a
                        href={to}
                        className="border-0 border-b-2 border-transparent hover:border-white"
                      >
                        {translate(text)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <button
              className="text-lg"
              onClick={() => setMenuVisibility(false)}
            >
              <div className="text-black">
                <svg width={48} height={48} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                  />
                </svg>
                <span>Close</span>
              </div>
            </button>
          </div>
        </Portal>
      )}
      <button className="text-lg" onClick={() => setMenuVisibility(true)}>
        <div className="text-white">
          <svg width={48} height={48} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"
            />
          </svg>
          <span>Menu</span>
        </div>
      </button>
    </div>
  );
};

const checkmark = (
  <svg className="h-8 w-8 mr-6 text-green-500" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
    />
  </svg>
);

export default () => {
  const {translate} = useLocale();
  const isDesktop = useMediaQuery({
    minWidth: screens.DESKTOP_MIN_WIDTH
  });

  return (
    <div className="w-full relative">
      <div className="w-full py-6 px-4 lg:px-16 absolute z-10 flex items-end justify-between bg-black-75">
        <a href="/">
          <img
            className="w-auto h-20 lg:h-24"
            src={logo}
            alt={translate('logo')}
          />
        </a>
        {isDesktop && <DesktopMenu />}
        {!isDesktop && <MobileMenu />}
      </div>

      <div
        className="text-white w-full h-96 lg:h-128 bg-cover flex flex-col items-center justify-center"
        style={{backgroundImage: `url(${hero}`}}
      >
        <div className="flex items-center z-10 relative">
          <svg className="h-8 lg:h-16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M2 12A10 10 0 0112 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12m8 5l5-5-5-5v10z"
            />
          </svg>
          <h1 className="mx-4 text-4xl lg:text-6xl font-bold">
            {'Cofind'.toUpperCase()}
          </h1>
          <svg className="h-8 lg:h-16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22 12a10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2a10 10 0 0110 10m-8-5l-5 5 5 5V7z"
            />
          </svg>
        </div>
        <p className="text-3xl lg:text-5xl">toob partnerid kokku</p>
      </div>

      <div
        className="z-20 flex flex-col items-center lg:justify-center"
        style={{marginTop: '-120px'}}
      >
        <div className="bg-white max-w-xs lg:max-w-full lg:pb-12 lg:pt-10 shadow-2xl lg:flex lg:justify-center">
          {shortcuts.map(({icon, header, content, to}, i) => {
            return (
              <div
                key={header}
                className={`max-w-xs border-green-500 mx-12 lg:mx-0 py-6 lg:py-0 lg:px-12 text-center ${
                  i === 1
                    ? 'border-t-2 border-b-2 lg:border-t-0 lg:border-b-0 lg:border-l-2 lg:border-r-2'
                    : ''
                }`}
              >
                {icon}
                <h2 className="font-bold text-3xl">{header}</h2>
                <p>{content}</p>
                <a
                  className="bg-blue-500 rounded-lg block mt-6 py-2 px-4 text-white"
                  href={to}
                >
                  Vaata lähemalt
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-24 px-4 max-w-3xl mx-auto">
        <h3 className="text-center text-3xl lg:text-5xl mb-4">
          Kuidas see töötab?
        </h3>
        <p className="px-2">
          COFIND on suunatud ehitussektori peamisele puudusele - töö ja tööjõu
          leidmise probleemile ja sellele, kui palju aega kulub ükskõik kumma
          leidmiseks. <br /> See on lahendus, kus väga täpselt suunatud
          pakkumine leiab kiiresti parima lahenduse. <br /> Ettevõte, kellel on
          hetkeliselt puudu töökätest või on üle tööjõudu sisestavad oma väga
          konkreetsed vajadused ning meie teeme ülejäänu. <br /> See on väga
          täpselt suunatud pakkumise ja nõudluse vajaduse rahuldamine, kus nii
          tööjõu pakkujad ja töökäte vajajad on võrdsed partnerid, kes tahavad
          lahendada ühist probleemi - tööhõive probleemi - et keegi ei istuks
          jõude, kui kusagil objekt põleb.
        </p>
        <ul className="mx-auto">
          <li className="flex items-center my-3">
            {checkmark}{' '}
            <p className="max-w-xs lg:max-w-xl">
              Me otsime ja leiame Sulle parima partneri.
            </p>
          </li>
          <li className="flex items-center my-3">
            {checkmark}{' '}
            <p className="max-w-xs lg:max-w-xl">
              Me genereerime Sinu sinu sisestatud parameetritest teate ja
              saadame selle laiali kõikidele, kes vajavad Sinu tööd või töökäsi.
            </p>
          </li>
          <li className="flex items-center my-3">
            {checkmark}{' '}
            <p className="max-w-xs lg:max-w-xl">
              Me teeme Sinu andmetest kuulutuse ja paneme selle oma lehele üles,
              et ka need saaksid neid näha kelleni Sinu teade ei jõudnud.
            </p>
          </li>
        </ul>
      </div>

      <div
        style={{backgroundImage: `url(${job_seeker})`}}
        className="pt-12 pb-32 bg-contain lg:bg-cover"
      >
        <h3 className="uppercase text-4xl lg:text-6xl text-white text-center font-bold tracking-wide">
          Tööotsijale
        </h3>
      </div>

      <div style={{marginTop: '-6rem'}} className="flex justify-center">
        <div className="bg-white max-w-3xl p-6 shadow-2xl">
          <p className="font-bold">
            Töötajad koristavad juba teist nädalat 20m<sup>2</sup> suurust
            ruumi?
          </p>
          <ul>
            <li className="flex items-start my-3">
              <svg className="w-8 text-green-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10,7H14V17H12V9H10V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                Sisesta oma väga konkreetsed soovid, et saaksime hakata otsima
                Sulle parimat partnerit!
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
                Vähesed kuid konkreetsed andmed annavad võimaluse suunata
                tööpakkumine täpselt nendele firmadele, kellel on Sinu
                vajadustele vastavad spetsialistid ajutiselt üle.
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
                Saada mehed korraks teisele objektile, mille me leiame Sinu
                eest.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-24 lg:py-40">
        <img
          className="h-20 lg:h-32 mx-auto"
          src={centerLogo}
          alt="Cofind - brings partners together"
        />
      </div>

      <div
        style={{backgroundImage: `url(${job_offer})`}}
        className="pt-12 pb-32 bg-contain lg:bg-cover"
      >
        <h3 className="uppercase text-4xl lg:text-6xl text-white text-center font-bold tracking-wide">
          Tööandjale
        </h3>
      </div>

      <div style={{marginTop: '-6rem'}} className="flex justify-center">
        <div className="bg-white max-w-3xl p-6 shadow-2xl">
          <p className="font-bold">
            Objekt on algamas, aga häid mehi on raske leida?
          </p>
          <ul>
            <li className="flex items-start my-3">
              <svg className="w-8 text-blue-500 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10,7H14V17H12V9H10V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                />
              </svg>
              <p className="max-w-xs lg:max-w-2xl">
                Sisesta oma väga konkreetsed soovid, et saaksime hakata otsima
                Sulle parimat partnerit!
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
                Vähesed kuid konkreetsed andmed annavad võimaluse suunata
                tööpakkumine täpselt nendele firmadele, kellel on Sinu
                vajadustele vastavad spetsialistid ajutiselt üle.
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
                Meie leiame head mehed ilma suurema vaevata Sinu eest.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="my-24 max-w-3xl mx-auto">
        <h3 className="text-center text-3xl lg:text-5xl mb-4">
          Vaata kuulutusi
        </h3>
        <p className="px-4">
          Meie andmebaasist leiad parima võimaliku partneri kiiresti ilma, et
          peaksid ise palju vaeva nägema. Andmebaasis vahetuvad pakkumised
          põhimõtteliselt onlines, sest meie täpselt suunatud pakkumised aitavad
          leida parima partneri kiiremini kui keegi teine. Kui baasis Sulle
          sobivat pakkumist pole hetkel, siis oota natuke ja proovi uuesti. Kui
          ikka ei leia siis sisesta oma parameetrid ja me saadame Sinu pakkumise
          täpselt neile, kellel on Sinu tööd vaja.
        </p>
        <div className="flex flex-col lg:flex-row justify-center mt-8 px-4">
          <a
            className="flex items-center justify-center text-lg border-green-500 border-2 py-3 px-6 rounded-lg mb-6 lg:mb-0 lg:mr-10"
            href="/"
          >
            Vaata töökuulutusi{' '}
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
            Vaata tööjõukuulutusi{' '}
            <svg className="w-8 text-blue-500 ml-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <footer className="p-6 bg-gray-800 text-white flex flex-col-reverse lg:flex-row">
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

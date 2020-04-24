import {useLocale} from '../../context/locale';
import React from 'react';
import Portal from '../../Portal';
import {menuItems} from '../index';

export const MobileMenu = () => {
  const {translate} = useLocale();
  const [menuVisible, setMenuVisibility] = React.useState(false);

  return (
    <div data-testid="mobile-menu">
      {menuVisible ? (
        <Portal id="menu">
          <div className="bg-white fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <nav className="flex items-center justify-center">
              <ul className="flex-col text-2xl">
                {menuItems.map(({text, to}) => {
                  return (
                    <li
                      className="m-6 text-black font-bold"
                      key={text}
                      onClick={() => setMenuVisibility(false)}
                    >
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
      ) : (
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
      )}
    </div>
  );
};

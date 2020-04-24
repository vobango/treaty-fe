import {useLocale} from '../../context/locale';
import React from 'react';
import Portal from '../../Portal';
import {menuItems} from '../index';
import {Icon} from '../../components/icons';

export const MobileMenu = () => {
  const {translate} = useLocale();
  const [menuVisible, setMenuVisibility] = React.useState(false);

  React.useEffect(() => {
    const root = document.querySelector('#root');
    if (!root) return;

    if (menuVisible) {
      root.classList.add('overflow-hidden');
    } else {
      root.classList.remove('overflow-hidden');
    }
  }, [menuVisible]);

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
                <Icon.Close className="mx-auto w-12" />
                <span>{translate('close')}</span>
              </div>
            </button>
          </div>
        </Portal>
      ) : (
        <button className="text-lg" onClick={() => setMenuVisibility(true)}>
          <div className="text-white">
            <Icon.Menu className="mx-auto w-12" />
            <span>{translate('menu')}</span>
          </div>
        </button>
      )}
    </div>
  );
};

import * as React from 'react';
import logo from '../assets/images/logo_small.png';
import {Icon} from './icons';
import {useLocale} from '../providers/locale';
import {withAuthorization} from './session';
import {useAuth} from '../providers/authentication';
import {useFirebase} from '../providers/firebase';

const Layout = ({children}) => {
  const {translate} = useLocale();
  const {displayName, email} = useAuth();
  const name = displayName || email;
  const [userMenuOpen, setUserMenu] = React.useState(false);
  const {doSignOut} = useFirebase();

  return (
    <div className="w-full h-full" onClick={() => setUserMenu(false)}>
      <div className="py-4 mx-auto flex justify-around items-center max-w-3xl">
        <img className="h-16" src={logo} alt={translate('logo')} />
        {name && (
          <div className="relative">
            <button
              className="flex items-center"
              onClick={e => {
                e.stopPropagation();
                setUserMenu(!userMenuOpen);
              }}
            >
              <span className="text-sm text-gray-800">{name}</span>
              <Icon.User className="w-6 text-gray-600 ml-1" />
            </button>
            {userMenuOpen && (
              <div className="absolute rounded mt-2 shadow w-full">
                <button
                  className="w-full p-2 hover:bg-gray-200"
                  onClick={doSignOut}
                >
                  {translate('logout')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full h-full flex justify-center p-4">{children}</div>
    </div>
  );
};

export default withAuthorization()(Layout);

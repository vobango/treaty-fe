import * as React from 'react';
import logo from '../assets/images/logo_small.png';
import {Icon} from './icons';
import {useLocale} from '../context/locale';
import {withAuthorization} from './Session';
import {Link} from 'react-router-dom';

const Layout = ({children, user}) => {
  const {translate} = useLocale();

  return (
    <div className="w-full h-full">
      <div className="py-4 mx-auto flex justify-around items-center max-w-3xl">
        <Link to="/home">
          <img className="h-16" src={logo} alt={translate('logo')} />
        </Link>
        <div className="flex items-center">
          {!!user && (
            <span className="text-sm text-gray-800">
              {user.displayName || user.email}
            </span>
          )}
          <Icon.User className="w-6 text-gray-600 ml-1" />
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};

export default withAuthorization(user => !!user)(Layout);

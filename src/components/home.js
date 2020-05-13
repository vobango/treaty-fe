import * as React from 'react';
import {Link} from 'react-router-dom';
import Layout from './layout';
import {Icon} from './icons';

const Home = () => {
  const iconClasses = 'h-4 mr-2 opacity-75';
  const links = [
    {
      text: 'Paku tööd',
      icon: <Icon.AddBuilding className={iconClasses} />,
      to: '/add?type=job'
    },
    {
      text: 'Paku tööjõudu',
      icon: <Icon.AddWorker className={iconClasses} />,
      to: '/add?type=worker'
    },
    {
      text: 'Tööpakkumised',
      icon: <Icon.Building className={iconClasses} />,
      to: '/listings?type=job'
    },
    {
      text: 'Tööjõupakkumised',
      icon: <Icon.Worker className={iconClasses} />,
      to: '/listings?type=worker'
    },
    {
      text: 'Seaded',
      icon: <Icon.Settings className={iconClasses} />,
      to: '/settings',
      type: 'secondary'
    }
  ];
  return (
    <Layout>
      <div className="w-full sm:max-w-xl grid grid-cols-1 gap-6 sm:gap-8">
        {links.map(({to, text, icon, type = 'primary'}) => {
          const className =
            type === 'primary'
              ? 'text-white bg-green-500'
              : 'text-gray-800 bg-gray-300';
          return (
            <Link
              key={text}
              className={`flex items-center justify-center py-4 rounded-lg hover:bg-green-400 active:bg-green-700 ${className}`}
              to={to}
            >
              {icon} {text}
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;

import * as React from 'react';
import {Link} from 'react-router-dom';
import Layout from './layout';
import {Icon} from './icons';

const Home = () => {
  const iconClasses = 'h-6 mb-2 text-green-200';
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
      to: '/settings'
    }
  ];
  return (
    <Layout>
      <div className="w-full sm:max-w-xl grid grid-cols-2 gap-6 sm:gap-8">
        {links.map(({to, text, icon}) => {
          return (
            <Link
              key={text}
              className="flex flex-col items-center justify-center py-4 rounded-lg text-white bg-green-500 hover:bg-green-400 active:bg-green-700"
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

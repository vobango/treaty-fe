import * as React from 'react';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import logo from '../assets/images/mk_logo.svg';
import '../styles/spinner.css';

const PaymentSuccess = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, [setLoading]);
  const {listingId, redirectTo} = useLocation();

  return (
    <div>
      <img src={logo} alt="Maksekeskus" className="h-40 mx-auto mb-12" />
      {loading ? (
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-12">Maksmine õnnestus!</h2>
          <Link
            className="rounded bg-gray-500 text-white py-3 px-6"
            to={{
              pathname: '/listings',
              search: redirectTo,
              listingId
            }}
          >
            {'<'} Tagasi kaupmehe juurde
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;

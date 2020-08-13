import * as React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/mk_logo.svg';
import swedbank_logo from '../assets/images/swedbank.jpg';
import seb_logo from '../assets/images/seb.jpg';
import luminor_logo from '../assets/images/luminor-wordmark-dark-blue.svg';
import coop_logo from '../assets/images/coop.svg';

const Payment = () => {
  return (
    <div>
      <img src={logo} alt="Maksekeskus" className="h-40 mx-auto mb-12" />
      <div className="flex flex-col items-center">
        {[swedbank_logo, seb_logo, luminor_logo, coop_logo].map(src => {
          return (
            <div className="my-6">
              <Link to="/payment_success" className="inline-block w-auto">
                <img src={src} alt="bank" className="border w-40 px-6 py-2" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Payment;

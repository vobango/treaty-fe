import * as React from 'react';
import Img from 'react-cool-img';
import heroPlaceholder from '../assets/images/hero_placeholder.svg';
import hero_1x from '../assets/images/hero_1x.webp';
import hero_2x from '../assets/images/hero_2x.webp';
import hero_3x from '../assets/images/hero_3x.webp';
import hero_4x from '../assets/images/hero_4x.webp';
import hero_5x from '../assets/images/hero_5x.webp';
import contactPlaceholder from '../assets/images/contact_placeholder.svg';
import contact_1x from '../assets/images/contact_1x.webp';
import contact_2x from '../assets/images/contact_2x.webp';
import contact_3x from '../assets/images/contact_3x.webp';
import contact_4x from '../assets/images/contact_4x.webp';
import contact_5x from '../assets/images/contact_5x.webp';
import offerPlaceholder from '../assets/images/offer_placeholder.svg';
import offer_1x from '../assets/images/offer_1x.webp';
import offer_2x from '../assets/images/offer_2x.webp';
import offer_3x from '../assets/images/offer_3x.webp';
import offer_4x from '../assets/images/offer_4x.webp';
import offer_5x from '../assets/images/offer_5x.webp';
import seekerPlaceholder from '../assets/images/seeker_placeholder.svg';
import seeker_1x from '../assets/images/seeker_1x.webp';
import seeker_2x from '../assets/images/seeker_2x.webp';
import seeker_3x from '../assets/images/seeker_3x.webp';
import seeker_4x from '../assets/images/seeker_4x.webp';
import seeker_5x from '../assets/images/seeker_5x.webp';

const Contact = ({className}) => (
  <Img
    aria-hidden
    className={className}
    placeholder={contactPlaceholder}
    src={contact_1x}
    srcSet={`${contact_5x} 3840w,
          ${contact_4x} 1920w,
          ${contact_3x} 1023w,
          ${contact_2x} 767w`}
  />
);

const Hero = ({className}) => (
  <Img
    aria-hidden
    className={className}
    placeholder={heroPlaceholder}
    src={hero_1x}
    srcSet={`${hero_5x} 3840w,
          ${hero_4x} 1920w,
          ${hero_3x} 1023w,
          ${hero_2x} 767w`}
  />
);

const Joboffer = ({className}) => (
  <Img
    aria-hidden
    className={className}
    placeholder={offerPlaceholder}
    src={offer_1x}
    srcSet={`${offer_5x} 3840w,
          ${offer_4x} 1920w,
          ${offer_3x} 1023w,
          ${offer_2x} 767w`}
  />
);

const Jobseeker = ({className}) => (
  <Img
    aria-hidden
    className={className}
    placeholder={seekerPlaceholder}
    src={seeker_1x}
    srcSet={`${seeker_5x} 3840w,
          ${seeker_4x} 1920w,
          ${seeker_3x} 1023w,
          ${seeker_2x} 767w`}
  />
);

export default {
  Contact,
  Hero,
  Joboffer,
  Jobseeker
};

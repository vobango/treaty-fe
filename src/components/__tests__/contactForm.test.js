import * as React from 'react';
import {ContactForm} from '../contactForm';
import {
  errorResponse,
  renderWithLocale,
  successResponse,
  translate
} from '../../testUtils';
import fetch from 'jest-fetch-mock';
import {fireEvent, screen} from '@testing-library/react';
import {waitFor} from '@testing-library/dom';
import faker from 'faker';

describe('Contact form component', function() {
  it('should render without crashing', async function() {
    renderWithLocale(<ContactForm />);
  });

  it('should validate the form', async function() {
    const nameError = translate('contactNameEmpty');
    const emailError = translate('contactEmailEmpty');
    const messageError = translate('contactMessageEmpty');
    renderWithLocale(<ContactForm />);

    // Make sure no errors are initially shown
    expect(screen.queryByText(nameError)).not.toBeInTheDocument();
    expect(screen.queryByText(emailError)).not.toBeInTheDocument();
    expect(screen.queryByText(messageError)).not.toBeInTheDocument();

    // Submit empty form
    await fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(nameError)).toBeInTheDocument();
      expect(screen.getByText(emailError)).toBeInTheDocument();
      expect(screen.getByText(messageError)).toBeInTheDocument();
      expect(
        screen.queryByText(translate('contactSuccess'))
      ).not.toBeInTheDocument();
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  it('should send validated form and show success message', async function() {
    renderWithLocale(<ContactForm />);

    // Fill out contact form
    await fireEvent.change(screen.getByLabelText(translate('contactName')), {
      target: {value: faker.name.firstName()}
    });
    await fireEvent.change(screen.getByLabelText(translate('contactEmail')), {
      target: {value: faker.internet.email()}
    });
    await fireEvent.change(screen.getByLabelText(translate('contactMessage')), {
      target: {value: faker.lorem.paragraph()}
    });

    // Submit form
    fetch.once(successResponse);
    await fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
      expect(screen.getByText(translate('contactSuccess'))).toBeInTheDocument();
    });

    // Focus an input (in case user wants to send a new message)
    await screen.getByLabelText(translate('contactName')).focus();

    // The success message should be hidden
    expect(
      screen.queryByText(translate('contactSuccess'))
    ).not.toBeInTheDocument();
  });

  it('should show an error when request fails', async function() {
    renderWithLocale(<ContactForm />);
    const error = console.error;
    console.error = jest.fn();

    // Fill out contact form
    await fireEvent.change(screen.getByLabelText(translate('contactName')), {
      target: {value: faker.name.firstName()}
    });
    await fireEvent.change(screen.getByLabelText(translate('contactEmail')), {
      target: {value: faker.internet.email()}
    });
    await fireEvent.change(screen.getByLabelText(translate('contactMessage')), {
      target: {value: faker.lorem.paragraph()}
    });

    // Submit form but simulate request failure
    fetch.once(errorResponse);
    await fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(translate('contactError'))).toBeInTheDocument();
    });

    console.error = error;
  });
});

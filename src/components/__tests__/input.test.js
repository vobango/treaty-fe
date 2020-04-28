import * as React from 'react';
import {render, screen} from '@testing-library/react';
import faker from 'faker';
import Input from '../input';
import {waitFor} from '@testing-library/dom';

describe('Input component', function() {
  it('should render without crashing', async function() {
    expect(render(<Input label={faker.random.word()} />));
  });

  it('should throw an error if no label is defined', async function() {
    const err = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<Input />);
    }).toThrowErrorMatchingInlineSnapshot(`"Input label must be specified!"`);

    console.error = err;
  });

  it('should display the given error message', async function() {
    const errorMessage = faker.random.words(3);
    render(<Input error={errorMessage} label={faker.random.word()} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should clear the error message when input is focused', async function() {
    let errorMessage = faker.random.words(3);
    const originalError = errorMessage;
    const clearError = () => {
      errorMessage = '';
    };
    const label = faker.random.word();

    const {rerender} = render(
      <Input error={errorMessage} clearError={clearError} label={label} />
    );

    await screen.getByLabelText(label).focus();

    rerender(
      <Input error={errorMessage} clearError={clearError} label={label} />
    );

    await waitFor(() => {
      expect(screen.queryByText(originalError)).not.toBeInTheDocument();
    });
  });
});

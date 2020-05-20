import React from 'react';
import faker from 'faker';
import {render, screen} from '@testing-library/react';
import Portal from '../portal';

describe('Portal component', function() {
  it('should render without crashing', async function() {
    render(<Portal id={faker.random.word()} />);
  });

  it('should throw an error when no ID is passed', async function() {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<Portal />);
    }).toThrowErrorMatchingInlineSnapshot(
      `"No ID provided for portal root element!"`
    );

    console.error = originalError;
  });

  it('should render child nodes', async function() {
    const testContent = faker.random.word();
    render(
      <Portal id={faker.random.word()}>
        <div>{testContent}</div>
      </Portal>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});

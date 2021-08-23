import {fireEvent, render} from '@testing-library/react';
import React, {useState} from 'react';

import useKeydown from '.';

const TestComponent = () => {
  const [pressed, setPressed] = useState(false);

  useKeydown('Enter', () => {
    setPressed(true);
  });

  return <h1>{pressed ? 'A' : 'B'}</h1>;
};

describe('hooks/useKeydown', () => {
  it('should show B when Enter was not pressed', () => {
    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('B');
  });

  it('should show A when Enter was not pressed', () => {
    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    fireEvent.keyDown(heading, {code: 'Enter', key: 'Enter'});

    expect(heading.textContent).toBe('A');
  });
});

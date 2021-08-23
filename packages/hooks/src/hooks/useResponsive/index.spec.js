import {render} from '@testing-library/react';
import React from 'react';

import useResponsive from '.';

const TestComponent = () => {
  const {isDesktop, isMobile, isTablet} = useResponsive();

  const title = isDesktop && 'Desktop' || isTablet && 'Tablet' || isMobile && 'Mobile' || '';

  return <h1>{title}</h1>;
};

describe('hooks/useResponsive', () => {
  it('should print Mobile if window width is 767px', () => {
    window.innerWidth = 767;

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Mobile');
  });

  it('should print Tablet if window width is 768px', () => {
    window.innerWidth = 768;

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Tablet');
  });

  it('should print Tablet if window width is 1023px', () => {
    window.innerWidth = 1023;

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Tablet');
  });

  it('should print Desktop if window width is 1024px', () => {
    window.innerWidth = 1024;

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Desktop');
  });
});

import {render} from '@testing-library/react';
import React from 'react';

import useResponsive from '.';

const TestComponent = () => {
  const {isDesktop, isMobile, isTablet} = useResponsive(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0',
  );

  const title =
    (isDesktop && 'Desktop') ||
    (isTablet && 'Tablet') ||
    (isMobile && 'Mobile') ||
    '';

  return <h1>{title}</h1>;
};

describe('hooks/useResponsive', () => {
  it('should print Mobile if window width is 767px', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 767,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Mobile');
  });

  it('should print Tablet if window width is 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 768,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Tablet');
  });

  it('should print Tablet if window width is 1023px', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1023,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Tablet');
  });

  it('should print Desktop if window width is 1024px', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});

    expect(heading.textContent).toBe('Desktop');
  });
});

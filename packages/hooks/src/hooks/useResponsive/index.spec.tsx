import {render} from '@testing-library/react';
import React from 'react';

import useResponsive from '.';

const TestComponent = () => {
  const {
    isDesktop,
    isL,
    isM,
    isMobile,
    isS,
    isTablet,
    isXs,
    isXxs,
  } = useResponsive();

  const title =
    (isDesktop && 'Desktop') ||
    (isTablet && 'Tablet') ||
    (isMobile && 'Mobile') ||
    '';
  const subtitle =
    (isXxs && 'Xxs') ||
    (isXs && 'Xs') ||
    (isS && 'S') ||
    (isM && 'M') ||
    (isL && 'L') ||
    '';

  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </>
  );
};

describe('hooks/useResponsive', () => {
  it('should print Mobile and Xxs if window width is below mediaXsMobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 359,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const title = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(title.textContent).toBe('Mobile');
    expect(subtitle.textContent).toBe('Xxs');
  });

  it('should print Mobile and Xs if window width is equal to mediaXsMobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 360,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(heading.textContent).toBe('Mobile');
    expect(subtitle.textContent).toBe('Xs');
  });

  it('should print Mobile and Xs if window width is below to mediaSTablet', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 767,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(heading.textContent).toBe('Mobile');
    expect(subtitle.textContent).toBe('Xs');
  });

  it('should print Tablet and S if window width is equal to mediaSTablet', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 768,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(heading.textContent).toBe('Tablet');
    expect(subtitle.textContent).toBe('S');
  });

  it('should print Tablet and S if window width is below mediaMDesktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1279,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(heading.textContent).toBe('Tablet');
    expect(subtitle.textContent).toBe('S');
  });

  it('should print Desktop and M if window width is equal to mediaMDesktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1280,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(heading.textContent).toBe('Desktop');
    expect(subtitle.textContent).toBe('M');
  });

  it('should print Desktop and M if window width is below mediaLDesktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1919,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(heading.textContent).toBe('Desktop');
    expect(subtitle.textContent).toBe('M');
  });

  it('should print Desktop and L if window width is equal to mediaLDesktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1920,
      writable: true,
    });

    const {getByRole} = render(<TestComponent />);

    const heading = getByRole('heading', {level: 1});
    const subtitle = getByRole('heading', {level: 2});

    expect(heading.textContent).toBe('Desktop');
    expect(subtitle.textContent).toBe('L');
  });
});

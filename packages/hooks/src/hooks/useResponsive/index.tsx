import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import throttle from 'lodash/throttle';

const media: {[key: string]: number} = {
  LDesktop: 1920,
  MDesktop: 1280,
  STablet: 768,
  XsMobile: 360,
  XxsMobile: 320,
};

type ReturnDataProps = {
  isXxs: boolean,
  isXs: boolean,
  isS: boolean,
  isM: boolean,
  isL: boolean,
  isDesktop: boolean,
  isMobile: boolean,
  isTablet: boolean
};

const useResponsive = (): ReturnDataProps => {
  const [responsive, setResponsive] = useState({
    isDesktop: null,
    isL: null,
    isM: null,
    isMobile: null,
    isS: null,
    isTablet: null,
    isXs: null,
    isXxs: null,
  });
  const handleResize = useCallback(throttle(() => { // eslint-disable-line react-hooks/exhaustive-deps
    const width = window.innerWidth;

    setResponsive({
      isDesktop: width >= media.MDesktop,
      isL: width >= media.LDesktop,
      isM: width >= media.MDesktop && width < media.LDesktop,
      isMobile: width < media.STablet,
      isS: width >= media.STablet && width < media.MDesktop,
      isTablet: width >= media.STablet && width < media.MDesktop,
      isXs: width >= media.XsMobile && width < media.STablet,
      isXxs: width < media.XsMobile,
    });
  }, 200), []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => {
      handleResize.cancel();

      window.removeEventListener('resize', handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return responsive;
};

export default useResponsive;

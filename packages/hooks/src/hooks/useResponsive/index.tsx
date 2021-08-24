import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import mobile from 'is-mobile';
import throttle from 'lodash/throttle';

type ReturnDataProps = {
  isDesktop: boolean,
  isMobile: boolean,
  isTablet: boolean
}

const useResponsive = (ua: string): ReturnDataProps => {
  const onlyMobile = mobile({
    ua,
  });
  const mobileOrTablet = mobile({
    tablet: true,
    ua,
  });
  const [isMobile, setIsMobile] = useState(onlyMobile);
  const [isTablet, setIsTablet] = useState(!onlyMobile && mobileOrTablet);
  const [isDesktop, setIsDesktop] = useState(!mobileOrTablet);
  const handleResize = useCallback(throttle(() => { // eslint-disable-line react-hooks/exhaustive-deps
    const width = window.innerWidth;

    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
    setIsDesktop(width >= 1024);
  }, 200), []);

  useLayoutEffect(() => {
    handleResize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isDesktop,
    isMobile,
    isTablet,
  };
};

export default useResponsive;

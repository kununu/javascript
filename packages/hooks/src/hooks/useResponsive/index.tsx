import {
  useCallback,
  useEffect,
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
  const [responsive, setResponsive] = useState({
    isDesktop: !mobileOrTablet,
    isMobile: onlyMobile,
    isTablet: !onlyMobile && mobileOrTablet,
  });
  const handleResize = useCallback(throttle(() => { // eslint-disable-line react-hooks/exhaustive-deps
    const width = window.innerWidth;

    setResponsive({
      isDesktop: width >= 1024,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
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

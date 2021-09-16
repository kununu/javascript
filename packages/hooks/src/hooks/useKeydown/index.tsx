import {useEffect} from 'react';

const useKeydown = (key: string, action: () => void): void => {
  useEffect(() => {
    const onKeyup = e => {
      if (e.key === key) action();
    };

    window.addEventListener('keydown', onKeyup);

    return () => window.removeEventListener('keydown', onKeyup);
  }, [key, action]);
};

export default useKeydown;

import { useRef } from 'react';
import { useEffect } from 'react';

export default function useOutSideClick(
  handler,
  listenCapturing = false
) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref?.current?.contains?.(e.target)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener(
        'click',
        handleClick,
        listenCapturing
      );
    };
  }, [handler, listenCapturing]);

  return ref;
}

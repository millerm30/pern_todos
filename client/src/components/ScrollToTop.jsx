import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='py-5'>
      {showScroll ? (
        <FaArrowUp
          className='mx-auto text-4xl cursor-pointer text-white bg-blue-600 rounded-full p-2'
          onClick={scrollToTop}
        />
      ) : null}
    </div>
  );
};

export default ScrollToTop;

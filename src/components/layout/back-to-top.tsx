"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

const BackToTop = () => {

  const element = document && document.getElementById("main-layout");
  const scrollToTop = () => {
    if (!element) return;
    element.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="outline"
      className="rounded-full"
    >
      <ArrowUp className='text-xl' />
    </Button >
  );
};

export default BackToTop;

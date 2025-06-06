/** @format */

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const AutoScrollText = ({
  children,
  className,
  speed = 10, // px per second，默认速度
  truncateLength = 20, // 超过多少字符才截断
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  truncateLength?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    // 获取实际文本内容
    if (contentRef.current) {
      const text = contentRef.current.textContent || '';
      setTextContent(text);
      // 只有当文本长度超过截断长度时才滚动
      setShouldScroll(text.length > truncateLength);
    }
  }, [children, truncateLength]);

  const marqueeVariants = {
    animate: {
      x: ['0%', '-100%'], // 完整滚动一个内容长度
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: 100 / speed, // 按速度换算 duration
        },
      },
    },
  };

  if (!shouldScroll) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden w-full ${className}`}
      >
        <div
          ref={contentRef}
          className='whitespace-nowrap text-ellipsis overflow-hidden'
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${className}`}
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div className='flex'>
        <motion.div
          ref={contentRef}
          className='flex whitespace-nowrap'
          variants={marqueeVariants}
          animate='animate'
        >
          <div className='flex-shrink-0'>{children}</div>
          <div className='flex-shrink-0'>{children}</div>
        </motion.div>
        <motion.div
          className='flex whitespace-nowrap'
          variants={marqueeVariants}
          animate='animate'
        >
          <div className='flex-shrink-0'>{children}</div>
          <div className='flex-shrink-0'>{children}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default AutoScrollText;

/** @format */

import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface LinkedInAvatarProps {
  name: string;
  size?: string;
  src?: string;
  url?: string;
}

export const LinkedInAvatar = ({
  name,
  size = 'md:w-16 md:h-16 w-10 h-10',
  src,
  url,
}: LinkedInAvatarProps) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(true);

  // Check if the URL is valid (optional)
  useEffect(() => {
    if (url) {
      const checkUrl = async () => {
        try {
          // This is just a simple check - in production you might want to use a different approach
          // as direct fetch might be blocked by CORS
          const response = await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
          });
          setIsLinkValid(true);
        } catch (error) {
          setIsLinkValid(false);
        }
      };

      checkUrl();
    } else {
      setIsLinkValid(false);
    }
  }, [url]);

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-teal-500',
    ];
    const index = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  // Show initials if no src, or image failed to load, or link is invalid
  const shouldShowInitials = !src || showFallback || !isLinkValid;

  return (
    <div>
      <div
        className={`${size} rounded-full ${
          shouldShowInitials ? getAvatarColor(name) : ''
        } flex items-center justify-center text-white font-bold text-lg relative`}
      >
        {!shouldShowInitials && (
          <img
            src={src}
            alt={name}
            onError={() => setShowFallback(true)}
            className='w-full h-full object-cover absolute inset-0 rounded-full'
          />
        )}
        {shouldShowInitials && initials}

        {name && url && isLinkValid && (
          <div className='absolute -bottom-1 -right-1 md:w-6 md:h-6 size-4 p-1 md:p-1.5 bg-blue-600 rounded-full flex items-center justify-center dark:bg-blue-600 dark:text-white'>
            <Linkedin className='md:size-4 size-3 text-white' />
          </div>
        )}
      </div>
    </div>
  );
};

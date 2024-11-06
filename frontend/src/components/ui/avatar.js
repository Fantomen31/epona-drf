import React from 'react';

export const Avatar = ({ children, className, ...props }) => (
  <div className={`inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

export const AvatarImage = ({ src, alt, className, ...props }) => (
  <img className={`h-full w-full object-cover ${className}`} src={src} alt={alt} {...props} />
);

export const AvatarFallback = ({ children, className, ...props }) => (
  <div className={`flex h-full w-full items-center justify-center bg-gray-300 ${className}`} {...props}>
    {children}
  </div>
);
import React from 'react';

function MantisIcon({ size = 60, className = '' }) {
  return (
    <img
      src="/mantis-logo-transparent.png"
      alt="Yellow Mantis Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

export default MantisIcon;

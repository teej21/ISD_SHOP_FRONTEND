import React from 'react';
import { OverlayProps } from '../../../interface/Overlay';

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Overlay;


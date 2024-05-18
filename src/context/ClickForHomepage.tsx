import React, { createContext, useState, ReactNode, useRef, MutableRefObject } from 'react';

type ClickBarContextType = {
  barClick: boolean;
  introductionRef: MutableRefObject<HTMLDivElement | null>;
  handleBarClick: () => void;
};

const ClickBarContext = createContext<ClickBarContextType>({
  barClick: false,
  handleBarClick: () => {},
  introductionRef: null!, 
});

type ClickForHomepageProps = {
  children: ReactNode;
};

const ClickForHomepage: React.FC<ClickForHomepageProps> = ({ children }) => {
  const [barClick, setBarClick] = useState(false);
  const introductionRef = useRef<HTMLDivElement | null>(null); 

  const handleBarClick = () => {
    setBarClick((state) => !state);
  };

  const value = { barClick, handleBarClick, introductionRef };

  return (
    <ClickBarContext.Provider value={value}>
      {children}
    </ClickBarContext.Provider>
  );
};

export { ClickBarContext, ClickForHomepage };

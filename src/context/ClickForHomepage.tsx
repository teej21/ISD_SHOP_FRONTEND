import React, { createContext, useState, ReactNode } from 'react';


type ClickBarContextType = {
  barClick: boolean;
  handleBarClick: () => void;
};

const ClickBarContext = createContext<ClickBarContextType>({
  barClick: false,
  handleBarClick: () => {},
});

type ClickForHomepageProps = {
  children: ReactNode;
};


const ClickForHomepage: React.FC<ClickForHomepageProps> = ({ children }) => {
  const [barClick, setBarClick] = useState(false);

  const handleBarClick = () => {
    setBarClick((state) => !state);
  };

  const value = { barClick, handleBarClick };

  return (
    <ClickBarContext.Provider value={value}>
      {children}
    </ClickBarContext.Provider>
  );
};

export { ClickBarContext, ClickForHomepage };

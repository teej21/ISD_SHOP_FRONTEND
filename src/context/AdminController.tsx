import React, { createContext, useState, ReactNode } from 'react';

interface ClickAdminContextType {
  mode: string;
  handleSetMode: (value: any) => void;
}

const ClickAdmin = createContext<ClickAdminContextType>({
  mode: '',
  handleSetMode: (value: any) => {},
});

const AdminController: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState('');

  const handleSetMode = (value: any) => {
    setMode(value);
    console.log(value);
  };

  const value: ClickAdminContextType = {
    mode,
    handleSetMode,
  };

  return (
    <ClickAdmin.Provider value={value}>
      {children}
    </ClickAdmin.Provider>
  );
};

export { AdminController, ClickAdmin };

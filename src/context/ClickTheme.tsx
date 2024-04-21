import React, { useState } from 'react';
import { createContext } from 'react';
const ThemeContext = createContext({
 isClicked: false,
 clickSignUp: false,
 clickVisibleSignUp: false,
 clickVisiblePasswordConfirm: false,
 loginType: 'account',
 error: '',
 errorDuplicate: '',
 handleClick: () => {},
 handleClickSignUp: () => {},
 handleVisibleSignUp: () => {},
 handleClickVisiblePasswordConfirm: () => {},
 handleLoginAccount: () => {},
 handleLoginPhoneNumber: () => {},
 handleError: (message: any) => {},
 resetError: () => {},
 handleDuplicate: (message: any) => {},
});

const ClickTheme = ({ children }) => {
 const [isClicked, setIsClicked] = useState(false);
 const [clickSignUp, setclickSignUp] = useState(false);
 const [clickVisibleSignUp, setVisibleSignUp] = useState(false);
 const [clickVisiblePasswordConfirm, setClickVisiblePasswordConfirm] = useState(false);
 const [loginType, setLoginType] = useState('');
 const [error, setError] = useState('');
 const [errorDuplicate, setErrorDuplicate] = useState('');
 const handleClick = () => {
    setIsClicked(prevState => !prevState);
 };
 const handleClickSignUp = () => {
   setclickSignUp(state => !state);
};
const handleVisibleSignUp = () => {
   setVisibleSignUp(state => !state);
};
const handleClickVisiblePasswordConfirm = () => {
   setClickVisiblePasswordConfirm(state => !state);
}
const handleLoginAccount = () => {
   setLoginType('account')
}

const handleLoginPhoneNumber = () => {
   setLoginType('phoneNumber')
}

const handleError = (message: React.SetStateAction<string>) => {
   setError(message);
}

const handleDuplicate = (message: React.SetStateAction<string>) => {
   setErrorDuplicate(message)
}

const resetError = () => {
   setError('')
}

 const value = {clickVisiblePasswordConfirm, clickVisibleSignUp, isClicked, clickSignUp, error, errorDuplicate, handleClick, handleClickSignUp, handleVisibleSignUp, handleClickVisiblePasswordConfirm, loginType, handleLoginAccount, handleLoginPhoneNumber, handleError, resetError, handleDuplicate};

 return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
 );
};

export { ThemeContext, ClickTheme };

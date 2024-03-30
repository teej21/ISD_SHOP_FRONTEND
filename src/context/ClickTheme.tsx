import React, { useState } from 'react';
import { createContext } from 'react';
const ThemeContext = createContext({
 isClicked: false,
 clickSignUp: false,
 clickVisibleSignUp: false,
 clickVisiblePasswordConfirm: false,
 loginType: 'account',
 handleClick: () => {},
 handleClickSignUp: () => {},
 handleVisibleSignUp: () => {},
 handleClickVisiblePasswordConfirm: () => {},
 handleLoginAccount: () => {},
 handleLoginPhoneNumber: () => {},
});

const ClickTheme = ({ children }) => {
 const [isClicked, setIsClicked] = useState(false);
 const [clickSignUp, setclickSignUp] = useState(false);
 const [clickVisibleSignUp, setVisibleSignUp] = useState(false);
 const [clickVisiblePasswordConfirm, setClickVisiblePasswordConfirm] = useState(false);
 const [loginType, setLoginType] = useState('');
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
 const value = {clickVisiblePasswordConfirm, clickVisibleSignUp, isClicked, clickSignUp, handleClick, handleClickSignUp, handleVisibleSignUp, handleClickVisiblePasswordConfirm, loginType, handleLoginAccount, handleLoginPhoneNumber};

 return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
 );
};

export { ThemeContext, ClickTheme };

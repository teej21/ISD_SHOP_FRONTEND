// submitForgetPassword.ts
import emailjs from '@emailjs/browser';
import { INewPassword } from '../interface/IUSerInfo';
import getConfigObject from '../env/env.ts'
import { MutableRefObject } from 'react';
export const submitForgetPassword = async (data: INewPassword, theme: {handleClickSignUp: any, handleClick: any}, form: MutableRefObject<HTMLFormElement | null>) => {
    const serviceKey = getConfigObject('DEV').SERVICE_ID;
    const templateKey = getConfigObject('DEV').TEMPLATE_ID;
    const publicKey = getConfigObject('DEV').EMAIL_PUBLIC_KEY;

    await new Promise(resolve => setTimeout(resolve, 2000));

    theme.handleClickSignUp();
    if (form.current) {
        emailjs
            .send(serviceKey, templateKey, {
                account: data.account,
                newPassword: data.newPassword,
            }, {
                publicKey: publicKey,
            })
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                },
            );
    }
};

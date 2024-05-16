export interface IUserInfo {
  username: string;
  password: string;
}

export interface IUserSignUp {
  full_name: string;
  email: string;
  phone_number: string;
  confirm_password: string;
  password: string;
  gender: string;
  role: string;
}

export interface INewPassword {
  account: string;
  newPassword: string;
}

export interface ResponseBody {
  full_name: string,
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  role: string;
}

export type Customer = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  gender: string;
  role: string,
  date_of_birth: string,
 };

 export interface AddUser{
  id: string,
  email: string,
  password: string | undefined, 
  gender: string,
  address?: string; 
  phone_number: string,
  role: string,
  full_name: string,
  date_of_birth?: string; 
 }

 interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  active: boolean;
  dateOfBirth: string | null;
  address: string | null;
  role: string;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  username: string;
  authorities: Authority[];
  
}

interface Authority {
  authority: string;
}

interface OrderDetail {
  id: number;
}

export interface Order {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  note: string;
  user: User;
  caringEmployee: null | any;
  status: string;
  orderDetailList: OrderDetail[];
}

 
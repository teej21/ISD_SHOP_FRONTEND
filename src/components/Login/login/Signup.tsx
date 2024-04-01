import React, { useContext } from "react";
import { Paper, Container, TextField, Button } from "@mui/material";
import { ThemeContext } from "../../../context/ClickTheme.tsx";
import { Link } from "react-router-dom";
import { IUserSignUp } from "../../../interface/IUSerInfo.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessfulMessage from "./SuccessfulMessage.tsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import schema from "../../../validation/SignUpVal.ts";
const Signup = () => {
  const click = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserSignUp>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: IUserSignUp) => {
    try {
      const { confirm_password, ...formData } = data;
      console.log(data);
      console.log("Form submitted with data:", formData);
      formData.role = "CUSTOMER";

      const response: any = await fetch("http://localhost:8686/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        click.handleClickSignUp();
      } else {
       click.handleDuplicate();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Container>
        <Paper
          elevation={3}
          className="md:px-[30px] md:py-[20px] md:w-[600px] w-8/10 py-[10px] px-[15px] absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%] md:mt-0 mt-[200px]"
        >
          <h1 className="sm:text-3xl font-bold pb-8 text-2xl text-center">
            Đăng ký
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex md:flex-row flex-col justify-center align-center md:gap-[50px] gap-[10px] text-lg">
              <div className="flex flex-col justify-center align-center gap-[10px] text-lg">
                <label htmlFor="Họ và tên" className="text-lg">
                  Họ và tên *
                </label>
                <TextField
                  className="bg-login_input "
                  id="outlined-basic"
                  placeholder="VD: Chu Minh"
                  variant="outlined"
                  type="text"
                  {...register("full_name", {
                    required: `${errors.full_name}`,
                  })}
                />
                {errors.full_name && (
                  <span className="text-red-500 font-bold text-xs w-full">
                    {errors.full_name.message}
                  </span>
                )}
                <label htmlFor="Email">Email *</label>
                <TextField
                  className="bg-login_input"
                  id="filled-basic-email"
                  placeholder="VD: 123@gmail.com"
                  variant="outlined"
                  type="text"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 font-bold text-xs">
                    {errors.email.message}
                  </span>
                )}
                 {click.errorDuplicate && (
                  <span className="text-red-500 font-bold text-xs">
                    {click.errorDuplicate}
                  </span>
                )}
                <label htmlFor="Số điện thoại">Số điện thoại *</label>
                <TextField
                  className="bg-login_input"
                  id="filled-basic-sdt"
                  placeholder="VD: 0123455667"
                  variant="outlined"
                  type="text"
                  {...register("phone_number")}
                />
                {errors.phone_number && (
                  <span className="text-red-500 font-bold text-xs">
                    {errors.phone_number.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center align-center gap-[10px] text-lg">
                <label htmlFor="Giới tính"> Giới tính *</label>
                <select
                  className="bg-login_input p-4 border border-0 border-solid border-login_input hover:border-gray"
                  {...register("gender")}
                >
                  <option selected disabled value="">
                    Giới tính
                  </option>
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                  <option value="other">Khác</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500 font-bold text-xs">
                    {errors.gender.message}
                  </span>
                )}
                <label htmlFor="Mật khẩu">Mật khẩu *</label>
                <div className="relative">
                  <TextField
                    className="bg-login_input w-full"
                    id="filled-basic-mk"
                    placeholder="VD: 123456789"
                    variant="outlined"
                    type={click.clickVisibleSignUp ? "text" : "password"}
                    {...register("password")}
                  />
                  {click.clickVisibleSignUp ? (
                    <VisibilityIcon
                      onClick={click.handleVisibleSignUp}
                      className="absolute right-3 bottom-4"
                    ></VisibilityIcon>
                  ) : (
                    <VisibilityOffIcon
                      onClick={click.handleVisibleSignUp}
                      className="absolute right-3 bottom-4"
                    ></VisibilityOffIcon>
                  )}
                </div>
                {errors.password && (
                  <span className="text-red-500 font-bold text-xs">
                    {errors.password.message}
                  </span>
                )}
                <label htmlFor="Xác nhận mật khẩu">Xác nhận mật khẩu *</label>
                <div className="relative">
                  <TextField
                    className="bg-login_input w-full"
                    id="filled-basic-cf"
                    placeholder="VD: 123456789"
                    variant="outlined"
                    type={
                      click.clickVisiblePasswordConfirm ? "text" : "password"
                    }
                    {...register("confirm_password")}
                  />
                  {click.clickVisiblePasswordConfirm ? (
                    <VisibilityIcon
                      onClick={click.handleClickVisiblePasswordConfirm}
                      className="absolute right-3 bottom-4"
                    ></VisibilityIcon>
                  ) : (
                    <VisibilityOffIcon
                      onClick={click.handleClickVisiblePasswordConfirm}
                      className="absolute right-3 bottom-4"
                    ></VisibilityOffIcon>
                  )}
                </div>
                {errors.confirm_password && (
                  <span className="text-red-500 font-bold text-xs">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between mx-8 mt-8 gap-[10px]">
              <Button
                type="submit"
                variant="contained"
                className="w-full"
                style={{ backgroundColor: "#9A917A" }}
                disabled={isSubmitting}
              >
                Đăng ký
              </Button>
              <Link
                to="/login"
                className=" p-1 text-f_pw underline text-center w-3/10 mx-auto"
              >
                Đã có tài khoản?
              </Link>
            </div>
          </form>
        </Paper>
        {click.clickSignUp && <SuccessfulMessage></SuccessfulMessage>}
      </Container>
    </div>
  );
};

export default Signup;

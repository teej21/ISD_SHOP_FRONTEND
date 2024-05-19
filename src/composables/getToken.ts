import { useNavigate } from "react-router-dom";
import SuccessMessage from "../components/LoadingFrame/SuccessMessage.ts";
import { IUserInfo, ResponseBody } from "../interface/IUSerInfo.ts";
import failMessage from "../components/LoadingFrame/FailMessage.ts";

const submitForm = async (data: IUserInfo) => {
    try {
      const response = await fetch("http://localhost:8686/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseBody: ResponseBody = await response.json();
        SuccessMessage("Đăng nhập thành công");
        return responseBody;
      } else {
        failMessage((await response.json()).error);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  export default submitForm 
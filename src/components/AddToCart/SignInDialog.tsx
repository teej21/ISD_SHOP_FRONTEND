import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const SignInDialog = ({ open, handleClose }) => {
  const handleSignIn = () => {
    window.location.href = "/login";
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Yêu cầu đăng nhập</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignIn} color="primary">
          Đăng nhập
        </Button>
        <Button onClick={handleClose} color="secondary">
          Không
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default SignInDialog;

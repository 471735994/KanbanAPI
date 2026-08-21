import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";

export default function RequireAuth() {
  const { currentUser, loadingUserInfo } = useAccount();
  const location = useLocation(); //记录当前页面位置，以便登录后返回

  if (loadingUserInfo) return <Typography>Loading...</Typography>;
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; //Outlet 是 React Router 里常用的“插槽”，表示渲染子路由页面。
  // 如果用户已登录，就渲染子路由；否则跳转到登录页。
}

import { Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation(); //使用useLocation获取路由状态
  return (
    <Paper>
      {state.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            {state.error?.message || "服务器错误"}
          </Typography>
          <Divider></Divider>
          <Typography variant="body1" sx={{ p: 4 }}>
            {state.error?.details || "内部服务器错误"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">服务器错误</Typography>
      )}
    </Paper>
  );
}

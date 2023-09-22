import React, { useContext } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../Hooks/useAxios";
import AppContext from "../Hooks/AppContext";

export default function LoginBox() {
  const api = useAxios();
  const navigate = useNavigate();

  const [emailHelperText, setEmailHelperText] = useState("");

  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [emailInputContent, setEmailInputContent] = useState("");

  const handleInputEmail = (event) => {
    setEmailInputContent(event.target.value);
  };

  const [passwordInputContent, setPasswordInputContent] = useState("");

  const handleInputPassword = (event) => {
    setPasswordInputContent(event.target.value);
  };

  const [errMail, setErrMail] = useState(false);
  const [errPw, setErrPw] = useState(false);

  const handleSetErrMail = () => {
    setErrMail(!errMail);
    setEmailHelperText("Incorrect e-mail entry");
  };
  const handleSetErrPw = () => {
    setErrPw(!errPw);
    setPasswordHelperText("Incorrect password entry");
  };

  const initialData = sessionStorage.getItem("myName");
  const [userName, setUserName] = useState(initialData);
  const [userToken, setUserToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const handleSubmitLogin = () => {
    const formData = new FormData();
    formData.append("username", emailInputContent);
    formData.append("password", passwordInputContent);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    api
      .post("/login/new_session", formData, config)
      .then((res) => {
        sessionStorage.clear();
        console.log(res.data);
        setUserToken(res.data.access_token);
        setUserName(res.data.name);
        setUserId(res.data.id);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (userToken !== null) {
      sessionStorage.setItem("myToken", userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (userName !== null) {
      sessionStorage.setItem("myName", userName);
    }
  }, [userName]);

  useEffect(()=> {
    if (userId !== null){
      sessionStorage.setItem("myId", userId);
    }
  }, [userId])

  useEffect(() => {
    if (userId !== null) {
      navigate(`/user/${userId}`);
    }
  }, [navigate, userId]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "400px",
        width: "500px",
        backgroundColor: "rgba(108, 122, 137, 0.6)",
        borderRadius: "1px",
        mb: "8vh",
        p: "1vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "30%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            fontFamily: "Montserrat",
            fontWeight: "Light",
            fontSize: "22px",
          }}
        >
          Fazer Login
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "start",
            height: "30%",
            fontFamily: "Montserrat",
            fontWeight: "Light",
            fontSize: "16px",
          }}
        >
          Não tem uma conta?
          <Link style={{ color: "black" }} to="/register">
            Registrar
          </Link>
        </Box>
      </Box>

      <Box
        component="form"
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          pb: "5vh",
        }}
      >
        <TextField
          error={errMail}
          helperText={emailHelperText}
          value={emailInputContent}
          onChange={handleInputEmail}
          required
          label="E-Mail"
          variant="outlined"
        />
        <TextField
          error={errPw}
          helperText={passwordHelperText}
          value={passwordInputContent}
          onChange={handleInputPassword}
          required
          label="Password"
          variant="outlined"
        />
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Button
          sx={{
            mb: "3vh",
            width: "250px",
            fontFamily: "Montserrat",
            fontSize: "14px",
          }}
          style={{ backgroundColor: "#CA2E55", color: "black" }}
          variant="contained"
          onClick={handleSubmitLogin}
        >
          Login
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          flexDirection: "column",
          mr: "2vh",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontFamily: "Montserrat",
            fontWeight: "Light",
          }}
        >
          <Link style={{ color: "black" }} to="/">
            Esqueceu a senha?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

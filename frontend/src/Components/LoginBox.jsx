import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginBox() {
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

  const [err, setErr] = useState(false);

  const handleSetErr = () => {
    setErr(!err);
    setEmailHelperText("Incorrect e-mail entry");
    setPasswordHelperText("Incorrect password entry");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "400px",
        width: "500px",
        backgroundColor: "grey",
        mb: "8vh",
        p: "1vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "30%",
          fontFamily: "Montserrat",
          fontWeight: "Light",
          fontSize: "18px",
        }}
      >
        Login
      </Box>

      <Box
        component="form"
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mb: "5vh",
        }}
      >
        <TextField
          error={err}
          helperText={emailHelperText}
          value={emailInputContent}
          onChange={handleInputEmail}
          required
          label="E-Mail"
          variant="outlined"
        />
        <TextField
          error={err}
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
          variant="contained"
          color="secondary"
          onClick={handleSetErr}
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
            Forgot password?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

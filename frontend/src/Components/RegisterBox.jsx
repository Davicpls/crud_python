import React from 'react';
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../Hooks/useAxios";
import MuiAlert from "@mui/material/Alert";


function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let add = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RegisterBox() {
    const api = useAxios();

    const [openSnack, setOpenSnack] = useState(false);

    const [openSnackError, setOpenSnackError] = useState(false)

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };
    const handleCloseSnackError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackError(false);
    };

    const [emailHelperText, setEmailHelperText] = useState("");

    const [passwordHelperText, setPasswordHelperText] = useState("");

    const [cpfHelperText, setCpfHelperText] = useState("")

    const defaultRegisterForm = {
        name: "",
        email: "",
        cpf: "",
        password: ""
    };

    const validateEmail = (email) => {
        const validateEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        return validateEmailRegex.test(email)
    }

    const [registerForm, setRegisterForm] = useState(defaultRegisterForm);

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterForm((prevRegisterForm) => ({
            ...prevRegisterForm,
            [name]: value
        }));
    };

    const [errMail, setErrMail] = useState(false);
    const [errPw, setErrPw] = useState(false);
    const [errCpf, setErrCpf] = useState(false);

    const handleSetErrMail = () => {
        setErrMail(true);
        setEmailHelperText("Insira um email válido");
    };
    const handleSetErrPw = () => {
        setErrPw(!errPw);
        setPasswordHelperText("Incorrect password entry");
    };

    const handleSetErrCpf = () => {
        setErrCpf(true)
        setCpfHelperText("Insira um CPF válido")
    }


    const handleSubmitRegister = () => {
        let hasError = false;

        setErrMail(false);
        setEmailHelperText("");
        setErrCpf(false);
        setCpfHelperText("");

        if (!validateCPF(registerForm['cpf'])) {
            handleSetErrCpf();
            hasError = true;
        };

        if (!validateEmail(registerForm['email'])) {
            handleSetErrMail();
            hasError = true;
        };

        if (!hasError) {
            const data = registerForm
            api
                .post('/post/new_user', data)
                .then((res) => {
                    if (res.status === 200) {
                        openSnack();
                    };
                })
                .catch((err)=> {
                    setOpenSnackError(err)
                    console.log(err)
                });
        };
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "500px",
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
                    Registrar
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
                    Já tem uma conta?
                    <Link style={{ color: "black" }} to="/">
                        Login
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
                    pb: "3vh",
                }}>
                <TextField
                    value={registerForm.name}
                    name="name"
                    onChange={handleChange}
                    required
                    label="Nome"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    error={errMail}
                    value={registerForm.email}
                    name="email"
                    onChange={handleChange}
                    required
                    label="E-Mail"
                    variant="outlined"
                    helperText={emailHelperText}
                    fullWidth
                />
                <TextField
                    error={errCpf}
                    value={registerForm.cpf}
                    name="cpf"
                    onChange={handleChange}
                    required
                    label="CPF"
                    variant="outlined"
                    helperText={cpfHelperText}
                    inputProps={{ maxLength: 11 }}
                    fullWidth
                />
                <TextField
                    value={registerForm.password}
                    name="password"
                    onChange={handleChange}
                    required
                    label="Senha"
                    variant="outlined"
                    fullWidth
                />
            </Box>
            <Box
                sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
            >
                <Button
                    sx={{
                        mb: "2vh",
                        width: "250px",
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                    }}
                    style={{ backgroundColor: "#CA2E55", color: "black" }}
                    variant="contained"
                    onClick={handleSubmitRegister}
                >
                    Login
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "end",
                    flexDirection: "column",
                    pr: "2vh",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontFamily: "Montserrat",
                        fontWeight: "Light",
                    }}
                >
                </Typography>
            </Box>
            <Snackbar
                sx={{ width: "400px" }}
                open={openSnackError}
                autoHideDuration={3500}
                onClose={handleCloseSnackError}
            >
                <Alert
                    onClose={handleCloseSnackError}
                    severity="error"
                    sx={{ width: "100%", fontFamily: "Montserrat", fontSize: "16px" }}

                >
                    Houve um erro no cadastro do usuário
                </Alert>
            </Snackbar>
            <Snackbar
                sx={{ width: "400px" }}
                open={openSnack}
                autoHideDuration={3500}
                onClose={handleCloseSnack}
            >
                <Alert
                    onClose={handleCloseSnack}
                    severity="success"
                    sx={{ width: "100%", fontFamily: "Montserrat", fontSize: "16px" }}
                >
                    Cadastro realizado com sucesso!
                </Alert>
            </Snackbar>
        </Box>
    );
}

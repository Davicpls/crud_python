import * as React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  TextField,
  FormControl,
  Snackbar,
  Button,
  InputAdornment
} from "@mui/material/";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../Hooks/useAxios";
import MuiAlert from "@mui/material/Alert";

const style = {
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  fontFamily: "Montserrat",
  fontWeight: "Light",
  fontSize: "22px",
  boxShadow: 24,
  p: 2,
};


export default function AddBalanceModal({ open, setSaldo, setOpen }) {

  const userId = useParams().id

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [errorSnack, setErrorSnack] = useState('');

  const [openSnack, setOpenSnack] = useState(false);

  const [openSnackError, setOpenSnackError] = useState(false);

  const handleCloseBalance = () => {
    setOpen(false);
    emptyFormData();
  };

  let hasError = false;

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

  const api = useAxios();

  const defaultBalance = {
    balance: "",
    currency: "Real"
  };

  const [balanceForm, setBalanceForm] = useState(defaultBalance);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBalanceForm((prevBalance) => ({
      ...prevBalance,
      [name]: value
    }));
  };

  const emptyFormData = () => {
    setBalanceForm(defaultBalance);
  }

  const refresh = async () => {
    try {
      const response = await api.get(`/get/get_user_balance?user_id=${userId}`);
      setSaldo(`R$ ${response.data.balance}`);
    }
    catch (err) {
      console.log(err);
    };
  };

  const handleSubmit = async () => {
    if (balanceForm['balance'] === "") {
      balanceForm['balance'] = null
    }
    const floatRegex = /^-?([0-9]*[.])?[0-9]+$/;

    if (balanceForm['balance' !== null]) {
      if (!floatRegex.test(balanceForm['balance'])) {
        setErrorSnack('Insira um valor decimal válido');
        setOpenSnackError(true)
        return;
      }
    }

    setErrorSnack('');
    balanceForm['balance'] = parseFloat(balanceForm['balance']);
    balanceForm['user_id'] = parseInt(userId);
    const data = balanceForm;

    console.log(data)


    api
      .patch("patch/add_balance", data)
      .then((res) => {
        if (res.status === 200) {
          emptyFormData();
          handleClickSnack();
          refresh();
          handleCloseBalance();
        }
      })
      .catch((err) => {
        setOpenSnackError(true);
        if (err && err.response && err.response.data) {
          setErrorSnack(err.response.data.detail);
          hasError = true
        }
        else {
          setErrorSnack('Erro ao atualizar o balanço')
          hasError = true
        }
      });
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseBalance}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            Preencha os campos para adicionar saldo ao seu balanço!
            <Typography
              sx={{
                height: "70%",
                width: "80%",
                display: "flex",
                justifyContent: "center",
                alignContent: "start",
                flexWrap: "wrap",
                py: "2vmin",
                px: "2vmin",
              }}
            >
              <FormControl>
                <TextField
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  label="Saldo a adicionar"
                  name="balance"
                  sx={{ m: 1, width: "40vmin" }}
                  value={balanceForm.balance}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
                <TextField
                  label="Moeda"
                  name="currency"
                  sx={{ m: 1, width: "40vmin" }}
                  value={balanceForm.currency}
                  onChange={handleChange}
                  disabled={true}
                  defaultValue="Real"
                  fullWidth
                />
              </FormControl>
            </Typography>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
              <Button onClick={handleSubmit} variant="contained" sx={{
                backgroundColor: 'green', '&:hover': {
                  backgroundColor: 'green',
                }
              }}>Enviar</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
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
          {hasError ? errorSnack : 'Erro ao atualizar o balanço'}
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
          Saldo adicionado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}

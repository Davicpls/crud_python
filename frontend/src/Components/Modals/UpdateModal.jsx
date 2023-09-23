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


export default function UpdateModal({ handleClose, open, rowId, setRows }) {

  const id = useParams().id

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [errorSnack, setErrorSnack] = useState('');

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

  const api = useAxios();

  const defaultUpdateItems = {
    name: "",
    description: "",
    quantity: "",
    price: ""
  };

  const [updateItemsForm, setUpdateItemsForm] = useState(defaultUpdateItems);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateItemsForm((prevUpdateItems) => ({
      ...prevUpdateItems,
      [name]: value
    }));
  };


  const emptyFormData = () => {
    setUpdateItemsForm(defaultUpdateItems);
  }

  const refresh = async () => {
    try {
      const response = await api.get(`/get/get_items?user_id=${id}`);
      setRows(response.data);
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (updateItemsForm['quantity'] === "") {
      updateItemsForm['quantity'] = null
    }
    if (updateItemsForm['price'] === "") {
      updateItemsForm['price'] = null
    }

    const floatRegex = /^-?([0-9]*[.])?[0-9]+$/;

    if (updateItemsForm['quantity' !== null]) {
      if (!floatRegex.test(updateItemsForm['quantity'])) {
        setErrorSnack('Insira um valor decimal válido');
        setOpenSnackError(true)
        return;
      }
    }
    if (updateItemsForm['price' !== null]) {
      if (!floatRegex.test(updateItemsForm['price'])) {
        setErrorSnack('Insira um valor decimal válido');
        setOpenSnackError(true)
        return;
      }
    }

    setErrorSnack('');
    updateItemsForm['quantity'] = parseFloat(updateItemsForm['quantity']);
    updateItemsForm['price'] = parseFloat(updateItemsForm['price']);
    updateItemsForm['row_id'] = parseInt(rowId);
    const data = updateItemsForm;

    api
      .patch("patch/update_item", data)
      .then((res) => {
        if (res.status === 200) {
          emptyFormData();
          handleClickSnack();
          refresh();
        }
      })
      .catch((err) => {
        setOpenSnackError(true);
        if (err && err.response && err.response.data) {
            setErrorSnack(err.response.data.detail);
        };
      });
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
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
            Preencha os campos para atualizar o seu item!
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
                  label="Nome do item"
                  name="name"
                  sx={{ m: 1, width: "40vmin" }}
                  value={updateItemsForm.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Descrição do item"
                  name="description"
                  sx={{ m: 1, width: "40vmin" }}
                  value={updateItemsForm.description}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Quantidade do item"
                  name="quantity"
                  sx={{ m: 1, width: "40vmin" }}
                  value={updateItemsForm.quantity}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
                <TextField
                  label="Preço do item"
                  name="price"
                  sx={{ m: 1, width: "40vmin" }}
                  value={updateItemsForm.price}
                  onChange={handleChange}
                  type="number"
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
          {errorSnack}
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
          Item inserido com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}

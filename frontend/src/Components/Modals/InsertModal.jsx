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
  IconButton,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
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


export default function InsertModal({ handleClose, open, rows, setRows }) {

  const id = useParams().id

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [errorFloat, setErrorFloat] = useState('');

  const [openSnackSuccess, setOpenSnackSuccess] = useState(false);

  const [openSnackError, setOpenSnackError] = useState(false)

  const handleClickSnack = () => {
    setOpenSnackSuccess(true);
  };

  const handleCloseSnackSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackSuccess(false);
  };

  const handleCloseSnackError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackError(false);
  };

  const api = useAxios();

  const defaultInsertItems = {
    name: "",
    description: "",
    quantity: "",
    price: "",
  };

  const [insertItemsForm, setInsertItemsForm] = useState(defaultInsertItems);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsertItemsForm((prevInsertItems) => ({
      ...prevInsertItems,
      [name]: value,
    }));
  };


  const emptyFormData = () => {
    setInsertItemsForm(defaultInsertItems);
  }


  const refresh = async () => {
    try{
      const response = await api.get(`/get/get_items?user_id=${id}`);
      setRows(response.data);
    }
    catch (err){
      console.log(err);
    }
  };

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    const floatRegex = /^-?([0-9]*[.])?[0-9]+$/;

    if (!floatRegex.test(insertItemsForm['price']) || !floatRegex.test(insertItemsForm['quantity'])) {
      setErrorFloat('Insira um valor decimal válido');
      setOpenSnackError(true)
      return;
    }

    setErrorFloat('');

    insertItemsForm['quantity'] = parseFloat(insertItemsForm['quantity']);
    insertItemsForm['price'] = parseFloat(insertItemsForm['price']);
    insertItemsForm['user_id'] = parseInt(id);

    const data = insertItemsForm;



    api
      .post("post/new_item", data)
      .then((res) => {
        if (res.status === 200) {
          emptyFormData();
          handleClickSnack();
          refresh();
        }
      })
      .catch((err) => {
        console.log(err);
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
            Preencha os campos para inserir um novo item no seu inventário!
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
                  value={insertItemsForm.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Descrição do item"
                  name="description"
                  sx={{ m: 1, width: "40vmin" }}
                  value={insertItemsForm.description}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Quantidade do item"
                  name="quantity"
                  sx={{ m: 1, width: "40vmin" }}
                  value={insertItemsForm.quantity}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
                <TextField
                  label="Preço do item"
                  name="price"
                  sx={{ m: 1, width: "40vmin" }}
                  value={insertItemsForm.price}
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
          {errorFloat}
        </Alert>
        </Snackbar>
      <Snackbar
        sx={{ width: "400px" }}
        open={openSnackSuccess}
        autoHideDuration={3500}
        onClose={handleCloseSnackSuccess}
      >
        <Alert
          onClose={handleCloseSnackSuccess}
          severity="success"
          sx={{ width: "100%", fontFamily: "Montserrat", fontSize: "16px" }}
        >
          Item inserido com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}

import * as React from "react";
import {
    Backdrop,
    Box,
    Modal,
    Fade,
    Typography,
    Snackbar,
    Button,
    TextField,
    InputAdornment
} from "@mui/material/";
import AppContext from "../../Hooks/AppContext";
import { useState, useContext } from "react";
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


export default function BuyModal({ handleClose, open, rowId, setSalesRows, setSaldo, sellerId, setUserSalesRows }) {

    const userId = useParams().id

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [openSnack, setOpenSnack] = useState(false);

    const [openSnackError, setOpenSnackError] = useState(false)

    const [errorSnack, setErrorSnack] = useState('');

    const { rows, setRows } = useContext(AppContext);

    const [quantity, setQuantity] = useState("");

    const handleChange = (e) => {
        setQuantity(e.target.value);
    }

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


    const refresh = async () => {
        try {
            const response = await api.get(`get/items_for_sale?user_id=${userId}`);
            setSalesRows(response.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    const refreshBalance = async () => {
        try {
            const response = await api.get(`/get/get_user_balance?user_id=${userId}`);
            setSaldo(`R$ ${response.data.balance}`);
        }
        catch (err) {
            console.log(err);
        };
    };

    const refreshUserItems = async () => {
        try {
            const response = await api.get(`/get/get_items?user_id=${userId}`);
            response.data.forEach(data => {
                data['for_sale'] === false ? data['for_sale'] = 'Não' : data['for_sale'] = 'Sim';
            });
            setRows(response.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    const refreshUserSalesItems = async () => {
        try {
            const response = await api.get(`/get/user_items_for_sale?user_id=${userId}`);
            response.data.forEach(data => {
                data['for_sale'] === false ? data['for_sale'] = 'Não' : data['for_sale'] = 'Sim';
            });
            setUserSalesRows(response.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    const intId = parseInt(rowId);

    const validateInput = (input) => {
        const validateNumericRegex = /^[0-9]+$/
        return validateNumericRegex.test(input.toString())
    }

    const handleSubmit = async () => {
        if (!validateInput(quantity)){
            setErrorSnack('Insira um valor válido')
            setOpenSnackError(true)
            return ''
        }
        const data = { "item_id": intId, "user_id": userId, "quantity": quantity, "seller_id": sellerId}
        api.patch('patch/buy_item', data)
            .then((res) => {
                if (res.status === 200) {
                    handleClickSnack();
                    refresh();
                    refreshBalance();
                    refreshUserItems();
                    refreshUserSalesItems();
                };
            })
            .catch((err) => {
                setOpenSnackError(true);
                if (err && err.response && err.response.data) {
                    setErrorSnack(err.response.data.detail);
                }
                else {
                    setErrorSnack('Erro ao comprar o item')
                }
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
                       Insira a quantidade que deseja adquirir
                        <TextField
                            label="Quantidade de itens"
                            name="balance"
                            sx={{ mt: 2, width: "40vmin" }}
                            value={quantity}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                        />
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
                                gap: "5vmin",
                                fontFamily: "Montserrat"
                            }}
                        >
                            <Button onClick={handleSubmit} sx={{
                                backgroundColor: 'green', '&:hover': {
                                    backgroundColor: 'rgba(0, 128, 0, 0.3)',
                                }, color: "white"
                            }}>
                                Comprar
                            </Button>
                            <Button onClick={handleClose} sx={{
                                backgroundColor: 'red', '&:hover': {
                                    backgroundColor: ' rgba(255, 0, 0, 0.3)',
                                }, color: "white"
                            }}>
                                Cancelar
                            </Button>
                        </Typography>
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
                    Item adquirido com sucesso!
                </Alert>
            </Snackbar>
        </>
    );
}

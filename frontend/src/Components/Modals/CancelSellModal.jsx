import * as React from "react";
import {
    Backdrop,
    Box,
    Modal,
    Fade,
    Typography,
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

export default function SellModal({ handleClose, open, rowId, setRows, rows }) {
    const userId = useParams().id;

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [openSnack, setOpenSnack] = useState(false);

    const [openSnackError, setOpenSnackError] = useState(false);

    const [errorSnack, setErrorSnack] = useState("");

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
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackError(false);
    };

    const api = useAxios();

    const refresh = async () => {
        try {
            const response = await api.get(`/get/get_items?user_id=${userId}`);
            response.data.forEach(data => {
                data['for_sale'] === false ? data['for_sale'] = 'Não' : data['for_sale'] = 'Sim';
            });
            setRows(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const intId = parseInt(rowId);

    const handleSubmit = async () => {
        const data = { row_id: intId, for_sale: false };
        api
            .patch("patch/item_for_sale_false", data)
            .then((res) => {
                if (res.status === 200) {
                    handleClickSnack();
                    refresh();
                }
            })
            .catch((err) => {
                setOpenSnackError(true);
                console.log(err)
                if (err && err.response && err.response.data) {
                    setErrorSnack(err.response.data.detail);
                }
                else {
                    setErrorSnack('Erro ao tentar tirar seu item da venda');
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
                        Deseja remover este item da venda?
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
                                fontFamily: "Montserrat",
                            }}
                        >
                            <Button
                                onClick={() => handleSubmit()}
                                sx={{
                                    backgroundColor: "green",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 128, 0, 0.3)",
                                    },
                                    color: "white",
                                }}
                            >
                                SIM
                            </Button>
                            <Button
                                onClick={() => handleClose()}
                                sx={{
                                    backgroundColor: "red",
                                    "&:hover": {
                                        backgroundColor: " rgba(255, 0, 0, 0.3)",
                                    },
                                    color: "white",
                                }}
                            >
                                NÃO
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
                    Item removido da venda com sucesso!
                </Alert>
            </Snackbar>
        </>
    );
}

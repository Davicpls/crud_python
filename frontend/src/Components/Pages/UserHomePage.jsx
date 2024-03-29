import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import NavBar from "../Navbar";
import PropTypes from "prop-types";
import UserPageBoxes from "../UserPageBoxes";
import AppContext from "../../Hooks/AppContext";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import DataGridComponent from "../DataGrid/Datagrid";
import DataGridTransactionsHistory from "../DataGrid/DatagridTransactionsHistory";
import { useAxios } from "../../Hooks/useAxios";
import AddIcon from "@mui/icons-material/Add";
import AddBalanceModal from "../Modals/AddBalanceModal";
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export default function UserHomePage() {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const navigateToHome = () => {
    sessionStorage.removeItem("myToken");
    sessionStorage.removeItem("myName");
    sessionStorage.removeItem("myId");
    navigate("/");
  };

  const [invalidToken, setInvalidToken] = useState(false);

  const userName = sessionStorage.getItem("myName");

  const sessionId = sessionStorage.getItem("myId");

  const title = `Página do usuário ${userName}`;

  const styleFeatures = [
    "cv11",
    "salt",
    "ss01",
    "ss03",
    "cv01",
    "cv02",
    "cv03",
    "cv04",
    "cv05",
    "cv06",
    "cv09",
    "cv10",
  ];

  const styleSettings = styleFeatures
    .map((feature) => `"${feature}"`)
    .join(", ");

  const params = useParams();

  const userId = params.id;

  const api = useAxios();

  const { rows, setRows } = useContext(AppContext);

  const [salesRows, setSalesRows] = useState(null);

  const [userSalesRows, setUserSalesRows] = useState(null);

  const [historyRows, setHistoryRows] = useState(null);

  const [saldo, setSaldo] = useState(`R$ ${0}`);

  const [openBalance, setOpenBalance] = useState(false);
  const handleOpenBalance = () => setOpenBalance(true);

  useEffect(() => {
    api
      .get(`/get/get_user_balance?user_id=${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setSaldo(`R$ ${res.data.balance}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/get/user_items_for_sale?user_id=${userId}`)
      .then((res) => {
        if (res.status === 200) {
          res.data.forEach((data) => {
            data["for_sale"] === false
              ? (data["for_sale"] = "Não")
              : (data["for_sale"] = "Sim");
          });
          setUserSalesRows(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/get/get_items?user_id=${userId}`)
      .then((res) => {
        if (res.status === 200) {
          res.data.forEach((data) => {
            data["for_sale"] === false
              ? (data["for_sale"] = "Não")
              : (data["for_sale"] = "Sim");
          });
          setRows(res.data);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          if (
            err.response.data.detail === "Invalid token" ||
            err.config.data === undefined
          ) {
            setInvalidToken(true);
          }
        }
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`get/items_for_sale?user_id=${userId}`)
      .then((res) => {
        setSalesRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`get/user_transaction_history?user_id=${userId}`)
      .then((res) => {
        res.data.forEach((item) => {
          let data = moment(item.date_time);
          item.date_time = data.format('LLLL');
        });
        setHistoryRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (userId !== sessionId) {
    return <Navigate to="/not-allowed" />;
  }

  if (invalidToken === true || userName === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mb: "2vmin",
          height: "100vh",
          width: "100vw",
          fontFamily: "Montserrat",
          WebkitFontSmoothing: "antialised",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          fontFeatureSettings: styleSettings,
        }}
      >
        Sua sessão expirou, faça login novamente!
        <Button
          sx={{ fontFamily: "Montserrat", color: "green" }}
          onClick={navigateToHome}
        >
          Página de login
        </Button>
      </Box>
    );
  }

  if (!salesRows) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mb: "2vmin",
          height: "100vh",
          width: "100vw",
          fontFamily: "Montserrat",
          WebkitFontSmoothing: "antialised",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          fontFeatureSettings: styleSettings,
        }}
      >
        Carregando
      </Box>
    );
  }

  if (!historyRows) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mb: "2vmin",
          height: "100vh",
          width: "100vw",
          fontFamily: "Montserrat",
          WebkitFontSmoothing: "antialised",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          fontFeatureSettings: styleSettings,
        }}
      >
        Carregando
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar title={title} logoff={true} />
      <Box
        component="body"
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          backgroundColor: "white",
          color: "black",
          fontSize: "50px",
          height: "100%",
          m: "1vmin",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Visão Geral" />
          <Tab label="Tabela de gerenciamento" />
          <Tab label="Histórico de transações" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2vmin",
              mb: "15px",
              pr: "85vmin",
            }}
          >
            <Typography>Seu saldo</Typography>
            <TextField
              disabled
              id="outlined-disabled"
              label="Saldo"
              value={saldo}
            />
            <Tooltip title="Adicionar saldo">
              <IconButton onClick={() => handleOpenBalance()}>
                <AddIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
          <UserPageBoxes
            setSaldo={setSaldo}
            userSalesRows={userSalesRows}
            setUserSalesRows={setUserSalesRows}
            salesRows={salesRows}
            setSalesRows={setSalesRows}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DataGridComponent
            setUserSalesRows={setUserSalesRows}
            t
            rows={rows}
            setRows={setRows}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DataGridTransactionsHistory historyRows={historyRows} />
          {console.log(historyRows)}
        </TabPanel>
      </Box>
      <AddBalanceModal
        open={openBalance}
        setOpen={setOpenBalance}
        setSaldo={setSaldo}
      />
    </Box>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import NavBar from "../Navbar";
import PropTypes from 'prop-types';
import UserPageBoxes from "../UserPageBoxes";
import AppContext from "../../Hooks/AppContext";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import DataGridComponent from "../DataGrid/Datagrid"
import { useAxios } from "../../Hooks/useAxios";

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
    navigate('/');
  }

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

  useEffect(() => {
    api.get(`/get/user_items_for_sale?user_id=${userId}`)
      .then((res) => {
        if (res.status === 200) {
          res.data.forEach(data => {
            data['for_sale'] === false ? data['for_sale'] = 'Não' : data['for_sale'] = 'Sim';
          });
          setUserSalesRows(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);


  useEffect(() => {
    api.get(`/get/get_items?user_id=${userId}`)
      .then((res) => {
        if (res.status === 200) {
          res.data.forEach(data => {
            data['for_sale'] === false ? data['for_sale'] = 'Não' : data['for_sale'] = 'Sim';
          });
          setRows(res.data)
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          if (err.response.data.detail === 'Invalid token' || err.config.data === undefined) {
            setInvalidToken(true);
          }
        }
        console.log(err)
      });
  }, []);

  useEffect(() => {
    api.get(`get/items_for_sale?user_id=${userId}`)
      .then((res) => {
        setSalesRows(res.data);
      })
      .catch((err) => {
        console.log(err)
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
        <Button sx={{ fontFamily: "Montserrat", color: "green" }} onClick={navigateToHome}>
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
    )
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
          color: "blue",
          fontSize: "50px",
          fontFamily: "Montserrat",
          height: "100%",
          m: "1vmin"
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Visão Geral" />
          <Tab label="Tabela de gerenciamento" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UserPageBoxes userSalesRows={userSalesRows} setUserSalesRows={setUserSalesRows} salesRows={salesRows} setSalesRows={setSalesRows} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DataGridComponent rows={rows} setRows={setRows} />
        </TabPanel>
      </Box>
    </Box>
  );
}

import React, { useContext, useState } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import NavBar from "../Navbar";
import PropTypes from 'prop-types';
import UserPageBoxes from "../UserPageBoxes";
import AppContext from "../../Hooks/AppContext";
import { useNavigate } from "react-router-dom";
import DataGridComponent from "../DataGrid/Datagrid"

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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const nagivateToHome = () => {
    navigate(('/'))
  }

  const { userToken, setUserToken } = useContext(AppContext);

  const userName = localStorage.getItem("myName");

  const token = userToken;

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


  if (token === null) {
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
        <Button sx={{ fontFamily: "Montserrat", color: "green" }} onClick={nagivateToHome}>
          Página de login
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar title={title} />
      <Box
        component="body"
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          backgroundColor: "white",
          color: "blue",
          fontSize: "50px",
          fontFamily: "montserrat",
          height: "100%",
          m: "1vmin"
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Visão Geral" />
          <Tab label="Tabela de gerenciamento" />
        </Tabs>
        <TabPanel value={value} index={0}>
            <UserPageBoxes />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <DataGridComponent/>
        </TabPanel>
      </Box>
    </Box>
  );
}

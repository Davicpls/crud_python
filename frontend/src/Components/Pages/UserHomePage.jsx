import { Box } from "@mui/material";
import NavBar from "../Navbar";
import UserPageBoxes from "../UserPageBoxes";
import { useEffect } from "react";

export default function UserHomePage() {


  const userName = localStorage.getItem("myName");

  const token = localStorage.getItem("myToken");

  const title = `Página do usuário ${userName}`;
  
  useEffect(()=> console.log(token))

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
          height: "100vh",
          width: "100vw",
          WebkitFontSmoothing: "antialised",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          fontFeatureSettings: styleSettings,
        }}
      >
        Authenticating ...
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
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          fontSize: "50px",
          fontFamily: "montserrat",
          height: "95%",
        }}
      >
        <UserPageBoxes />
      </Box>
    </Box>
  );
}

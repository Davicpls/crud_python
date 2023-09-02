import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar"

export default function UserHomePage() {
  const { user } = useParams();

  const userName = localStorage.getItem("myKey");

  const title = 'Página do usuário'

  if (userName === undefined || userName === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",

        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar title={title}/>
      <Box
        component="body"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          fontSize: "50px",
          fontFamily: "montserrat",
          height: "95%"
        }}
      >
        CHEGOU A SUA VEZ, {user}
      </Box>

    </Box>
  );
}

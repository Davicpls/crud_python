import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function NavBar({ title, logoff }) {


  const navigate = useNavigate();

  const logOff = () => {
    sessionStorage.removeItem("myToken");
    sessionStorage.removeItem("myName");
    sessionStorage.removeItem("myId");
    navigate('/');
  }
  return (
    <Box
      sx={{
        height: "5%",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        fontFamily: "montserrat",
        fontSize: "2vmin",
        fontWeight: "1",
        backgroundColor: "black",
        color: "white",
        p: "1vmin"
      }}
      component="header"
    >
      {logoff === true ? <Box sx={{ flexGrow: 1, flexBasis: 200, textAlign: "end" }}>
        {title}
      </Box> : <Box sx={{ flexGrow: 1, flexBasis: 200, textAlign: "center" }}>
        {title}
      </Box> }
      {logoff === true ? <Box sx={{ flexGrow: 1, flexBasis: 75, textAlign: "end" }}>
        <Button onClick={() => logOff()} variant="contained"> Deslogar</Button>

      </Box>: null}
    </Box>
  );
}

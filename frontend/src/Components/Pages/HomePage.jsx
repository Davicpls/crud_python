import LoginBox from "../LoginBox";
import { Box } from "@mui/material";
import background from "../Images/background.avif";
import NavBar from "../Navbar"

export default function HomePage() {

  const title = 'CRUD - GERENCIAMENTO DE ESTOQUE'

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar 
        title={title}/>
      <Box
        component="body"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "95%"
        }}
      >
        <LoginBox />
      </Box>
    </Box>
  );
}

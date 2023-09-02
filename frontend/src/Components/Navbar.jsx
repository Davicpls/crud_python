import { Box } from "@mui/material";

export default function NavBar({title}) {
  return (
    <Box
      sx={{
        height: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "montserrat",
        fontSize: "2vmin",
        fontWeight: "1",
        backgroundColor: "black",
        color: "white",
        p: "1vmin"
      }}
      component="header"
    >
      {title}
    </Box>
  );
}

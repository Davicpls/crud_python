import LoginBox from "../LoginBox";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <LoginBox/>
    </Box>
  );
}

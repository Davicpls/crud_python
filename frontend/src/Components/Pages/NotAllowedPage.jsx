import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar"
import nothereelf from "../Images/nothereelf.png"

export default function NotAllowedPage() {

    const userId = sessionStorage.getItem("myId")

    const title = "Not Allowed";

    const navigate = useNavigate();

    const handleRedirect = (id) => {
        navigate(`/user/${id}`);
    }

    return (
        <Box sx={{ height: "100vh" }}>
            <NavBar title={title} />
            <Box sx={{ height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "rgba(108, 122, 137, 0.2)",
                    color: "white",
                    height: "50%",
                    width: "30%"
                }}>
                    <Typography sx={{fontFamily: "Montserrat", fontSize: "20px", color: "black", pb: "2vmin" }}>Not Allowed Here</Typography>
                    <img src={nothereelf} alt="lilelf" style={{paddingBottom: "2vmin"}} />
                    <Typography sx={{fontFamily: "Montserrat", fontSize: "20px", color: "black", pb: "2vmin" }}>Click to redirect</Typography>
                    <Button onClick={() => {handleRedirect(userId)}}>Your Page</Button>
                </Box>
            </Box>
        </Box>
    )
}
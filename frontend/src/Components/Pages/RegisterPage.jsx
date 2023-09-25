import RegisterBox from "../Boxes/RegisterBox";
import { Box } from "@mui/material";
import background from "../Images/background.avif";
import NavBar from "../Navbar";

export default function RegisterPage() {
  const title = "Cadastro";

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

  return (
    <Box
      sx={{
        height: "100vh",
        WebkitFontSmoothing: "antialised",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
        fontFeatureSettings: styleSettings,
      }}
    >
      <NavBar title={title} />
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
          height: "95%",
        }}
      >
        <RegisterBox />
      </Box>
    </Box>
  );
}

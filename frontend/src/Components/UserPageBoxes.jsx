import { Card, Box, Button } from "@mui/material";
import InsertModal from "../Components/Modals/InsertModal";
import { useState } from "react";

export default function UserPageBoxes() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          backgroundColor: "white",
          height: "30%",
          width: "30%",
          p: "1vmin",
          mx: "1vmin",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        Inserir um novo item
        <Box
          sx={{
            fontSize: "18px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          <Button
            sx={{
              fontSize: "18px",
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "green",
              '&:hover': {
                backgroundColor: 'green',
              }
            }}
            onClick={handleOpen}
            variant='contained'
          >
            Clique aqui
          </Button>
          <InsertModal
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            setOpen={setOpen}
          />
        </Box>
      </Card>
      <Card
        sx={{
          backgroundColor: "white",
          height: "30%",
          width: "30%",
          p: "1vmin",
          mx: "1vmin",
        }}
      >
        sdsds
      </Card>
      <Card
        sx={{
          backgroundColor: "white",
          height: "30%",
          width: "30%",
          p: "1vmin",
          mx: "1vmin",
        }}
      >
        sdsds
      </Card>
      <Card
        sx={{
          backgroundColor: "white",
          height: "30%",
          width: "30%",
          p: "1vmin",
          mx: "1vmin",
        }}
      >
        sdsds
      </Card>
      <Card
        sx={{
          backgroundColor: "white",
          height: "30%",
          width: "30%",
          p: "1vmin",
          mx: "1vmin",
        }}
      >
        sdsds
      </Card>
      <Card
        sx={{
          backgroundColor: "white",
          height: "30%",
          width: "30%",
          p: "1vmin",
          mx: "1vmin",
        }}
      >
        sdsds
      </Card>
    </>
  );
}

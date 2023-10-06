import { Card, Box } from "@mui/material";
import DataGridComponent from "./DataGrid/DatagridSales";


export default function UserPageBoxes({rows, setRows}) {

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      height: "100%",
    }} >
      <Card
        sx={{
          backgroundColor: "white",
          height: "25vw",
          width: "25vw",
          p: "1vmin",
          mx: "1vmin",
          flexGrow: 1,
        }}
      >
        Tabela de compra
        <DataGridComponent rows={rows} setRows={setRows}/>
      </Card>
      <Card
        sx={{
          backgroundColor: "white",
          height: "25vw",
          width: "25vw",
          p: "1vmin",
          mx: "1vmin",
          flexGrow: 1,
        }}
      >
        sdsds
      </Card>
    </Box>
  );
}

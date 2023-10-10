import { Card, Box } from "@mui/material";
import DataGridComponent from "./DataGrid/DatagridSales";
import DataGridComponentUser from "./DataGrid/DatagridUserSales"


export default function UserPageBoxes({ userSalesRows, setUserSalesRows, salesRows, setSalesRows, setSaldo }) {

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      height: "100%",
    }} >
      <Card
        sx={{
          backgroundColor: "white",
          height: "40vw",
          width: "25vw",
          p: "1vmin",
          mx: "1vmin",
          flexGrow: 1,
        }}
      >
        Tabela de compra
        <DataGridComponent setUserSalesRows={setUserSalesRows} setSaldo={setSaldo} salesRows={salesRows} setSalesRows={setSalesRows}/>
      </Card>
      <Card
        sx={{
          backgroundColor: "white",
          height: "40vw",
          width: "25vw",
          p: "1vmin",
          mx: "1vmin",
          flexGrow: 1,
        }}
      >
        Seus itens a venda
        <DataGridComponentUser userSalesRows={userSalesRows} setUserSalesRows={setUserSalesRows}/>
      </Card>
    </Box>
  );
}

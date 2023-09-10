import * as React from 'react';
import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import UpdateModal from '../Modals/UpdateModal'
import EditIcon from '@mui/icons-material/Edit';
import InsertModal from '../Modals/InsertModal';

export default function DataGridComponent() {

  const [openUpdate, setOpenUpdate] = useState(false);
  const [rowIdToUpdate, setRowIdToUpdate] = useState(null)
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [openInsert, setOpenInsert] = useState(false);
  const [rowIdToInsert, setRowIdToInsert] = useState(null)
  const handleOpenInsert = () => setOpenInsert(true);
  const handleCloseInsert = () => setOpenInsert(false);

  const handleEdit = useCallback((rowId) => {
    setRowIdToUpdate(rowId);
    handleOpenUpdate();
  }, []);

  const handleInsert = () => {
    handleOpenInsert();
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      backgroundColor: "black"
    },
    {
      field: 'name',
      headerName: 'Nome do Item',
      width: 400,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 400,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'price',
      headerName: 'Preço',
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 422,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        let rowId = params.row.id;

        return (
          <Box>
            <IconButton onClick={() => handleEdit(rowId)}>
              <EditIcon color='primary' />
            </IconButton>
          </Box>
        )
      }

    }
  ];

  const rows = [
    { id: 1, name: 'Snow', description: 'Jon', quantity: 35 },
    { id: 2, name: 'Lannister', description: 'Cersei', quantity: 42 },
    { id: 3, name: 'Lannister', description: 'Jaime', quantity: 45 },
    { id: 4, name: 'Stark', description: 'Arya', quantity: 16 },
    { id: 5, name: 'Targaryen', description: 'Daenerys', quantity: null },
    { id: 6, name: 'Melisandre', description: null, quantity: 150 },
    { id: 7, name: 'Clifford', description: 'Ferrara', quantity: 44 },
    { id: 8, name: 'Frances', description: 'Rossini', quantity: 36 },
    { id: 9, name: 'Roxie', description: 'Harvey', quantity: 65 },
  ];



  return (
    <>
      <UpdateModal
        handleClose={handleCloseUpdate}
        open={openUpdate}
        rowId={rowIdToUpdate}
      />
      <InsertModal
        handleClose={handleCloseInsert}
        open={openInsert}
      />

      <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
        <Button onClick={handleInsert} sx={{mr: '20px'}}>
          Inserir Item
        </Button>
        <DataGrid
          sx={{ height: '75vh', mt: '5px' }}
          rows={rows}
          columns={columns}
          initialState={{
          }}
          pageSizeOptions={[25]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip, Button, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { roleColumns } from './constants';
import ConfirmDialog from '../confirmDialog';
import { removeRole } from '../../store/slices/userSlice';
import { setNotification } from '../../store/slices/appSlice';

const RoleList = () => {
  const [columns, setColumns] = useState([]);
  const [removeRoleDetail, setRemoveRoleDetail] = useState(null);
  const roleList = useSelector((state) => state.user.roles, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setColumns(updateColumnsWithActions());
  }, []);
  
  const updateColumnsWithActions = () => {
    const col = [...roleColumns];

    col.push({
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Edit Role">
              <IconButton onClick={() => navigate(`/role/${params.row.id}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Role">
              <IconButton onClick={() => setRemoveRoleDetail(params.row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      }
    });
    return col;
  }

  const handleRemoveRole = () => {
    dispatch(removeRole({ id: removeRoleDetail.id }));
    setRemoveRoleDetail(null);
    dispatch(setNotification({
      message: "Role removed",
      type: "success"
    }));
  }

  const handleAddNewRole = () => {
    navigate(`/role/new`);
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 3, mx: 4 }}>
        <Box component="h3" sx={{ color: "#444" }}>Role</Box>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAddNewRole}>Add</Button>
      </Box>

      <DataGrid
        rows={roleList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{ mx: 4 }}
      />

      <ConfirmDialog
        isOpen={Boolean(removeRoleDetail && removeRoleDetail.id)}
        title="Confirm Remove"
        description={
        <Box>
          <Typography>Are you sure want to remove role "{removeRoleDetail ? removeRoleDetail.roleLabel : ''}" ?</Typography>
          <Typography>It may assign to user(s).</Typography>
        </Box>
        }
        onConfirm={handleRemoveRole}
        onClose={() => setRemoveRoleDetail(null)}
      />
    </Box>
  );
}

export default RoleList;

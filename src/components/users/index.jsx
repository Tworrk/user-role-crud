import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { userColumns } from './constants';
import ConfirmDialog from '../confirmDialog';
import { removeUser } from '../../store/slices/userSlice';
import { setNotification } from '../../store/slices/appSlice';

const UserList = () => {
  const [columns, setColumns] = useState([]);
  const [removeUserDetail, setRemoveUserDetail] = useState(null);
  const list = useSelector((state) => state.user.list, shallowEqual);
  const userRoles = useSelector((state) => state.user.roles, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setColumns(updateColumnsWithActions());
    // eslint-disable-next-line
  }, []);
  
  const updateColumnsWithActions = () => {
    const col = [...userColumns];
    col.push({
      field: 'roleKey',
      headerName: 'Role',
      width: 130,
      renderCell: (params) => {
        const roleLabel = userRoles.find(i => i.roleKey === params.row.roleKey)?.roleLabel || params.row.roleKey;
        return roleLabel;
      }
    });

    col.push({
      field: 'action',
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title='Edit User'>
              <IconButton onClick={() => navigate(`/user/${params.row.id}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete User'>
              <IconButton onClick={() => setRemoveUserDetail(params.row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      }
    });
    return col;
  }

  const handleRemoveUser = () => {
    dispatch(removeUser({ id: removeUserDetail.id }));
    setRemoveUserDetail(null);
    dispatch(setNotification({
      message: 'User removed',
      type: 'success'
    }));
  }

  const handleAddNewUser = () => {
    navigate(`/user/new`);
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 3, mx: 4 }}>
        <Box component='h3' sx={{ color: '#444' }}>Users</Box>
        <Button startIcon={<AddIcon />} variant='contained' onClick={handleAddNewUser}>Add</Button>
      </Box>

      <DataGrid
        rows={list}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{ mx: 4 }}
      />

      <ConfirmDialog
        isOpen={Boolean(removeUserDetail && removeUserDetail.id)}
        title='Confirm Remove User'
        description={`Are you sure want to remove user '${removeUserDetail ? removeUserDetail.name : ''}' ?`}
        onConfirm={handleRemoveUser}
        onClose={() => setRemoveUserDetail(null)}
      />
    </Box>
  );
}

export default UserList;

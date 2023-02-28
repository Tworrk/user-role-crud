import { createSlice } from '@reduxjs/toolkit';

// On initial data not added password
const initialState = {
  list: [
    { id: '1', name: 'Sagar', email: 'sagar@yopmail.com', username: 'sagar', mobile: '9876543210', roleKey: 'admin' },
    { id: '2', name: 'Aman', email: 'aman@yopmail.com', username: 'aman', mobile: '9876543222', roleKey: 'admin' },
    { id: '3', name: 'Sumona', email: 'sumona@yopmail.com', username: 'sumona', mobile: '9876543254', roleKey: 'employee' },
  ],
  roles: [
    { id: '1', roleLabel: 'Admin', roleKey: 'admin' },
    { id: '2', roleLabel: 'Employee', roleKey: 'employee' },
  ],
  isLoader: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.list.push({
        ...action.payload,
        id: `${Math.floor(Math.random() * 999999)}`
      });
    },
    updateUser: (state, action) => {
      state.list = state.list.map(userItem => {
        if (userItem.id === action.payload.id) {
          return { ...userItem, ...action.payload };
        }
        return userItem;
      });
    },
    removeUser: (state, action) => {
      state.list = state.list.filter(userItem => userItem.id !== action.payload.id);
    },
    addRole: (state, action) => {
      state.roles.push({
        ...action.payload,
        id: `${Math.floor(Math.random() * 999999)}`
      });
    },
    updateRole: (state, action) => {
      state.roles = state.roles.map(userItem => {
        if (userItem.id === action.payload.id) {
          return { ...userItem, ...action.payload };
        }
        return userItem;
      });
    },
    removeRole: (state, action) => {
      state.roles = state.roles.filter(role => role.id !== action.payload.id);
    },
    setUserLoader: (state, action) => {
      state.isLoader = action.payload
    },
  },
})

export const { addUser, updateUser, removeUser, setUserLoader, addRole, updateRole, removeRole } = userSlice.actions

export default userSlice.reducer;

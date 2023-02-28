import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: {
    isOpen: false,
    message: '',
    type: 'info',
    duration: 3000
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      if(action.payload && action.payload.message && action.payload.type) {
        state.notification = {
          ...state.notification,
          isOpen: true,
          ...action.payload,
        };
      }
    },
    resetNotification: (state) => {
      // Only hide the notification once open new it will be replace message and type
      state.notification.isOpen = false;
      // state.notification = initialState.notification;
    },
    
  },
})

export const { setNotification, resetNotification } = appSlice.actions

export default appSlice.reducer;

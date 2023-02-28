import { Snackbar, Alert } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { resetNotification } from "../../../store/slices/appSlice";

const Notification = () => {
  const { isOpen = false, message, type = "info", duration = 5000 } = useSelector((state) => state.app.notification);
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log(">>");
    dispatch(resetNotification());
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification;

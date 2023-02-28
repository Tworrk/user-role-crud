import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Box } from '@mui/material';
import Users from './components/users';
import AddEditUser from './components/users/addEditUser';
import Home from './components/home';
import Header from './components/common/header';
import RoleList from './components/roles';
import AddEditRole from './components/roles/addEditRole';
import Notification from './components/common/notification';

const App = () => {
  return (
    <Box className='App' component='div'>
      <Router>
        <Header />
        <Box component='div' sx={{ mt: 4 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<Users />} />
            <Route path='/user/new' element={<AddEditUser />} />
            <Route path='/user/:id' element={<AddEditUser />} />
            <Route path='/role' element={<RoleList />} />
            <Route path='/role/new' element={<AddEditRole />} />
            <Route path='/role/:id' element={<AddEditRole />} />
          </Routes>
        </Box>
      </Router>
      <Notification />
    </Box>
  );
}

export default App;

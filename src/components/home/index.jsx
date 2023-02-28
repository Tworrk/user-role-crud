import { Box } from "@mui/material";

const Home = () => {

  return (
    <Box>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <Box sx={{ color: '#444' }} component="h1">Welcome</Box>
        <Box sx={{ color: '#444' }} component="h2">User & Role listing</Box>
      </Box>
    </Box>
  );
}

export default Home;

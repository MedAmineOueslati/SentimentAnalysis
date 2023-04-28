import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  let {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const handleAddClick = () => {
     
      
    navigate('/Expertform');
    

  }
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      { user.isExpert&& (<Button
variant="contained"
color="primary"
startIcon={<AddIcon />}
onClick={handleAddClick}
>
Add article
</Button>)}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton  component={Link} to="/profil" >
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
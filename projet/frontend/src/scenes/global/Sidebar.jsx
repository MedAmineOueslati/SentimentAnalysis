import { useState,useContext,useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AuthContext from '../../context/AuthContext';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';



const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [nb,setnb]=useState(0);
  const [col,setcol]=useState("black");
  let {user, logoutUser} = useContext(AuthContext)
  
function handlelogout(){
  logoutUser()
}
  async function Nbnotif() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/NomreDePostAverf/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      const data = await response.json();
     
      setnb(data.Nb)
      
    } catch (error) {
      console.log(error);
    }}
    useEffect(()=>
    {
      Nbnotif()
    },[])
    useEffect(()=>
    {
     if(nb)
     setcol('red')
     else
     setcol('black')
    },[nb])
  
  return (
    
    <Box height= "100vh"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey[100],
            
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10%"
              >
                
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          

          <Box     paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 20px" , fontWeight: 'bold', fontSize: '1.2rem'  }}
            >
              Data
            </Typography>
            
            <Item
              title="Comment "
              to="/Comment"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 20px", fontWeight: 'bold', fontSize: '1.2rem'  }}
            >
              Pages
            </Typography>
            
            {user && !user.isExpert&&(<Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />)}
            <Item
              title="FAQ Page"
              to="/PostsCy"
              htmlColor={col}
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {user && user.isExpert&&(<Item
              title={<span className="item-title" style={{ color:col }}>{`Notification  ${nb}`}</span>}
              htmlcolor='red'
              to="/App1"
              icon={ <NotificationsOutlinedIcon htmlColor={col}/>}
              selected={selected}
              setSelected={setSelected}
            />)}

<Item
              title="Articles "
              to="/Search"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 20px" , fontWeight: 'bold', fontSize: '1.2rem'  }}
            >
              Charts
            </Typography>
            <Item
             title="Area Chart"
             to="/area"
             icon={<StackedLineChartOutlinedIcon />}
             selected={selected}
             setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 20px", fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              Personal
            </Typography>
           { user ? (
          <Item
              title="Logout"
              icon={<LoginOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={handlelogout}
            />) : (
              <Item
              title="LogIn"
              to="/login"
              icon={<LoginOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            )
           }
           {user && (<Item
              title="Info"
              to="/profil"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />)}

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
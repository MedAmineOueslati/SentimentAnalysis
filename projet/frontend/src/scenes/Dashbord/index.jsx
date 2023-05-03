import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import SanitizerOutlinedIcon from '@mui/icons-material/SanitizerOutlined';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReduceCapacityOutlinedIcon from '@mui/icons-material/ReduceCapacityOutlined';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import AreaChart from "../../components/AreaChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Comment from "../comments";
import Dashcom from "../../components/Dashcom";
import Areadash from "../../components/Areadash";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="6 403 179"
            subtitle="Totally vaccinated"
            progress="0.5418"
            increase="54,18%"
            icon={
              <ReduceCapacityOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="7 884 231"
            subtitle=" E-vax registers"
            progress="0.666"
            increase="66,6%"
            icon={
              <SanitizerOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="7 218 419"
            subtitle="Single vaccine dose"
            progress="0.9156"
            increase="91,56%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="13 297 317"
            subtitle="Received vaccine"
            progress="0.80"
            increase="+43%"
            icon={
              <VaccinesOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"

          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                The Government Goal VS The Reality 
              </Typography>
              <Box height="100%">
              <Areadash/>
              </Box>
            </Box>
            
          </Box>
          <Box height="50px" width="20px" m="-20px 0 0 0">
            {/*<LineChart height="20px" />*/}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <div style={{ display: "flex", flexDirection: "column"}}>
            <div style={{ display: "flex", flexDirection: "column"}}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}} >
              <br/>
      
              <CalendarMonthIcon marginTop={5}/>
            <span class="icon-description span color__red ml-1"  style={{fontWeight: "bold", fontSize: 25}} >
               30 juin 2021
              </span>
              </div>
            <p marginTop={3}  style={{ fontSize: 18}} >Government objective of 3 million people vaccinated
            </p>
           </div>
           <br/>
           <div style={{ display: "flex", flexDirection: "column"}}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
            <CancelIcon marginTop={5}/>

              <span class="icon-description span color__red ml-1"  style={{fontWeight: "bold", fontSize: 21}} >
                Objective not met
              </span>
            </div>
            <p marginTop={3}style={{ fontSize: 17.5}} >Merely 643 457 people were fully vaccinated by this date.</p>
          </div>

           </div>
          </Box>
          
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
           Vaccination Rate In Tunisia

          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              51,18% vaccinated
            </Typography>
              </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Dashcom height="20px" />


        </Box>
       
      </Box>
    </Box>
  );
};

export default Dashboard;
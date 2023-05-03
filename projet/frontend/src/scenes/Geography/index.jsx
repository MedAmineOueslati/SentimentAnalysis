import { Box } from "@mui/material";
import Header from "../../components/HeaderC";
import GeoChat from "../../components/GeoChart";

const Geo = () => {
  

  return (
    <Box m="20px">
    
      <Header title="GeoChart" subtitle="Let's play a game of 'Who's the Vaccination Champion?' and see which region is winning the race" />
      <Box height="75vh">
          <GeoChat/>
      </Box>
    </Box>
  );
};

export default Geo;
import { Box } from "@mui/material";
import Header from "../../components/HeaderC";
import GeoChat from "../../components/GeoChart";

const Geo = () => {
  

  return (
    <Box m="20px">
    
      <Header title="GeoChart" subtitle="Simple GeoChart" />
      <Box height="75vh">
          <GeoChat/>
      </Box>
    </Box>
  );
};

export default Geo;
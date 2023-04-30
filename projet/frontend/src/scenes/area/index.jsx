import { Box } from "@mui/material";
import Header from "../../components/HeaderC";
import AreaChart from "../../components/AreaChart";

const Area = () => {
  return (
    <Box m="20px">
      <Header title="Area Chart" subtitle="Simple Area Chart" />
      <Box height="75vh">
         <AreaChart/>
      </Box>
    </Box>
  );
};

export default Area;
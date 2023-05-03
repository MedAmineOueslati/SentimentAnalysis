import { Box } from "@mui/material";
import Header from "../../components/HeaderC";
import LineChart from "../../components/LineChart";

const Line = () => {
  return (
    <Box m="20px" marginTop="20px">
      <Header sx={{ marginTop: '20px' }}title="Line Chart" subtitle="Stepping Closer: Daily Progress towards Vaccinating the Nation" /><br/>
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
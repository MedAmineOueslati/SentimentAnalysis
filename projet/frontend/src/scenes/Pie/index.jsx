import { Box } from "@mui/material";
import Header from "../../components/HeaderC";
import PieChart from "../../components/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Let's see who won: positive or negative comments " />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
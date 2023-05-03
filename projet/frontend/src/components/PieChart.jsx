import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { PieDataTeam as data } from "../data/PieData"
import Chart from "react-apexcharts"
const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return ( <React.Fragment>
    <Chart 
    type="pie"
    height={700}
    series={[4502,4666]}
    options={{
     
      colors: ["#A8DADC","#457B9D"],
      labels:[' Positive Comments', 'Negative Comments'] ,
      dataLabels: {
        style: {
          fontSize: "24px",
          colors: ["#000000"],
        }}
      
    }}>

    </Chart>
  </React.Fragment>

  );
};
export default PieChart;
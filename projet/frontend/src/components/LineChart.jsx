import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { PieDataTeam as data } from "../data/PieData"
import Chart from "react-apexcharts"
import { blue } from "@mui/material/colors";
const LineChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return ( <React.Fragment>
    <Chart 
    type="line"
    width={800}
    height={450}
    series={[ {name: "Nomber of vaccin per month",
    data: [
        {x: "2021-07-31", y: 500000},
        {x: "2021-08-14", y: 1488800},
        {x: "2021-08-21", y: 1982875},
        {x: "2021-08-31", y: 2165094},
        {x: "2021-09-09", y: 2580446},
        {x: "2021-09-18", y: 3209273}, 
        {x: "2021-09-29", y: 3825227},
        {x: "2021-10-06", y: 3973932},
        {x: "2021-10-11", y: 4095504},
        {x: "2021-10-18", y: 4222476},
        {x: "2021-10-21", y: 4289685},
        {x: "2021-10-29", y: 4495433},
        {x: "2022-11-02", y: 4567385}, 
        {x: "2022-04-04", y: 6352181},
        {x: "2022-04-25", y: 6366918},
        {x: "2022-05-09", y: 6368899},
        {x: "2022-06-06", y: 6373098},
        {x: "2022-06-20", y: 6376006},
        {x: "2022-07-04", y: 6377304}, 
        {x: "2022-09-19", y: 6384755},
        {x: "2022-10-31", y: 6387025},
        {x: "2022-11-15", y: 6384156},
        {x: "2023-02-20", y: 6398855},
        {x: "2023-03-06", y: 6697243},
    ]
    
  }]}
  options={{
    chart: {
      id: "vaccination",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "31 Juil 2021",
        "14 Aout 2021",
        "21 Aout 2021",
        "31 Aout 2021",
        "9 Sept2021",
        "18 Sept 2021",
        "29 Sept",
        "6 Oct",
        "11 Oct",
        "18 oct 2021",
        "21 Oct",
        "29 Oct 2021",
        "02 Nov 2022",
        "04 Avril 2022",
        "6 Juin 2022",
        "20 Juin 2022",
        "4 Juil 2022",
        "19 Sept 2022",
        "03 Oct 2022",
        "31 Oct 2022",
        "15 Nov 2022",
        "6 Fevr 2023",
        "20 Fevr 2023",
        "6 Mars 2023",
      ],
      labels: {
        show: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "15px",
        },
        formatter: function (value) {
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 5,
      
    },
    markers: {
      size: 0,
  },
              title: {
                text: 'Number of vaccins per day ',
                align: 'left',
                
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                }}
  }}
  

  
  > </Chart>
  </React.Fragment>

  );
};
export default LineChart;
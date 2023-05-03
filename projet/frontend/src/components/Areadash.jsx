import React from "react"
import Chart from "react-apexcharts"
import { Box } from "@mui/material";
const Areadash = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

   
  
  return (
    
    
    
    <React.Fragment>
    <Chart 
    
    height={310}
    width={420}
    series={[ 

{
name: "Government vaccination goal",
type: "area",
option: {
  stroke: {
    curve: "straight",
  },
  colors: ["#A8DADC"],
},
data: [
  {x: "2021-03-13", y: 1000},
  {x: "2021-03-31", y: 500000},
  {x: "2021-04-18", y: 1000000},
  {x: "2021-05-07", y: 1500000},
  {x: "2021-05-24", y: 2000000},
  {x: "2021-06-12", y: 2500000},
  {x: "2021-07-01", y: 3000000},
],
},         
        {name: "Number of vaccine per day",       
        type: "area",            
        options: {              
            stroke: {                
                curve: "smooth",                
                width: 5,              
            },              
            colors: ["#457B9D"],},
data: [
  {x: "2021-03-13", y: 33},
  {x: "2021-03-31", y: 1281},
  {x: "2021-04-18", y: 37268},
  {x: "2021-05-07", y: 145800},
  {x: "2021-05-24", y: 282367},
  {x: "2021-06-12", y: 419011},
  {x: "2021-07-01", y: 643457},
],
}
]}
options={{
    colors: ["#A8DADC","#457B9D"],

    xaxis: {
      type: "category",
      categories: [
        " 13 Mars 2021 ",
        "31 Mars 2021",
        "18 Avril 2021",
        "07 Mai 2021",
        "24 Mai 2021",
        "12 Juin 2021",
        "01 Juillet 2021"
      ],
      labels: {
        show: true,
        style: {
          fontSize: "11px",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "13px",
        },
        formatter: function (value) {
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    
  }}
  

  
  > </Chart>
  </React.Fragment>
  
  );
};
export default Areadash;
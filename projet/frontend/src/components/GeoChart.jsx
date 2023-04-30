import React from "react";
import Chart from "react-apexcharts";

const GeoChart = () => {
  const options = {

	colors: ["#A8DADC","#457B9D"],
    chart: {
      type: "bar",
      height: 800,
    },
    plotOptions: {
      bar: {

        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
      
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: [ "Tunis",
	  "Ariana",
	  "Ben Arous",
	  "Manouba",
	  "Nabeul",
	  "Zaghouan",
	  "Bizerte",
	  "Béja",
	  "Jendouba",
	  "Kef",
	  "Siliana",
	  "Sousse",
	  "Monastir",
	  "Mahdia",
	  "Sfax",
	  "Kairouan",
	  "Kasserine",
	  "Sidi Bouzid",
	  "Gabès",
	  "Medenine",
	  "Tataouine",
	  "Tozeur",
	  "Kebili"],
    
	labels: {
        show: true,
        style: {
          fontSize: "px",
        },},},
	yaxis:
	{
		labels: {
			show: true,
			style: {
			  fontSize: "px",
			},}
	}
	
  };

  const series = [
    {
      name: "nbre de locaux de vaccination",
	  colors :["#A8DADC"],
      data: [6,7,6,5,15,6,12,8,7,11,10,9,12,10,15,10,12,13,6,4,7,6,5]
    },
    {
      name: "nmbre de personne vaccinees",
	  colors :["#457B9D"],
      data: [49458,27030,41709,18355,43748,5883,26119,11427,14658,10943,6750,6750,37235,23757,13841,16191,14816,15139,14449,1758,6536,6467],
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={700} />
    </div>
  );
};

export default GeoChart;

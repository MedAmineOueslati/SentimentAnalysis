import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/HeaderC";
import Dashcom from "../../components/Dashcom"
const Comment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  

  const columns = [
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "Comment",
      headerName: "Comment",
      flex: 1,
    },
    {
      field: "Output",
      headerName: "Output",
      flex: 1,
    },
  ];
  console.log("Data state: ", data);
  const rows = [
    {id:1 ,Name:"Osama Riahi" ,Comment:"ماهو اللي ملقح معادش يعدي عاد" ,Output:0},
     {id:2 ,Name:"بسومة زجوجة الغالي" ,Comment:"Wil boitete" ,Output:0},
     {id:3 ,Name:"Chams Cherif" ,Comment:"هاذي اسمها ريفيزيون ليلة صلاله" ,Output:0},
      {id:4 ,Name:"Emna Hajji" ,Comment:"لا للتلفيح التجريبي" ,Output:0},
     {id:5 , Name:"Fawzia Bhira"  , Comment:"الشفاء لشباب تونس الله يحميكم ", Output:1 },      
  {id:6,Name:"Sahbi Hermi", Comment:" وشكرا لكم ربي يحمي كل من ساهم في عملية التلقيح " ,Output:1}
  
  
  
  
  
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Comments" subtitle="Comments posted by Tunisians on Facebook regarding vaccination" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
         
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.primary[400],
           
            fontSize:25
          },
         
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.primary[400],
            borderTop: "none",
            fontSize:20
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.primary[400]} !important`,
            fontSize:20
          },
        }}
      >
        <Dashcom/>
        
      </Box>
    </Box>
  );
};

export default Comment;
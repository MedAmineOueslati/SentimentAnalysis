import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Dashcom=()=>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);

  

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
    {id:6,Name:"Sahbi Hermi", Comment:" وشكرا لكم ربي يحمي كل من ساهم في عملية التلقيح " ,Output:1},
    {id:7,Name:"Sabri Ben Amor Toumi",Comment:"Ti le 3ad moch 9alo w entoma zed liy ki ta3mel vaccin rak7 twali rajel l5ar9 w m3ed ydhourk chy ", Output:1},
    {id:8,Name:"Sadok Saidi",Comment:"لتلقيح ينفع وبرشا جربوه تنجم تدخل بيه للكارفور وعزيزة والبوسطة والبانكة وزادة متتنحالكش شهريتك ومرات تنجم تتجلط بونيس من عندهم",Output:1},
    {id:9,Name:"Hamdi Hamdi Hamdi Arem",Comment:"لقحت ومعادش انلقح لو كان نموت",Output:0},
    {id:10,Name:"Amira Regayeg Trigui",Comment:"كيفاش تباعد مع اكتظاظ الاقسام",Output:1},
    {id:11,Name:"Salma Ben Salem",Comment:"و يطبق في الميترو و النقل العمومي و الا مش معنيين بيه ",Output:1},
    {id:12,Name:"Youssef Touati",Comment:"مانيش ملقح",Output:0},
    {id:13,Name:"Abdelaziz Gharbi",Comment:"هذا تمهيد لمنع الظاهر يوم 14",Output:1},
    {id:14,Name:"Rim Tounekti",Comment:"والتلامذه في قاعة مرصوصين اش عملنا فيهم",Output:0},
    {id:15,Name:"يكريم الدرناو",Comment:"يحضروا فيكم نفسانيا باش يقولولكم راو لازم جرعة أخرى متاع لقاح مكملة للقاح لي عملتوه",Output:1},
    {id:16,Name:"Bíílel Jlässi",Comment:"كذب",Output:0},
    {id:17,Name:"Ri Adh",Comment:"دمرتو صحة الناس",Output:0},
    {id:18,Name:"Amine Soltani",Comment:"بجاه رابي منكن خايفين من الكورنا والين خايفين من التلقيح راب اصابر الشعب التونسي",Output:1},
    {id:19,Name:"Hafedh Chridi",Comment:"Te haho 7akya far8a tal9e7",Output:0},
    {id:20,Name:" جيهان بوسعيد",Comment:"	والقسم حكة والطواول قراب لبعضهم اش عملنا فيهم ولااا لتلقيح الاطفال",Output:0},
    {id:21,Name:" محمد حمدان",Comment:"الجماعة طلعو يلقحو بالخل يظهرلي",Output:0},
    {id:22,Name:"Om Slimen",Comment:"وفرونا التحاليل وبعد احكيو على التلقيح الله لا تباركلكم ضريتونا حسب الله ونعمة الوكيل",Output:0},
    {id:23,Name:"Hafedh Gaied Gaied",Comment:"خربونا بالزرارق بالفارغ",Output:0},
    {id:24,Name:"Mariem Bahrini Jridi",Comment:"لقحو للعباد و وهوما مكورنين خلي ينقرض الشعب التونسي",Output:0},
    {id:25,Name:"Ma Nou",Comment:"منيش ملقحة والحمد لله لا للتلقيح الاجبارى",Output:0},
    {id:26,Name:"Wa Daleji",Comment:"ملا كذبة عملتوهالنا وتحبو صغرنا يلقاودوووييييو يبطى في الهبطى وربي لما نخربها على روسكم",Output:0},
    {id:27,Name:"Ftiti Nidhal",Comment:"مانيش ملقح",Output:0},
    {id:28,Name:" صوفية عبد الرزاق",Comment:"جاب ربي ملقحين و استفحلت الكورونا هاو ظهر حكاية فارغة زيد الواحد حتى من مناعتو طاحت بالتلقيح",Output:1},
    {id:29,Name:"Raouf Sallem",Comment:"مخططهم الى الفشل باذن الله",Output:0},
    {id:30,Name:"Zi Ed",Comment:"رة نيك انت والتلقيح والبروتوكول الخراوي",Output:0},
    {id:31,Name:"Yakoub Haroun",Comment:"منيش ملقحة",Output:0},
    {id:32,Name:"Camelia Ayahia Eps Harrath",Comment:"قلتو لقحو باش مينتشرش الكورونا ونحو ااكمامة زنعيشو طبيعي معظم الناس لقحت وين ااوقاية",Output:1}
    

   
  
  
  
  ];

    return(
        <DataGrid
          style={{ fontSize: 20  }}
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          rowCount={data.length}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          
        />








    );

};
export default Dashcom;
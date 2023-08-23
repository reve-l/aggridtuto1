//import logo from './logo.svg';

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component


import YearFilter from './YearFilter';


import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS


function Athlete() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row


  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([

            {field: 'athlete'},     //, checkboxSelection:true

            {
                field: 'age',
                filter:YearFilter,
                filterParams: {
                    title: 'Filtrer par âge',
                    values: [18,19,20,21]
                },
                floatingFilter:true   
            },        //, tooltipField:"name" 

            {field: 'country'},

            {
                field: 'year',
                filter:YearFilter,
                filterParams: {
                    title: 'Filtrer par an',
                    values: [2000,2004,2006]
                },
                floatingFilter : true
            },     //, checkboxSelection:true
            {field: 'date'},
            {field: 'sport'},
            {field: 'gold'},     //, checkboxSelection:true
            {field: 'silver'},
            {field: 'bronze'},
            {field: 'total'}

  ]);




  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    sortable: true    //trier par ordre croissant ou décroissant...
    ,filter: true   // recherche ou filtre dans chaque colonne en fonction d'un string
    //,filter: 'agTextColumnFilter'
  }));



  // Example load data from server
  useEffect(() => {
    //fetch('https://www.ag-grid.com/example-assets/row-data.json')
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);



    const filterState = useRef();




    const onBtnSave = useCallback( () => {
        filterState.current=gridRef.current.api.getFilterModel(
            console.log('saving',filterState.current)
        ) 
    });

    const onBtnRestore = useCallback( ()=> {
        console.log('restoring',filterState.current);
        gridRef.current.api.setFilterModel(filterState.current);
    });




    //impression
    var print='';
    const setPrinterFriendly = (api) => {
        const eGridDiv = document.querySelector('#myGrid');
        eGridDiv.style.width = '';
        eGridDiv.style.height = '';
        api.setDomLayout('print');
      };
      
      const setNormal = (api) => {
        const eGridDiv = document.querySelector('#myGrid');
        eGridDiv.style.width = '700px';
        eGridDiv.style.height = '200px';
        api.setDomLayout();
      };

    
      const onBtPrint = useCallback(() => {
        const api = gridRef.current.api;
        setPrinterFriendly(api);
        setTimeout(function () {
          print();
          setNormal(api);
        }, 2000);
      }, []);

      
      /*
      function setPrinterFriendly(api) {
        const eGridDiv = document.querySelector<HTMLElement>('#myGrid');
        eGridDiv.style.height = '';
        api.setDomLayout('print');
        };
        function setNormal(api) {
        const eGridDiv = document.querySelector<HTMLElement>('#myGrid');
        eGridDiv.style.width = '1100px';
        eGridDiv.style.height = '500px';
        api.setDomLayout(null);
        };

        const onBtnPrint = () => {
            const api = gridApi;
            setPrinterFriendly(api);
            setTimeout(function () {
             print();
             setNormal(api);
            }, 2000);
           };

*/





  return (
    <div className="App-box-s">

        <h1>GESTION DES ATHLETES TUTO2</h1>

        
        <div>  
          <button onClick={onBtPrint}>Print</button>                  
          <button onClick={onBtnSave}>Save</button>
          <button onClick={onBtnRestore}>Restore</button>
        </div>


        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-balham" style={{width: '95%', height: 500}} id="myGrid">

          <AgGridReact

              ref={gridRef} // Ref for accessing Grid's API

              rowData={rowData} // Row Data for Rows

              columnDefs={columnDefs} // Column Defs for Columns

              defaultColDef={defaultColDef} // Default Column Properties

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted

              rowSelection='multiple' // Options - allows click selection of rows

          />

        </div>
    </div>
  );


}

export default Athlete;

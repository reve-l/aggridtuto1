//import logo from './logo.svg';
//import './App.css';

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

//import 'ag-grid-enterprise';



import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS











function Grouping2() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row


  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([

    {field: 'country', rowGroup:true, hide:true},       //,rowGroup:true pour grouper les lignes...,hide:true pour cacher la colonne
    {field: 'athlete', rowGroup:true, hide:true},     //, checkboxSelection:true,rowGroup:true,,hide:true
    {field: 'age'},                         //, tooltipField:"name" 
    {field: 'year'},
    {field: 'date'},
    {field: 'sport'},
    {field: 'gold'},     //, checkboxSelection:true
    {field: 'silver'},
    {field: 'bronze'},
    {field: 'total'}

]);




  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    //sortable: true    //trier par ordre croissant ou décroissant...
    filter: true,   // recherche ou filtre dans chaque colonne en fonction d'un string
    resizable:true,
    sortable: true,
    flex: 1
    //minWidth: 0
    
  }));




  const autoGroupColumnDef = useMemo(() => {
    return {
        flex:1,
      /*
            minWidth: 0,
                headerName: 'PAYS',
                cellRendererParams: {
                    suppressCount: true,
                    checkbox: true,
                },
                filterValueGetter: (params) => {
                    if (params.node) {
                    var colGettingGrouped = params.colDef.showRowGroup + '';
                    return params.api.getValue(colGettingGrouped, params.node);
                    }
                },
        */
    };
  }, []);





  // Example load data from server
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    //.then(response => response.json())
    //.then(data=>{
      //  gridOptions.api.setRowData(data);
    //})
    .then(rowData => setRowData(rowData))
  }, []);

  //const enableCharts = true;
  //const enableRangeSelection = true;






  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);





  return (
    <div className="App-box">
        <h1>PRESENTATION 6</h1>
        <span>SINGLE GROUP COLUMNS</span>


        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{width: '95vw', height: 500}}>

          <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API

              rowData={rowData} // Row Data for Rows

              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties    defaultColDef={defaultColDef}

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted

              //enableCharts={enableCharts}
              //enableRangeSelection={enableRangeSelection}

              autoGroupColumnDef={autoGroupColumnDef}
              //groupHideOpenParents={true}

              onGridReady={onGridReady}
              groupDisplayType={'singleColumn'}
          />

        </div>
        <Link to="/" className="mt-3"> ACCUEIL</Link>

    </div>
  );


}

export default Grouping2;

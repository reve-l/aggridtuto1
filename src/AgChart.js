//import logo from './logo.svg';
//import './App.css';

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-enterprise';



import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS



// Import minimal modules required for charts
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { GridChartsModule } from "@ag-grid-enterprise/charts";










const Mycomp = (params) =>{
    const imageUrl="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif";
    const imgStyle={with:40, left:0, top:0, position: 'absolute'};
    const style = {marginLeft:20};
    return(
        <span style={style}>
            <img src={imageUrl} style={imgStyle} />
            {params.value}
        </span>
    );

}


function AgChart() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row


  // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        {headerName: 'MAKE',field: 'make', editable:true},     //, checkboxSelection:true
        {headerName: 'MODEL',field: 'model', editable:true},
        {headerName: 'PRICE fcfa',field: 'price'} //field: 'price', valueFormatter: '"$" + value.toLocaleString()'

    ]);




  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    sortable: true    //trier par ordre croissant ou décroissant...
    ,filter: true   // recherche ou filtre dans chaque colonne en fonction d'un string
    
  }));






  // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);


  // Example load data from server
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);


  // Example using Grid's API
  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);


    const enableCharts = true;
    const enableRangeSelection = true;


  return (
    <div className="App-box">
        <h1>PRESENTATION 4</h1>
        <span>création des charts par selection</span>


        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{width: '45vw', height: 500}}>

          <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API

              rowData={rowData} // Row Data for Rows

              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted

              enableCharts={enableCharts}
              enableRangeSelection={enableRangeSelection}
          />

        </div>
        <Link to="/" className="mt-3"> ACCUEIL</Link>
    </div>
  );


}

export default AgChart;

//import logo from './logo.svg';
//import './App.css';

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS





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


function Car() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row


  // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        {headerName: 'MAKE',field: 'make', editable:true, checkboxSelection:true},     //, checkboxSelection:true
        {headerName: 'MODEL',field: 'model', editable:true},
        {headerName: 'PRICE fcfa',field: 'price'} //field: 'price', valueFormatter: '"$" + value.toLocaleString()'

    ]);




  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    sortable: true    //trier par ordre croissant ou décroissant...
    ,filter: true   // recherche ou filtre dans chaque colonne en fonction d'un string
    //,filter: 'agTextColumnFilter'
  }));


  // if we had column groups, we could provide default group items here
  //const defaultColGroupDef = {};


  // define a column type (you can define as many as you like)
  //const columnTypes = {
    //  nonEditableColumn: { editable: false },
      //dateColumn: {
        //  filter: 'agDateColumnFilter',
          //filterParams: { comparator: myDateComparator },
          //suppressMenu: true
      //}
  //};





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




  return (
    <div className="App-box">
<h1>PRESENTATION 1</h1>

        {/* Example using Grid's API */}
        <button onClick={buttonListener} className='mb-3'>Déselection</button><br/>

        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{width: '45vw', height: 500}}>

          <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API

              rowData={rowData} // Row Data for Rows

              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection='multiple' // Options - allows click selection of rows

              onCellClicked={cellClickedListener} // Optional - registering for Grid Event

              //columnTypes={columnTypes} // define a column type (you can define as many as you like)

              enableBrowserTooltips={true} //afficher un texte au hover...
              tooltipShowDelay={{tooltipShowDelay:2}}
          />

        </div>
        <Link to="/"> ACCUEIL</Link>
    </div>
  );


}

export default Car;

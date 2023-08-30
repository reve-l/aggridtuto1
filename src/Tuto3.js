//import logo from './logo.svg';

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise';


//import YearFilter from './YearFilter';


import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import { AgInputTextField } from 'ag-grid-community';


function Tuto3() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row


  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([

            {field:'athlete',filter:'agTextColumnFilter'},     //, checkboxSelection:true

            {
                field: 'age'
                //filter:YearFilter,
                //filterParams: {
                  //  title: 'Filtrer par âge',
                    //values: [18,19,20,21]
               // },
                //floatingFilter:true   
            },        //, tooltipField:"name" 

            {field: 'country'},

            {
                field: 'year',
                filter: 'agMultiColumnFilter'
                //filter:YearFilter,
                //filterParams: {
                  //  title: 'Filtrer par an',
                    //values: [2000,2004,2006]
                //},
                //floatingFilter : true
            },     //, checkboxSelection:true
            
            { 
                field:'date',
                filter:'agDateColumnFilter',
                filterParams: {
                  comparator: (dateFromFilter, cellValue)=> {
                        if (cellValue == null){return 0;}

                        const dateParts = cellValue.split('/');
                        const day = Number(dateParts[0]);
                        const month = Number(dateParts[1])-1;
                        const year = Number(dateParts[2]);
                        const cellDate = new Date(year,month,day)

                        if(cellDate < dateFromFilter){
                            return -1;
                        }else if(cellDate > dateFromFilter){
                            return 1;
                        }
                        return 0;

                  }
               
                },
             },

            {
                field: 'sport',
                filter: 'agSetColumnFilter'
            },

            {field: 'gold'},     //, checkboxSelection:true

            {field: 'silver'},

            {field: 'bronze'},

            {field: 'total'}

  ]);




  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    flex:1,
    debounceMs:0,
    floatingFilter : true
    //filterParams: {
      //  debounceMs:0,    //temps d'affichage pendant la recherche
        //buttons: ['apply','reset']     //['apply','clear','cancel','reset']
    //},
  }));



  // Example load data from server
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);



    const savedFilterState = useRef();


    
    const onBtnSave = useCallback( () => {
        //filterState.current=gridRef.current.api.getFilterModel(
          //  console.log('saving',filterState.current)
        //)
        const filterModel =  gridRef.current.api.getFilterModel();
        savedFilterState.current = filterModel ;
    },[]);

    const onBtnApply = useCallback( ()=> {
        //console.log('restoring',filterState.current);
        //gridRef.current.api.setFilterModel(filterState.current);
        const filterModel = savedFilterState.current;
        gridRef.current.api.setFilterModel(filterModel);
    },[]);

    







  return (
    <div className="App-box-s">

        <h1>PRESENTATION 3</h1>
        <h4>selection - tri - champ de filtre avec saisie - save - restore</h4>

        
            <div>  
            {/**<button onClick={onBtPrint}>Print</button>  */}                 
            <button onClick={onBtnSave}>Save</button>
            <button onClick={onBtnApply}>Apply</button>
            </div>
        



        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-balham" style={{width: '95%', height: 500}} id="">

          <AgGridReact

              ref={gridRef} // Ref for accessing Grid's API

              rowData={rowData} // Row Data for Rows

              columnDefs={columnDefs} // Column Defs for Columns

              defaultColDef={defaultColDef} // Default Column Properties

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted

              rowSelection='multiple' // Options - allows click selection of rows

          />

        </div>
        <Link to="/" className="mt-3"> ACCUEIL</Link>

    </div>
  );


}

export default Tuto3;

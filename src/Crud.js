//import { useState } from 'react';
import './Crud.css';
import make from './images/pagekame.jpg';

import { Link } from 'react-router-dom';

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

//import Button from '@material-ui/core/Button';
//import { Button } from '@material-ui/core';
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
//import Button from '@material-ui/core/Button';

import Button from '@mui/material/Button';
import FormDialog from './dialogs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';






function Crud (){

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [gridApi,setGridApi]=useState(null);
    const [tableData,setTableData]=useState(null);
    const url="http://localhost:4000/posts";




    const [open, setOpen] = React.useState(false);
    const initialValue = {title:"", author:""};
    const [formData, setFormData] = useState(initialValue);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onChange=(e)=>{
      const {value,id}=e.target;
      setFormData({...formData,[id]:value});
      //console.log(value,id); 
    };

    const handleFormSubmit = () => {

      if(formData.id){
        const confirm=window.confirm("VOULEZ-VOUS VRAIMENT MODIFIER CETTE LIGNE????");

          confirm && fetch(url+`/${formData.id}`,
            {method:"PUT", body:JSON.stringify(formData), headers:{'content-type':"application/json"}}
          )
          .then(response => response.json())
          .then(response =>{
            handleClose()
            getUsers()
          }
          ) 
      }else{
            fetch(url,
              {method:"POST", body:JSON.stringify(formData), headers:{'content-type':"application/json"}}
            )
            .then(response => response.json())
            .then(response =>{
              handleClose()
              getUsers()
              setFormData(initialValue)}
            ) 
      }


    };

    const handleDelete = (id) => {
      const confirm=window.confirm("SUPPRIMER????",id)
      if(confirm){
          fetch(url+`/${id}`,
          {method:"DELETE"})
          .then(response => response.json())
          .then(response =>{getUsers()}
      )
      }
    };


    const handleUpdate = (data) => {
      //console.log(data);
      setFormData(data);
      handleClickOpen();
      /*const confirm=window.confirm("SUPPRIMER????",id)
      if(confirm){
          fetch(url+`/${id}`,
          {method:"DELETE"})
          .then(response => response.json())
          .then(response =>{getUsers()}
      )
      }*/
    };

    const ButtonActions = (props) => {
      /*const invokeParentMethod = () => {
        props.context.methodFromParent(
          `Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`
        );
      };*/
    
      return (
        <span className='action-col'>
          <Button
            //style={{ height: 20, lineHeight: 0.5 }}
            onClick={() =>handleDelete(props.value)}
            //className="btn btn-info"
          >
            <DeleteForeverIcon />
          </Button>
          <Button
            //style={{ height: 20, lineHeight: 0.5 }}
            //onClick={() =>handleUpdate(props.value)}
            //className="btn btn-info"
            onClick={() =>handleUpdate(props.data)}
          >
            <EditIcon />
          </Button>
        </span>
      );
    };





  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'id',field: 'id'},     //, checkboxSelection:true
    {headerName: 'title',field: 'title', editable:true},
    {headerName: 'author',field: 'author', editable:true}, //field: 'price', valueFormatter: '"$" + value.toLocaleString()'
    {headerName: 'actions',field: 'id',
        cellRenderer: ButtonActions,
        colId: 'params',
        editable: false,
        //minWidth: 50, 
    }
]);




  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    //sortable: true    //trier par ordre croissant ou décroissant...
    filter: true,   // recherche  dans chaque colonne en fonction d'un string
    resizable:true,
    sortable: true,     // filtre par ordre croissant ou decroissant
    floatingFilter:true,
    flex: 1,
    minWidth: 50
    
  }));




  const autoGroupColumnDef = useMemo(() => {
    return {
        flex:1
    };
  }, []);







  // Example load data from server
  useEffect(() => {
    getUsers();
    //fetch('http://localhost:4000/posts')
    //.then(result => result.json())
    //.then(response => response.json())
    //.then(data=>{
      //  gridOptions.api.setRowData(data);
    //})
    //.then(rowData => setRowData(rowData))
  }, []);
  const getUsers=()=>{
    fetch(url)
    .then(response => response.json())
    .then(response => setTableData(response))
  }


  const onGridReady = useCallback((params) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setTableData(data));
  }, []);




    return (
        <>
        <div className='crud'>

        {/*
        <h1>TUTO EN COURS...</h1>
        <img src={make} className='img-miss' />
        */}

        <Button variant="contained" onClick={handleClickOpen}>nouveau</Button>                 {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
         <div className="ag-theme-alpine" style={{width: '95vw', height: 500}}>

            <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API

                rowData={tableData} // Row Data for Rows

                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties    defaultColDef={defaultColDef}

                animateRows={true} // Optional - set to 'true' to have rows animate when sorted

                //enableCharts={enableCharts}
                //enableRangeSelection={enableRangeSelection}

                autoGroupColumnDef={autoGroupColumnDef}
                //groupHideOpenParents={true}

                onGridReady={onGridReady}
                groupDisplayType={'custom'}//{'singleColumn'}{'groupRows'}

                //groupRowRendererParams={groupRowRendererParams}

                rowGroupPanelShow={'always'}

                groupDefaultExpanded={1}

                //columnTypes={columnTypes}
                
                pagination={true}
                paginationPageSize={10}
                //paginationAutoPageSize={true}

            />

            </div>
        
        <Button variant="contained" color="success">
            <Link to="/" className="mt-3"> ACCUEIL</Link>
        </Button>
      </div>
      <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </>
    )
}
export default Crud;
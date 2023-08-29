//import logo from './logo.svg';
//import './App.css';

import './style4.css';







import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

//import 'ag-grid-enterprise';



import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS


import GroupRowInnerRenderer from './GroupRowInnerRenderer.jsx';








function Grouping5() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  //const [gridApi, setGridApi] = useState(null);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([

    {       
        headerName: 'Country',
        colId: 'countryGroup',
        showRowGroup: 'country',
        minWidth: 200,
        cellRenderer: 'agGroupCellRenderer',
        filterValueGetter: (params) => {
            return params.data ? params.data.country : null;
        }

    },       //,rowGroup:true pour grouper les lignes...,hide:true pour cacher la colonne
    
    { field: 'country', rowGroup: true, hide: true },

    {
        headerName: 'Athlete / Age',
        colId: 'athleteAgeGroup',
        minWidth: 220,
        showRowGroup: 'athlete',
        cellRenderer: 'agGroupCellRenderer',
        valueGetter: 'data ? data.age : null',
      },

    {field: 'athlete', rowGroup:true, hide:true},     //, checkboxSelection:true,rowGroup:true,,hide:true
    
    //{field:
        // 'age'
         /**
          * minWidth: 250,
            cellRenderer: (params) => {
                return <span style={{ marginLeft: 60 }}>{params.value}</span>;
            },
          */
    //},                         //, tooltipField:"name" 
    {field: 'year'},
    {field: 'date'},
    {field: 'sport'},
    {field: 'gold', type: 'number'}, //, checkboxSelection:true
    {field: 'silver', type: 'number' },
    {field: 'bronze', type: 'number' },
    {field: 'total'}

]);




  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    //sortable: true    //trier par ordre croissant ou décroissant...
    filter: true,   // recherche  dans chaque colonne en fonction d'un string
    resizable:true,
    sortable: true,     // filtre par ordre croissant ou decroissant
    flex: 1,
    minWidth: 100
    
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
      .then((resp) => {
        resp.json()
         //params.api.paginationGoToPage(10)
      })
      .then((data) => setRowData(data));
  }, []);


/*
  const groupRowRendererParams = {
    // puts a checkbox onto each group row
    //checkbox: true,
    // puts a row dragger onto each group row
    rowDrag: true
};
*/


const columnTypes = useMemo(() => {
    return {
      number: {
        //editable: true,
        // editing works with strings, need to change string to number
        valueParser: (params) => {
          return parseInt(params.newValue);
        },
        aggFunc: 'sum',
      },
    };
  }, []);






  const groupRowRendererParams = useMemo(() => {
    return {
      innerRenderer: GroupRowInnerRenderer,
      suppressCount: true,
      rowDrag: true,
      flagCodes: {
        Andorra: 'ad',
        'United Arab Emirates': 'ae',
        Afghanistan: 'af',
        'Antigua and Barbuda': 'ag',
        Anguilla: 'ai',
        Albania: 'al',
        Armenia: 'am',
        Angola: 'ao',
        Antarctica: 'aq',
        Argentina: 'ar',
        'American Samoa': 'as',
        Austria: 'at',
        Australia: 'au',
        Aruba: 'aw',
        'Åland Islands': 'ax',
        Azerbaijan: 'az',
        'Bosnia and Herzegovina': 'ba',
        Barbados: 'bb',
        Bangladesh: 'bd',
        Belgium: 'be',
        'Burkina Faso': 'bf',
        Bulgaria: 'bg',
        Bahrain: 'bh',
        Burundi: 'bi',
        Benin: 'bj',
        'Saint Barthélemy': 'bl',
        Bermuda: 'bm',
        Brunei: 'bn',
        Bolivia: 'bo',
        'Caribbean Netherlands': 'bq',
        Brazil: 'br',
        Bahamas: 'bs',
        Bhutan: 'bt',
        'Bouvet Island': 'bv',
        Botswana: 'bw',
        Belarus: 'by',
        Belize: 'bz',
        Canada: 'ca',
        'Cocos (Keeling) Islands': 'cc',
        'DR Congo': 'cd',
        'Central African Republic': 'cf',
        'Republic of the Congo': 'cg',
        Switzerland: 'ch',
        "Côte d'Ivoire (Ivory Coast)": 'ci',
        'Cook Islands': 'ck',
        Chile: 'cl',
        Cameroon: 'cm',
        China: 'cn',
        Colombia: 'co',
        'Costa Rica': 'cr',
        Cuba: 'cu',
        'Cape Verde': 'cv',
        Curaçao: 'cw',
        'Christmas Island': 'cx',
        Cyprus: 'cy',
        'Czech Republic': 'cz',
        Germany: 'de',
        Djibouti: 'dj',
        Denmark: 'dk',
        Dominica: 'dm',
        'Dominican Republic': 'do',
        Algeria: 'dz',
        Ecuador: 'ec',
        Estonia: 'ee',
        Egypt: 'eg',
        'Western Sahara': 'eh',
        Eritrea: 'er',
        Spain: 'es',
        Ethiopia: 'et',
        Finland: 'fi',
        Fiji: 'fj',
        'Falkland Islands': 'fk',
        Micronesia: 'fm',
        'Faroe Islands': 'fo',
        France: 'fr',
        Gabon: 'ga',
        'Great Britain': 'gb',
        Grenada: 'gd',
        Georgia: 'ge',
        'French Guiana': 'gf',
        Guernsey: 'gg',
        Ghana: 'gh',
        Gibraltar: 'gi',
        Greenland: 'gl',
        Gambia: 'gm',
        Guinea: 'gn',
        Guadeloupe: 'gp',
        'Equatorial Guinea': 'gq',
        Greece: 'gr',
        'South Georgia': 'gs',
        Guatemala: 'gt',
        Guam: 'gu',
        'Guinea-Bissau': 'gw',
        Guyana: 'gy',
        'Hong Kong': 'hk',
        'Heard Island and McDonald Islands': 'hm',
        Honduras: 'hn',
        Croatia: 'hr',
        Haiti: 'ht',
        Hungary: 'hu',
        Indonesia: 'id',
        Ireland: 'ie',
        Israel: 'il',
        'Isle of Man': 'im',
        India: 'in',
        'British Indian Ocean Territory': 'io',
        Iraq: 'iq',
        Iran: 'ir',
        Iceland: 'is',
        Italy: 'it',
        Jersey: 'je',
        Jamaica: 'jm',
        Jordan: 'jo',
        Japan: 'jp',
        Kenya: 'ke',
        Kyrgyzstan: 'kg',
        Cambodia: 'kh',
        Kiribati: 'ki',
        Comoros: 'km',
        'Saint Kitts and Nevis': 'kn',
        'North Korea': 'kp',
        'South Korea': 'kr',
        Kuwait: 'kw',
        'Cayman Islands': 'ky',
        Kazakhstan: 'kz',
        Laos: 'la',
        Lebanon: 'lb',
        'Saint Lucia': 'lc',
        Liechtenstein: 'li',
        'Sri Lanka': 'lk',
        Liberia: 'lr',
        Lesotho: 'ls',
        Lithuania: 'lt',
        Luxembourg: 'lu',
        Latvia: 'lv',
        Libya: 'ly',
        Morocco: 'ma',
        Monaco: 'mc',
        Moldova: 'md',
        Montenegro: 'me',
        'Saint Martin': 'mf',
        Madagascar: 'mg',
        'Marshall Islands': 'mh',
        Macedonia: 'mk',
        Mali: 'ml',
        Myanmar: 'mm',
        Mongolia: 'mn',
        Macau: 'mo',
        'Northern Mariana Islands': 'mp',
        Martinique: 'mq',
        Mauritania: 'mr',
        Montserrat: 'ms',
        Malta: 'mt',
        Mauritius: 'mu',
        Maldives: 'mv',
        Malawi: 'mw',
        Mexico: 'mx',
        Malaysia: 'my',
        Mozambique: 'mz',
        Namibia: 'na',
        'New Caledonia': 'nc',
        Niger: 'ne',
        'Norfolk Island': 'nf',
        Nigeria: 'ng',
        Nicaragua: 'ni',
        Netherlands: 'nl',
        Norway: 'no',
        Nepal: 'np',
        Nauru: 'nr',
        Niue: 'nu',
        'New Zealand': 'nz',
        Oman: 'om',
        Panama: 'pa',
        Peru: 'pe',
        'French Polynesia': 'pf',
        'Papua New Guinea': 'pg',
        Philippines: 'ph',
        Pakistan: 'pk',
        Poland: 'pl',
        'Saint Pierre and Miquelon': 'pm',
        'Pitcairn Islands': 'pn',
        'Puerto Rico': 'pr',
        Palestine: 'ps',
        Portugal: 'pt',
        Palau: 'pw',
        Paraguay: 'py',
        Qatar: 'qa',
        Réunion: 're',
        Romania: 'ro',
        Serbia: 'rs',
        Russia: 'ru',
        Rwanda: 'rw',
        'Saudi Arabia': 'sa',
        'Solomon Islands': 'sb',
        Seychelles: 'sc',
        Sudan: 'sd',
        Sweden: 'se',
        Singapore: 'sg',
        'Saint Helena, Ascension and Tristan da Cunha': 'sh',
        Slovenia: 'si',
        'Svalbard and Jan Mayen': 'sj',
        Slovakia: 'sk',
        'Sierra Leone': 'sl',
        'San Marino': 'sm',
        Senegal: 'sn',
        Somalia: 'so',
        Suriname: 'sr',
        'South Sudan': 'ss',
        'São Tomé and Príncipe': 'st',
        'El Salvador': 'sv',
        'Sint Maarten': 'sx',
        Syria: 'sy',
        'Eswatini (Swaziland)': 'sz',
        'Turks and Caicos Islands': 'tc',
        Chad: 'td',
        'French Southern and Antarctic Lands': 'tf',
        Togo: 'tg',
        Thailand: 'th',
        Tajikistan: 'tj',
        Tokelau: 'tk',
        'Timor-Leste': 'tl',
        Turkmenistan: 'tm',
        Tunisia: 'tn',
        Tonga: 'to',
        Turkey: 'tr',
        'Trinidad and Tobago': 'tt',
        Tuvalu: 'tv',
        'Chinese Taipei': 'tw',
        Taiwan: 'tw',
        Tanzania: 'tz',
        Ukraine: 'ua',
        Uganda: 'ug',
        'United States Minor Outlying Islands': 'um',
        'United States': 'us',
        Uruguay: 'uy',
        Uzbekistan: 'uz',
        'Vatican City (Holy See)': 'va',
        'Saint Vincent and the Grenadines': 'vc',
        Venezuela: 've',
        'British Virgin Islands': 'vg',
        'United States Virgin Islands': 'vi',
        Vietnam: 'vn',
        Vanuatu: 'vu',
        'Wallis and Futuna': 'wf',
        Samoa: 'ws',
        Kosovo: 'xk',
        Yemen: 'ye',
        Mayotte: 'yt',
        'South Africa': 'za',
        Zambia: 'zm',
        Zimbabwe: 'zw',
      },
    };
  }, []);


{/**
const onPaginationChange=(pageSize)=>{
  gridApi.api.paginationSetPageSize(pageSize)
}
*/}



  return (
    <div className="App-box">
        <h1>PRESENTATION 8</h1>
        <span>ROW GROUPING - GROUP ROWS - PAGINATION</span>

        



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
              groupDisplayType={'custom'}//{'singleColumn'}{'groupRows'}

              //groupRowRendererParams={groupRowRendererParams}

              rowGroupPanelShow={'always'}

              groupDefaultExpanded={1}

              //columnTypes={columnTypes}
              
              pagination={true}
              paginationPageSize={5}
              //paginationAutoPageSize={true}

          />

        </div>
        <Link to="/" className="mt-3"> ACCUEIL</Link>
        
        
        {/**
         * 
                 <select onChange={(e)=>onPaginationChange(e.target.value)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="14">14</option>

        </select>
         */}


    </div>
  );


}

export default Grouping5;

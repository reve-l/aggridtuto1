//import logo from './logo.svg';
//import './App.css';

import './Styles7.css';







import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { AgChartsReact } from 'ag-charts-react';

import 'ag-grid-enterprise';


import myInnerRendererSubTot from './myInnerRendererSubTot.jsx';


import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS


import GroupRowInnerRenderer from './GroupRowInnerRenderer.jsx';








function Grouping10() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row


  const numberValueParser = (params) => {
    var res = Number.parseInt(params.newValue);
    if (isNaN(res)) {
      return undefined;
    }
    return res;
  };


  const COUNTRY_CODES = {
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
};


function countryCellRenderer(params) {
    if (params.value === undefined || params.value === null) {
      return null;
    } else {
      return (
        <React.Fragment>
          <img
            border="0"
            width="15"
            height="10"
            src={`https://flagcdn.com/h20/${COUNTRY_CODES[params.value]}.png`}
          />
          <span className='ml-5 bg-dark text-red coltest'>{params.value}</span>
        </React.Fragment>
      );
    }
  }




/**
 * 
 * 
 const COUNTRY_CODES = {
  Ireland: 'ie',
  'United Kingdom': 'gb',
  USA: 'us',
};

function numberParser(params) {
  return parseInt(params.newValue);
}



function cityCellRenderer(params) {
  if (params.value === undefined || params.value === null) {
    return null;
  } else {
    return (
      <React.Fragment>
        <img
          border="0"
          height="10"
          src="https://www.ag-grid.com/example-assets/weather/sun.png"
          width="15"
        />
        {params.value}
      </React.Fragment>
    );
  }
}
 * 
 */






//var chartId;

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([

    {       
        headerName: 'Country',
        colId: 'countryGroup',
        showRowGroup: 'country',
        minWidth: 100,
        cellRenderer: 'agGroupCellRenderer',
        filterValueGetter: (params) => {
            return params.data ? params.data.country:null;
        }

    },       //,rowGroup:true pour grouper les lignes...,hide:true pour cacher la colonne
    



    { field: 'country', rowGroup: true, hide: true,cellRenderer: countryCellRenderer, chartDataType: 'category' },

    {
        headerName: 'Athlete / Age',
        colId: 'athleteAgeGroup',
        minWidth: 100,
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
    {field: 'year'},                    //valueFormatter: "'$' + value.toLocaleString()",
    {field: 'date'},
    {field: 'sport'},
    {field: 'gold', type: 'number', aggFunc: 'sum', chartDataType: 'series',valueParser: numberValueParser,}, //, checkboxSelection:true
    {field: 'silver', type: 'number', aggFunc: 'sum' , chartDataType: 'series' },         /** , aggFunc: 'sum' AJOUTE POUR LE SUBTOTAL */
    {field: 'bronze', type: 'number', aggFunc: 'sum', chartDataType: 'series'  },      //, type: 'numberValue' 
    {field: 'total',aggFunc: 'sum'}

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

        /**AJOUT POUR LE SUBTOTAL */
        cellRendererParams: {
            footerValueGetter: (params) => {
              const isRootLevel = params.node.level === -1;
              if (isRootLevel) {
                return 'Grand Total';
              }
              return `Sub Total (${params.value})`;
            },
          }
     
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


/*
  const groupRowRendererParams = {
    // puts a checkbox onto each group row
    //checkbox: true,
    // puts a row dragger onto each group row
    rowDrag: true
};
*/






/**
 * DEBUT POUR CHARTS
 * 
 * 
 * 
 */
/*
const updateTitle = (api, chartId) => {
    const cellRange = api.getCellRanges()[1];
    if (!cellRange) return;
    const columnCount = cellRange.columns.length;
    const rowCount = cellRange.endRow.rowIndex - cellRange.startRow.rowIndex + 1;
    const subtitle = `Using series data from ${columnCount} column(s) and ${rowCount} row(s)`;
    api.updateChart({
      type: 'rangeChartUpdate',
      chartId: chartId,
      chartThemeOverrides: {
        common: {
          subtitle: { text: subtitle },
        },
      },
    });
  };
*/

const chartToolPanelsDef = useMemo(() => {
    return {
      panels: [],
    };
  }, []);
const popupParent = useMemo(() => {
    return document.body;
  }, []);


  /*const chartThemeOverrides = useMemo(() => {
    return {
      common: {
        title: { enabled: true, text: 'Medaille par Pays' },
        subtitle: { enabled: true },
        legend: { enabled: true },
      },
    };
  }, []);*/


/*const onFirstDataRendered = useCallback((params) => {
    const createRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 5,
        columns: ['country', 'gold','silver','bronze'],
      },
      chartType: 'stackedColumn',
      chartContainer: document.querySelector('#myChart'),
    };
    gridRef.current.api.createRangeChart(createRangeChartParams);
  }, []);*/


  /*
  const onFirstDataRendered = useCallback((params) => {
    var createRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['age', 'gold', 'silver', 'bronze'],
      },
      chartType: 'groupedColumn',
      chartContainer: document.querySelector('#myChart'),
      aggFunc: 'sum',
    };
    gridRef.current.api.createRangeChart(createRangeChartParams);
  }, []);
*/








const onFirstDataRendered = useCallback((event) => {

    /*
    var eContainer1 = document.querySelector('#chart1');
    var params1 = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 9,
        columns: ['country', 'gold', 'silver', 'bronze'],
      },
      chartType: 'groupedBar',
      chartContainer: eContainer1,
    };
    event.api.createRangeChart(params1);
*/

    var eContainer2 = document.querySelector('#chart2');
    var params2 = {
      cellRange: {
        columns: ['gold', 'silver', 'bronze'],
      },
      chartType: 'pie',
      chartContainer: eContainer2,
      aggFunc: 'sum',
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          },
          legend: {
            position: 'right',
          },
        },
      },
    };
    event.api.createRangeChart(params2);

/*LES 2 AUTRES ACHARTS ...
    var eContainer3 = document.querySelector('#chart3');
    var params3 = {
      cellRange: {
        columns: ['group', 'silver'],
      },
      chartType: 'pie',
      chartContainer: eContainer3,
      aggFunc: 'sum',
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          },
          legend: {
            position: 'right',
          },
        },
      },
    };
    event.api.createRangeChart(params3);*/

  }, []);

  const getChartToolbarItems = useCallback((params) => {
    return [];
  }, []);









/*
  const onChartCreated = useCallback((event) => {
    console.log('Created chart with ID ' + event.chartId);
    updateTitle(gridRef.current.api, event.chartId);
  }, []);
*/
/*
  const onChartRangeSelectionChanged = useCallback((event) => {
    console.log('Changed range selection of chart with ID ' + event.chartId);
    updateTitle(gridRef.current.api, event.chartId);
  }, []);*/
 /* 
 * FIN POUR CHARTS
 */














  return (
    <div 
    className="App-box">

        <h1 className='titleP text-center'>PRESENTATION 13</h1>
        <span className='text-center'>CHARTS</span>

        <div className='chart-content'>
        {/*<button onClick={onBtPrint}>Print</button>*/}
            <div className='chart-content-f'>
                <div  className="ag-theme-alpine" id="chart2"></div>
            </div>


        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{width: '95vw', height: 500}} id="myGrid">

          <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API

              rowData={rowData} // Row Data for Rows

              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties    defaultColDef={defaultColDef}

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted

              //enableCharts={enableCharts}
              //enableRangeSelection={enableRangeSelection}

              //autoGroupColumnDef={autoGroupColumnDef}
              //groupHideOpenParents={true}

              onGridReady={onGridReady}
              groupDisplayType={'custom'}//{'singleColumn'}{'groupRows'}

              //groupRowRendererParams={groupRowRendererParams}

              rowGroupPanelShow={'always'}

              groupDefaultExpanded={1}

              //columnTypes={columnTypes}

              
              /**AJOUT 2 LIGNES POUR LE SUBTOTAL */
              groupIncludeFooter={true}
              groupIncludeTotalFooter={true}

              /**IMPRIMER */
             // onFirstDataRendered={onFirstDataRendered}

             //enableRangeSelection={true}
             chartToolPanelsDef={chartToolPanelsDef}
             popupParent={popupParent}
             getChartToolbarItems={getChartToolbarItems}
             onFirstDataRendered={onFirstDataRendered}

          />

        </div>
        </div>
        <Link to="/" className="mt-3"> ACCUEIL</Link>

    </div>
  );


}

export default Grouping10;

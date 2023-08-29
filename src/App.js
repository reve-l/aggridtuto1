//import logo from './logo.svg';
import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';

import { Link } from 'react-router-dom';




import Car from "./Car";
import Athlete from "./Athlete";
import Tuto3 from "./Tuto3";
import AgChart from "./AgChart";
import Grouping from "./Grouping";
import Grouping2 from "./Grouping2";
import Grouping3 from "./Grouping3";
import Grouping4 from "./Grouping4";
import Grouping5 from "./Grouping5";
import Grouping6 from "./Grouping6";
import Grouping7 from "./Grouping7";
import Grouping8 from "./Grouping8";
import Grouping9 from "./Grouping9";
import Grouping10 from "./Grouping10";


import Home from "./Home";
import Missing from "./Missing";






import 'ag-grid-enterprise';







function App() {

  return (
  <div>
      {/**    
        <Car/>
        <Athlete />
        <Tuto3 />
        <AgChart />
        <Grouping />
        <Grouping2 />
        <Grouping4 />
        <Grouping4 /
        <Grouping5 />
            <Grouping6 />
  <Grouping7 />
   <Grouping8 />
    <Grouping9 />
      <Grouping10 />
      */}

    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="presentation1" element={<Car />} />
          <Route path="presentation2" element={<Athlete />} />
          <Route path="presentation3" element={<Tuto3 />} />
          <Route path="presentation4" element={<AgChart />} />
          <Route path="presentation5" element={<Grouping />} />
          <Route path="presentation6" element={<Grouping2 />} />
          <Route path="presentation7" element={<Grouping4 />} />
          <Route path="presentation8" element={<Grouping5 />} />
          <Route path="presentation9" element={<Grouping6 />} />
          <Route path="presentation10" element={<Grouping7 />} />
          <Route path="presentation11" element={<Grouping8 />} />
          <Route path="presentation12" element={<Grouping9 />} />
          <Route path="presentation13" element={<Grouping10 />} />
          <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );


}

export default App;

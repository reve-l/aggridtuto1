 //import React, { Link} from 'react';

import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
 return (
    <main className=''>
        <h1>
            GRID REACT JS
        </h1>
        <h3>
            by  <span>REVEL</span>
        </h3>

        <div className="menu1">
            <ul style={{}}>
                <li><Link to="presentation1"> PRESENTATION 1</Link></li>
                <li><Link to="presentation2"> PRESENTATION 2</Link></li>
                <li><Link to="presentation3"> PRESENTATION 3</Link></li>
                <li><Link to="presentation4"> PRESENTATION 4</Link></li>
                <li><Link to="presentation5"> PRESENTATION 5</Link></li>
                <li><Link to="presentation6"> PRESENTATION 6</Link></li>
                <li><Link to="presentation7"> PRESENTATION 7</Link></li>

            </ul>
            <ul style={{}}>
            <li><Link to="presentation8"> PRESENTATION 8</Link></li>
            <li><Link to="presentation9"> PRESENTATION 9</Link></li>
            <li><Link to="presentation10"> PRESENTATION 10</Link></li>
            <li><Link to="presentation11"> PRESENTATION 11</Link></li>
            <li><Link to="presentation12"> PRESENTATION 12</Link></li>
            <li><Link to="presentation13"> PRESENTATION 13</Link></li>
            <li><Link to="presentation14"> PRESENTATION 14</Link></li>

            </ul>
        </div>
    </main>
    )
};
export default Home;
import './Missing.css';
import laugh from './images/laugh.png';

function Missing() {
    return (
        <>
            <h1>ERREUR DE ROUTE! TU CHERCHES MEME QUOI ICI</h1>
            <img src={laugh} className='img-miss' />
 
        </>
   );
}

export default Missing;
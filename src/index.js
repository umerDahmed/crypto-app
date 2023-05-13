import React from "react"; 
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import App from './App';
import CryptoContext from "./CryptoContext";
import 'react-alice-carousel/lib/alice-carousel.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CryptoContext>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </CryptoContext>
);
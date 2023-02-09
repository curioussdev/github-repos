import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../Pages/Main';
import Repo from '../Pages/Repo'

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Main />} />
                
            <Route path="/repositorio" element={<Repo />} />
                
            </Routes>
        </BrowserRouter>
    )
        
    
}
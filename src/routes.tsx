import React from "react";
import { BrowserRouter, Routes ,Route } from "react-router-dom";

import Landing from './screens/Landing';
import GaragesMap from './screens/GaragesMap';
import Garage from './screens/Garage';
import CreateGarage from './screens/CreateGarage';
import SearchGarage from './screens/SearchGarage';

function MyRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/app" element={<GaragesMap/>} />
                <Route path="/app/search" element={<SearchGarage/>} />

                <Route path="/garages/:id" element={<Garage/>} />
                <Route path="/garages/create" element={<CreateGarage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;
import Pages from "./pages/main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Notfound from "./pages/notfound";
import Welcome from "./pages/welcome";
import Test from "./pages/test";

export default function App() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Pages/>}>
                <Route index element={<Welcome/>}/>
                <Route path="Test" element={<Test/>}/>
                <Route path="*" element={<Notfound/>}/>
            </Route>
        </Routes>
    </BrowserRouter>)
}


import React, { Component } from 'react';
import {ReactQueryConfigProvider} from 'react-query';
import {LocaleProvider} from './context/locale';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from "./components/Navigation/index"

const queryConfig = {refetchAllOnWindowFocus: false};

const App = () => {
    return (
        <Router>
            <ReactQueryConfigProvider config={queryConfig}>
                <LocaleProvider>
                    <div className="text-gray-900 h-screen flex flex-col">
                        <Navigation />
                    </div>
                </LocaleProvider>
            </ReactQueryConfigProvider>
        </Router>
    );
};

export default App;
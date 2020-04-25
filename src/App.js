import React from 'react';
import {ReactQueryConfigProvider} from 'react-query';
import LandingPage from './LandingPage';
import {LocaleProvider} from './context/locale';

const queryConfig = {refetchAllOnWindowFocus: false};

const App = () => {
    return (
        <ReactQueryConfigProvider config={queryConfig}>
            <LocaleProvider>
                <div className="text-gray-900 h-screen flex flex-col">
                    <LandingPage />
                </div>
            </LocaleProvider>
        </ReactQueryConfigProvider>
    );
};

export default App;
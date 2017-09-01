import React from 'react';
import ReactDOM from 'react-dom';
import Demo1 from './Demo1';
import Demo2 from './Demo2';
import Demo3 from './Demo3';

require('./index.css');

function App() {
    return (
        <div>
            <h1>Welcome to Print`s demo</h1>
            <hr />
            <Demo1 />
            <hr />
            <Demo2 />
            <hr />
            <Demo3 />
        </div>
    );
}


ReactDOM.render(<App />,
    document.querySelector('#root')
);

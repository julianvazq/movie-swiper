import React from 'react';
import { useSocket } from './context';
import './App.css';

const App = () => {
    const { value }: any = useSocket();
    console.log(value);
    return <div className="App">Hello React</div>;
};

export default App;

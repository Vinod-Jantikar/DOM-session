import React from 'react'
import Component2 from './Component2';
import { AppContext } from '../context/AppContext';

const Component1 = () => {

    const values = {
        a: "Apple",
        b: "Ball",
        c: "Cat",
        d: "Dog",
        e: "Elephant",
        f: "Fish",
    };

    return (
        <AppContext.Provider value={values}>
            <Component2 />
        </AppContext.Provider>
    )
}

export default Component1

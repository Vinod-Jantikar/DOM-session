import React, { useContext } from 'react'
import Component5 from './Component5';
import { AppContext } from '../context/AppContext';

const Component4 = () => {
    const { c, d } = useContext(AppContext);
    return (
        <>
            <h4>This is prop c: {c}</h4>
            <h4>This is prop d: {d}</h4>
            <Component5 />
        </>
    )
}

export default Component4

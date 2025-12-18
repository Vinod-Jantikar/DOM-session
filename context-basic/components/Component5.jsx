import React, { useContext } from 'react'
import Component6 from './Component6';
import { AppContext } from '../context/AppContext';

const Component5 = () => {
    const { f } = useContext(AppContext);

    return (
        <>
            <h4>This is prop f: {f}</h4>
            <Component6 />
        </>
    );
}

export default Component5

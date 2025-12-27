import React from 'react'

const Header = React.memo(({ title }) => {
    console.log("Header rendered");
    return (
        <h1>{title}</h1>
    )
})

export default Header

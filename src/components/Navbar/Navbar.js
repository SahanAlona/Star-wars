import React from 'react';
import './Navbar.css';

function Navbar(props) {
    const classActive = props.isActive ? 'active' : '';
    return (
        <button
            type="button"
            onClick={() => props.onClick()}
            className={`nav-button ${classActive}`}>
            {props.name}
        </button>
    );
}

export default Navbar;

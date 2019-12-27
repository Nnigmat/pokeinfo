import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">PokeInfo</Link>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link to="/about" className="nav-link"> About </Link>
                </li>
                <li>
                    <select name="curLanguage" value={props.curLanguage} onChange={props.handleChange} className="custom-select nav-item">
                        {props.languages.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                    </select>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar

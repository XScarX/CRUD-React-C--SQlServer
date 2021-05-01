import React from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';

const Menu = (props) => {
    return (
        <div>
            <Nav className={props.estilo}>
                <NavItem>
                    <NavLink>
                        <Link className={props.corTexto} to="/">Home</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link className={props.corTexto} to="/Cadastro">Cadastro</Link>
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default Menu;
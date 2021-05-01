import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Cliente from "../Paginas/Clientes/Cliente";
import CadastroCliente from "../Paginas/Clientes/CadastroCliente";

export default class Rotas extends React.Component {

    render() {
        return <HashRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Cliente} /> 
                    <Route exact path="/Cadastro" component={CadastroCliente} />                   
                </Switch>
            </div>
        </HashRouter>
    }
}
import React from "react";
import Menu from "../../Components/Menu";
import Tabela from "../../Components/Tabela/Tabela"

class Cliente extends React.Component {
    render() {
        return (
            <div>
                <Menu estilo='bg-dark'></Menu>
                <h1>Tabela Clientes</h1>
                <Tabela></Tabela>
            </div>
        )
    }
}
export default Cliente;
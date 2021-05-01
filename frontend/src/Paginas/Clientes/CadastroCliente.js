import React from 'react';
import Menu from '../../Components/Menu';
import Api from '../../Servicos/Clientes';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CadastroCliente extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: "",
            idade: 0
        }
        this.mudarIdade = this.mudarIdade.bind(this);
        this.mudarNome = this.mudarNome.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
    }

    mudarIdade = event => {
        this.setState({
            idade: event.target.value
        })
    }
    mudarNome = event => {
        this.setState({
            nome: event.target.value
        })
    }
    cadastrar() {
        const usuario = {
            Nome: this.state.nome,
            Idade: this.state.idade
        }
        Api.post('api/Clientes', usuario)
            .then(res => {
                console.log(res)
            })
    }

    render() {
        return (
            <div>
                <Menu estilo='bg-dark' cachorro='bisteca'></Menu>
                <h2>Cadastro Clientes</h2>
                <div className="d-flex justify-content-center">
                    <Form>
                        <Form.Group>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label >Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={this.mudarNome}
                                        value={this.state.nome}
                                        placeholder="username" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Idade</Form.Label>
                                    <Form.Control
                                        type='number'
                                        onChange={this.mudarIdade}
                                        value={this.state.idade}
                                        placeholder="idade" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Button className="form-control"
                                    variant="primary"
                                    onClick={this.cadastrar}>Cadastrar</Button>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                </div >
            </div >
        )
    }
}

export default CadastroCliente;
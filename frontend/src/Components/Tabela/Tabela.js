import React from 'react';
import Api from '../../Servicos/Clientes';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheckCircle, faWindowClose, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'reactstrap';



class Tabela extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            clientes: [],
            nome: "",
            idade: 0,
            idEditar: 0,
            addCliente: false,
            show: false,
            idDelete: 0
        }
        this.consultarPorId = this.consultarPorId.bind(this);
        this.atualizarCliente = this.atualizarCliente.bind(this);
        this.mudarIdade = this.mudarIdade.bind(this);
        this.mudarNome = this.mudarNome.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this);
        this.carregarTabela = this.carregarTabela.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async componentDidMount() {
        this.carregarTabela();
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

    atualizarCliente() {
        const usuario = {
            Id: this.state.idEditar,
            Nome: this.state.nome,
            Idade: this.state.idade
        }
        Api.put('api/Clientes', usuario)
            .then(res => {
                console.log(res)
                this.carregarTabela();
            })
    }

    handleClose(id) {
        if (this.state.show) {
            this.setState({
                show: false
            })
        }
        else {
            this.setState({
                show: true,
                idDelete: id
            })
        }
    }

    adicionarCliente() {
        if (this.state.addCliente) {
            this.setState({
                addCliente: false
            })
        }
        else {
            this.setState({
                addCliente: true
            })
        }
    }

    carregarTabela() {
        Api.get('api/Clientes')
            .then(res => {
                this.setState({
                    clientes: res.data,
                    idEditar: 0
                });
            })
    }

    consultarPorId(id) {
        Api.get('api/Clientes/Id?Id=' + id)
            .then(res => {
                console.log(res)
                this.setState({
                    nome: res.data.nome,
                    idade: res.data.idade,
                    idEditar: res.data.id
                })
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
                this.carregarTabela();
            })
    }

    excluirCliente() {
        Api.delete(`api/Clientes/Id?Id=${this.state.idDelete}`)
            .then(res => {
                console.log(res)
                this.carregarTabela();
                this.handleClose();
                this.setState({
                    idDelete: 0
                })
            })
    }

    render() {

        let linhas = [];

        if (this.state.addCliente) {
            linhas.push(
                <tr>
                    <td></td>
                    <td>
                        <Form.Row>
                            <InputGroup>
                                <InputGroupText>Nome</InputGroupText>
                                <Form.Control
                                    type="text"
                                    onChange={this.mudarNome}
                                    value={this.state.nome}
                                    placeholder="username" />
                            </InputGroup>
                        </Form.Row>
                    </td>
                    <td>
                        <InputGroup>
                            <InputGroupText>Idade</InputGroupText>
                            <Form.Control
                                type='number'
                                onChange={this.mudarIdade}
                                value={this.state.idade}
                                placeholder="idade" >
                            </Form.Control>
                        </InputGroup>
                    </td>
                    <td>
                        <Button
                            variant="success"
                            onClick={this.cadastrar}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </Button>
                    </td>
                    <td></td>
                </tr>
            )
        }
        if (this.state.clientes.length > 0) {
            this.state.clientes.map(cliente => {
                if (cliente.id == this.state.idEditar) {
                    linhas.push(
                        <tr key={cliente.id}>
                            <td></td>
                            <td>
                                <Form.Row>
                                    <InputGroup>
                                        <InputGroupText>Nome</InputGroupText>
                                        <Form.Control
                                            type="text"
                                            onChange={this.mudarNome}
                                            value={this.state.nome}
                                            placeholder="username" />
                                    </InputGroup>
                                </Form.Row>
                            </td>
                            <td>
                                <InputGroup>
                                    <InputGroupText>Idade</InputGroupText>
                                    <Form.Control
                                        type='number'
                                        onChange={this.mudarIdade}
                                        value={this.state.idade}
                                        placeholder="idade" >
                                    </Form.Control>
                                </InputGroup>
                            </td>
                            <td>
                                <Button
                                    variant="success"
                                    onClick={() => { this.atualizarCliente() }}>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => { this.carregarTabela() }}>
                                    <FontAwesomeIcon icon={faWindowClose} />
                                </Button>
                            </td>
                            <td></td>
                        </tr>
                    )
                } else {

                    linhas.push(
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.idade}</td>

                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => { this.consultarPorId(cliente.id) }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => { (this.handleClose(cliente.id)) }}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </td>
                        </tr>
                    )
                }
            })
        }


        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Excluir Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja deletar esse cliente?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Fechar
                            </Button>
                        <Button variant="danger" onClick={() => { this.excluirCliente() }}>
                            Excluir
                            </Button>
                    </Modal.Footer>
                </Modal>

                <Row>
                    <Col sm={{ size: 'auto', offset: 1 }}>
                        <Button
                            variant="primary"
                            onClick={() => { this.adicionarCliente() }}>
                            <FontAwesomeIcon icon={faPlusSquare} /></Button>
                    </Col>
                </Row>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas}
                    </tbody>
                </Table>
            </div >
        )
    }
}

export default Tabela;

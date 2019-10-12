import React, {Component} from 'react'
import {deleteAction} from '../../actions/user/UserAction';
import FormEdit from './form/FormEdit';


class UserEdit extends Component {

    //A lista inicia vazia
    constructor(props) {
        super(props)
        this.state = {lista: [], data: ''};

    }

    //Busca os dados dos contatos ordenado por id e o estado da  lista é modificado com o setState
    buscarContato() {

        let url = "http://localhost:8080/buscarcontato"
        fetch(url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => response.json())
            .then(json => {
                this.setState({
                    lista: json
                })
                console.log("Data", json)
            })
    }

    //Deleta os contatos atraves da tabela
    deleteContato(codigo, event) {
        event.preventDefault();
        //Transforma o valor do id em um json
        let json = '{"id":' + codigo + '}';

        //Realiza o parse para o formato json
        let obj = JSON.parse(json);
        console.log("json: ", obj)


        //Deleta o objeto json ex {"id": 7}  usando o confirm do java script
        var txt;
        var r = confirm("Deseja Excluir?");
        if (r == true) {
            txt = "OK!";
            deleteAction(obj);
            //Atualiza a pagina

            // alert ('Excluido com sucesso!!')
            setTimeout(function () {
                location.reload();
            }, 1);
        } else {
            txt = "Cancel!";
        }

    }

    getDadosParaEditar(json, event) {
        event.preventDefault();

        //{id: 16, nome: "Eduardo", email: "eduardo.r.delfino@gmail.com"}
        let dados = json;
        //let obj = JSON.parse(Data);

        //Muda o stado dos dados para ser capturado no FormEdit
        this.setState({
            data: dados
        })

        console.log("data", dados)

    }

    mostrarFormEdit() {
        // Passando os estados para serem capturados na props dentro do FormEdit
        if (this.state.data.id != null) {
            return <FormEdit id={this.state.data.id} nome={this.state.data.nome}
                             email={this.state.data.email}></FormEdit>;
        }
    }

    componentWillMount() {
        this.buscarContato();
    }

    render() {
        //Estado da lista atualizado
        const list = this.state.lista;
        console.log("lista: ", list);

        return (

            <div>

                {this.mostrarFormEdit()}

                <br></br><br></br>

                <table border='1'>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>nome</th>
                        <th>email</th>
                        <th>Alterar</th>
                        <th>Excluir</th>
                    </tr>
                    </thead>
                    <tbody>


                    {
                        list.map((item) => {
                            return (

                                <tr key={item.id}>

                                    <td> {item.id} </td>
                                    <td> {item.nome} </td>
                                    <td> {item.email} </td>
                                    <td>
                                        <button onClick={this.getDadosParaEditar.bind(this, item)}>EDIT</button>
                                    </td>
                                    <td>
                                        <button onClick={this.deleteContato.bind(this, item.id)}>DELETE</button>
                                    </td>

                                </tr>
                            );
                        })
                    }

                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserEdit;

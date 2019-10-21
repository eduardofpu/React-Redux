import React, {Component} from 'react'
import {deleteActionId} from '../../actions/user/UserAction';
import FormEdit from './form/FormEdit';


class UserEdit extends Component {

    //A lista inicia vazia
    constructor() {
        super()
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
                // console.log("Data", json)
            })
    }

    //Deleta os contatos atraves da tabela
    deleteContato(id, event) {
        event.preventDefault();

            var txt;;
            var r = confirm("Deseja Excluir?");
            if (r === true) {
                txt = "OK!";

                deleteActionId(id)
                // this.buscarContato();

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

    }

    mostrarFormEdit() {
        // Passando os estados para serem capturados na props dentro do FormEdit
        if (this.state.data.id != null ) {
            return <FormEdit
                            id={this.state.data.id}
                            nome={this.state.data.nome}
                            email={this.state.data.email}
                            atualizarTabelaContato = { this.buscarContato() }>
                   </FormEdit>;
        }
        return  this.buscarContato();

    }

    componentWillMount() {
        this.buscarContato();
    }

    // componentWillUnmount(){
    //     this.buscarContato();
    // }

    render() {
        //Estado da lista atualizado
        const list = this.state.lista;
        // console.log("lista: ", list);

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

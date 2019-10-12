import React, { Component } from 'react'
import UserForm from './form/UserForm';


class User extends Component {
    
//A lista inicia vazia    
constructor(){
    super()

    this.state = { 
        lista:[]
         
    }; 
      
}    

//O estado da  lista é modificado com o setState
buscarContato(){   
        
    let url = "http://localhost:8080/buscarcontato"
    fetch(url,{
        method:"GET",
        headers:{
            'Content-type':'application/json'
        }
    }).then((response) => response.json())
    .then(dados => {
        this.setState({ 
            lista: dados
            })        
            console.log("Data",dados)
        })
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
        
        <UserForm ></UserForm><br></br><br></br>
        
        <table border='1'>
            <thead>
                <tr> 
                <th>id</th>         
                <th>nome</th>
                <th>email</th>
                </tr>
                </thead>
                <tbody>

                    {
                        list.map((item) =>{
                        return (
                                <tr key={item.id}> 
                                
                                    <td> {item.id} </td>  
                                    <td> {item.nome} </td>
                                    <td> {item.email} </td>                                   
                                    
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

export default User;

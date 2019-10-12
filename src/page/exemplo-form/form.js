import React, { Component } from 'react'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({formErrors,...rest}) => {   
    console.log("val",rest);
     let valid = true;
     Object.values(formErrors).forEach(val => {
       val.length > 0 && (valid = false)
       
      });

      Object.values(rest).forEach(val =>{
          val ===null && (valid = false)

      });
   
      return valid;
   };

class Form extends Component {
    
//A lista inicia vazia    
constructor(){
    super()

    this.state = {         
        nome: null,
        email: null,
        formErrors: {
            nome: "",
            email: ""
          }    
    }; 
    this.handleChange = this.handleChange.bind(this);   
    
}    
 
 submeter = (e) =>{
    e.preventDefault(); 
    
    if(formValid(this.state)){
      console.log(`
      --SUBSTRING--
      Name: ${this.state.nome}
      Email: ${this.state.email}
      `)
    }else{
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
    }

 
 }

 handleChange = event => {
 event.preventDefault();
 const { name,value } = event.target;
 let formErrors = this.state.formErrors;

 // console.log("Nome:",name);
 // console.log("Value:",value);

 switch (name){
   case "nome":
     formErrors.nome = value.length < 3 ? "  minimum 3 characaters required"
       : "";
     break;

   case "email":
       formErrors.email = emailRegex.test(value) 
       ? ""
         : "  invalid email address";
       break;
     default:
       break;    
 }
 // console.log("Nome:",name);
 // console.log("Value:",value);
 this.setState({ formErrors, [name]:value }, () => console.log(this.state));
       
}
  
render() {
    
    const { formErrors } = this.state;
        
return (       
    
    <div>
       
        <form onSubmit={this.submeter}>

             <label> 
                 Name
             </label><p></p>

             <input 
             className= {formErrors.nome.length > 0 ? "error" : null} 
             type="text" 
             name="nome" 
             placeholder="nome" 
             onChange={this.handleChange}
             />
            {formErrors.nome.length > 0 && (<span>{formErrors.nome}</span>)}
                  
             <label><p></p>
                 Email
             </label><p></p>

             <input 
             className= {formErrors.email.length > 0 ? "error" : null}
             type="email"
             name="email"
             placeholder="email"
             onChange={this.handleChange}
             />
             {formErrors.email.length > 0 && (<span>{formErrors.email}</span>)}<p></p>
            
             <button   type="submit"  >Salvar</button> 
             <small>Already have an Account?</small>
                          
         </form>
       
    </div>     
);
}
}

export default Form;

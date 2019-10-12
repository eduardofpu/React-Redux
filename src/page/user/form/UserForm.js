import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import React from 'react'
import { submitUserAction } from "../../../actions/user/UserAction"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//Métodos de validação    
const required = value => value ? undefined : '*'

const maxLength = max => value =>
    value && value.length > max ? `Deve ter ${max} ou menos caracteres` : undefined
const maxLength10 = maxLength(10)

const minLength = value =>
    value && value.length < 3 ? `O valor minimo e 3 caracteres!` : undefined


const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Endereço de email invalido' : undefined

const aol = value =>
    value && /.+@hotmail\.com/.test(value) ?
    'Realmente? Você ainda usa a HOTMAIL para seu email?' : undefined


const UserFormFunc = props => {

//Component input
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
    <label>{label}</label>
    <div>
        <input {...input} placeholder={label} type={type}/>
        {touched && ((error && <span><font color="red">{ error }</font></span>) || (warning && <span><font color="red">{ warning }</font></span>))}
    </div>
    </div>
)    

  
const{handleSubmit, pristine, reset, submitting } = props
  
   
const submit = (data,submitUserAction) =>{

  //Utiliza a importação confirmAlert do react-confirm-alert.css
  confirmAlert({
    title: 'Salvar contato',
    message: 'Você deseja salvar?',
    buttons: [
   {
    label: 'OK',
    onClick: () => submitUserAction(data)   
                
   },
   {
    label: 'Cancel'
   }
  ]
 });

}

    return (
      
      <div>
        
         <form  onSubmit={handleSubmit((fields)=>submit(fields,submitUserAction))}>
                
            <p></p>
             <Field             
             type="text" 
             name="nome" 
             component={renderField}
             label="Nome"             
             validate={[ required, maxLength10 ]}
             warn={minLength}              
             /> <p></p>            
             <Field 
             type="email" 
             name="email" 
             component={renderField}
             label="Email"             
             validate={[required, email]}
             warn={aol}              
             />
             <button disabled={submitting} type="submit" >Salvar</button>
             <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>      
             
             {/* <Button nameButton="Salvar"></Button> */}
             
         </form>
        
       </div>
    );
}

const UserForm = (reduxForm({
    form: 'form-user'
}))(UserFormFunc)

const mapStateToProps = state =>({
  
})

export default connect(mapStateToProps, {submitUserAction})(UserForm)


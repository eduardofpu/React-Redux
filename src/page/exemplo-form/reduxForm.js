    import React from 'react'        
    import { Field, reduxForm } from 'redux-form'
    

    //DOC:   https://redux-form.com/6.6.1/examples/fieldlevelvalidation/  
    
    
    const renderField = ({input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span><font color="red">{error}</font></span>)|| (warning && <span><font>{warning}</font></span>))}
    </div>     
    );

    const onSubmit = values => {
        alert(JSON.stringify(values))
    }
    const required = v =>{
        if(!v || v=== ''){
            return 'This fields is required'
        }
        return undefined;
    }

    const allowedName = v =>{
        if(v=== 'teste'){
            return '"teste" is not a valid customer id';
        }
        return undefined;
    }

    const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined

    const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

    const maxLength15 = maxLength(3)


    const ReduxForm = ({handleSubmit,valid}) => (
        <div>
            <h2>Redux Form</h2>
            <form onSubmit={handleSubmit}>
                <Field name="cutomer-id"  
                component={renderField} 
                label="Username" 
                validate={[required,allowedName,maxLength15]}
                warn={tooOld}
                 />                
                <button disabled={!valid} type="submit">Submit</button>
            </form>
            
            
        </div>

    );

    export default reduxForm({
        form: 'my-customer-registration-form',
        onSubmit,
    }) (ReduxForm);
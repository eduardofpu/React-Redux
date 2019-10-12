import React, { Component } from 'react'

class Button extends Component {
  
  
render() {
      
return (       
   
    <div>       
         <button type="submit" value="Botão">{this.props.nameButton}</button>
    </div>     
   );
  }
}

export default Button;


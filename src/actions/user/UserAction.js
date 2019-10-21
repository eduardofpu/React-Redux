export const submitUserAction = (data) => {  
    // event.preventDefault ();  
    let url = "http://localhost:8080/savecontato"
    fetch(url,{
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
       
    }) .then(Response => Response.json())
    .then(json => {
        console.log(json)
        //Atualiza a pagina
        // setTimeout(function(){ location.reload(); }, 1);
        // alert ('Salvo com sucesso!!')
     })
}

export const updateAction = (id,data) => {    
    let url = "http://localhost:8080/updatecontato/"+id
    fetch(url,{
        method:"PUT",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
       
    }) .then(Response => Response.json())
    .then(json => {
        console.log(json)
        //Atualiza a pagina
        // setTimeout(function(){ location.reload(); }, 1);
        // alert ('Alterado com sucesso!!') 
    })
}

export const deleteActionId = (id) => {
    let url = "http://localhost:8080/deletecontato/"+id
    fetch(url,{
        method:"DELETE"

    }) .then(console.log("204 No Content"))

}
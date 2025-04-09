function cargarUsuarios(){
    fetch("http://localhost:4050/usuarios")
    .then(function(respuestaTextoPlano){
        //La respuesta (OK o KO) la transformo en JSON
        return respuestaTextoPlano.json()
    })
    .then(function(data){
        //Gestionamos el OK con "data" que tendrá formato JSON
        //console.log(data)
        const tbody = document.getElementById("usuarios-body")
        for(let usuarios of data){
            //Para cada producto, creamos una fila
            const row = document.createElement("tr") //<tr></tr>
            const idCell = document.createElement("td")
            idCell.innerText = usuarios.id

            const nombreCell = document.createElement("td")
            nombreCell.innerText = usuarios.name

            const apellidoCell = document.createElement("td")
            apellidoCell.innerText = usuarios.lastname

            const correoCell = document.createElement("td")
            correoCell.innerText = usuarios.email

            const usuarioCell = document.createElement("td")
            usuarioCell.innerText = usuarios.username

            const contraseñaCell = document.createElement("td")
            contraseñaCell.innerText = usuarios.password

            const perfilCell = document.createElement("td")
            perfilCell.innerText = usuarios.profile

            //SHOW BUTTON
            const detallesCell = document.createElement("td")
            const detallesButton = document.createElement("button")
            detallesButton.innerText = "Ver"
            detallesButton.classList.add("btn-detalles"); 
            detallesButton.onclick = function(){
                window.location.href = "show.html?id=" + usuarios.id
            }
            detallesCell.appendChild(detallesButton)

            //EDIT BUTTON
            const editButton = document.createElement("button")
            editButton.innerText = "Edit"
            editButton.id = "edit-button"
            editButton.onclick = function(){
                window.location.href = "editUser.html?id=" + usuarios.id
            }
            detallesCell.appendChild(editButton)


            //DELETE BUTTON
            const deleteButton = document.createElement("button")
            deleteButton.innerText = "Delete"
            deleteButton.id = "delete-button"
            deleteButton.onclick = function(){
                eliminarUsuario(usuarios.id)
            }
            detallesCell.appendChild(deleteButton)


            row.appendChild(idCell)
            row.appendChild(nombreCell)
            row.appendChild(apellidoCell)
            //row.appendChild(correoCell)
            row.appendChild(usuarioCell)
            //row.appendChild(contraseñaCell)
            //row.appendChild(perfilCell)
            row.appendChild(detallesCell)
            tbody.appendChild(row)
        }
    })
    .catch(function(error){
        //Gestionamos el KO con "error" que tendrá formato JSON
        console.log("Error al obtener los usuarios: ", error)
    })
}

function eliminarUsuario(id){
    Swal.fire({
        title:"¿Estás seguro?",
        text:`Eliminar Usuario '${id}'. Esta acción no se puede deshacer`,
        icon:"warning",
        showCancelButton:true,
        confirmButtonText:"Sí, eliminar",
        cancelButtonText:"Cancelar"
    }).then(function(result){
        if(result.isConfirmed){
            //Si le hemos dado a "Sí, eliminar"
            fetch("http://localhost:4050/usuarios/" + id,{
                method:"DELETE"
            })
            .then(function(respuestaTextoPlano){
                return respuestaTextoPlano.json()
            })
            .then(function(data){
                //OK
                //data (String) y no JSON
                console.log(data)
                if(data.message.includes("Error")){
                    Swal.fire({
                        title: "Error!",
                        text: data.message,
                        icon: "error"
                    })
                } else {                
                    Swal.fire({
                        title: "Eliminado!",
                        text: data.message,
                        icon: "success"
                    })
                    .then(function(){
                            //Refresco de página en JS desde el servidor y no desde caché
                            window.location.reload(true)
                            //cargarProductos()
                        })
                }                
            })
            .catch(function(error){
                console.log(error)
                Swal.fire({
                    title: "¡Error!",
                    text: error,
                    icon: "error"
                });
            })
        }
    })
}

function cargarRestaurantes(){
    fetch("http://localhost:4050/restaurantes")
    .then(function(respuestaTextoPlano){
        //La respuesta (OK o KO) la transformo en JSON
        return respuestaTextoPlano.json()
    })
    .then(function(data){
        //Gestionamos el OK con "data" que tendrá formato JSON
        //console.log(data)
        const tbody = document.getElementById("restaurantes-body")
        for(let restaurantes of data){
            //Para cada producto, creamos una fila
            const row = document.createElement("tr") //<tr></tr>
            const idCell = document.createElement("td")
            idCell.innerText = restaurantes.id

            const nombreCell = document.createElement("td")
            nombreCell.innerText = restaurantes.nombre

            const ubicacionCell = document.createElement("td")
            ubicacionCell.innerText = restaurantes.ubicacion

            const descripcionCell = document.createElement("td")
            descripcionCell.innerText = restaurantes.descripcion

            const propietarioCell = document.createElement("td")
            propietarioCell.innerText = restaurantes.propietario

            //SHOW BUTTON
            const detallesCell = document.createElement("td")
            const detallesButton = document.createElement("button")
            detallesButton.innerText = "Ver"
            detallesButton.classList.add("btn-detalles"); 
            detallesButton.onclick = function(){
                window.location.href = "showRestaurante.html?id=" + restaurantes.id
            }
            detallesCell.appendChild(detallesButton)

            //EDIT BUTTON
            const editButton = document.createElement("button")
            editButton.innerText = "Edit"
            editButton.id = "edit-button"
            editButton.onclick = function(){
                window.location.href = "editRestaurante.html?id=" + restaurantes.id
            }
            detallesCell.appendChild(editButton)

            //DELETE BUTTON
            const deleteButton = document.createElement("button")
            deleteButton.innerText = "Delete"
            deleteButton.id = "delete-button"
            deleteButton.onclick = function(){
                eliminarRestaurante(restaurantes.id)
            }
            detallesCell.appendChild(deleteButton)

            row.appendChild(idCell)
            row.appendChild(nombreCell)
            row.appendChild(ubicacionCell)
            
            row.appendChild(detallesCell)
            tbody.appendChild(row)
        }
    })
    .catch(function(error){
        //Gestionamos el KO con "error" que tendrá formato JSON
        console.log("Error al obtener los restaurantes: ", error)
    })
}

function eliminarRestaurante(id){
    Swal.fire({
        title:"¿Estás seguro?",
        text:`Eliminar Restaurante '${id}'. Esta acción no se puede deshacer`,
        icon:"warning",
        showCancelButton:true,
        confirmButtonText:"Sí, eliminar",
        cancelButtonText:"Cancelar"
    }).then(function(result){
        if(result.isConfirmed){
            //Si le hemos dado a "Sí, eliminar"
            fetch("http://localhost:4050/restaurantes/" + id,{
                method:"DELETE"
            })
            .then(function(respuestaTextoPlano){
                return respuestaTextoPlano.json()
            })
            .then(function(data){
                //OK
                //data (String) y no JSON
                console.log(data)
                if(data.message.includes("Error")){
                    Swal.fire({
                        title: "Error!",
                        text: data.message,
                        icon: "error"
                    })
                } else {                
                    Swal.fire({
                        title: "Eliminado!",
                        text: data.message,
                        icon: "success"
                    })
                    .then(function(){
                            //Refresco de página en JS desde el servidor y no desde caché
                            window.location.reload(true)
                            //cargarProductos()
                        })
                }                
            })
            .catch(function(error){
                console.log(error)
                Swal.fire({
                    title: "¡Error!",
                    text: error,
                    icon: "error"
                });
            })
        }
    })
}
// MAIN - Ejecución:
cargarUsuarios()
cargarRestaurantes()
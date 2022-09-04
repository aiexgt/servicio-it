'use strict'

const correo = document.getElementById("idCorreo");
const id = document.getElementById("idId");
const usuario = document.getElementById("idUsuario");
const departamento = document.getElementById("idDepartamento");
const tipoCasos = document.getElementById("idTipoCasos");
const descripcionT = document.getElementById("idDescripcion");
const btnEnviar = document.getElementById("idBtnEnviar");
const btnLimpiar = document.getElementById("idBtnLimpiar");
const casos = document.getElementById("idCasos");


const leerTipoCaso = ()=>{
    fetch(`http://localhost:3000/tipo-casos/read`)
        .then(response => response.json())
        .then(result => {
        let html = `<label for="radio">
                        <h5>Tipo de Caso</h5>
                    </label>  `;
        let activador = false;
            for(let i in result.rows){

                if(activador == false){
                    html += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="${result.rows[i].id}" name="tipo_caso" checked>
                        <label class="form-check-label" for="tipo-caso">
                        ${result.rows[i].descripcion}
                        </label>
                    </div>
                `
                activador = true;
                }else{
                    html += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="${result.rows[i].id}" name="tipo_caso">
                        <label class="form-check-label" for="tipo-caso">
                        ${result.rows[i].descripcion}
                        </label>
                    </div>
                    `
                }
                
            }

            tipoCasos.innerHTML = html;

        })
        .catch(error => {});
}

const limpiar = ()=>{
    correo.value = "";
    id.value = "";
    usuario.value = "";
    departamento.value = "";
    tipoCasos.value = "";
    descripcionT.value = "";
    leerTipoCaso();
}

btnLimpiar.addEventListener('click', ()=>{
    limpiar();
})

correo.addEventListener('keyup',()=>{
    let textCorreo = correo.value;
    if(textCorreo.length > 10){
        fetch(`http://localhost:3000/usuarios/search/${textCorreo}`)
        .then(response => response.json())
        .then(result => {
            id.value = result.rows[0].id;
            usuario.value = result.rows[0].usuario;
            departamento.value = result.rows[0].descripcion;
        })
        .catch(error => {});
        }
})

btnEnviar.addEventListener('click',(e)=>{
    e.preventDefault;
    let usuario_id = id.value;
    console.log(usuario_id)
    let tipo_caso_id = document.querySelector('input[name="tipo_caso"]:checked').value;
    let descripcion = descripcionT.value;

    if(usuario_id == "" || usuario == null || usuario == 'undefined'){
        casos.innerHTML = `<div class="alert alert-danger" role="alert">
                                Ingrese un correo válido!
                            </div>`
    }else if(descripcion == "" || descripcion == null || descripcion == 'undefined'){
        casos.innerHTML = `<div class="alert alert-danger" role="alert">
                                Ingrese una descripción válida!
                            </div>`
    }else{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("usuario_id", usuario_id);
        urlencoded.append("tipo_caso_id", tipo_caso_id);
        urlencoded.append("descripcion", descripcion);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/casos/add", requestOptions)
        .then(response => response.json())
        .then(result => {
            casos.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h5>Caso: ${result.rows[0].id}</h5>
                <h5>Fecha: ${result.rows[0].fecha}</h5>
            </div>
            `
            limpiar();
        })
        .catch(error => console.log('error', error));
    }
})

leerTipoCaso();
leerCasos();
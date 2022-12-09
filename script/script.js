//llamados
let resultado=document.querySelector('.contenedor__resultado')
let filaId=1;
let contenedorJuego=document.querySelector('.contenedor__juego')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c996e4226emsh8993396a1fe5500p173863jsn08501ac53e7f',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	}}
fetch("https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&minLength=3&maxLength=5",options)
.then(result=>result.json())
.finally(()=>{
let fondoCarga=document.querySelector('.cargando')
fondoCarga.style.display='none';}
)
.then(data=>{
    //Convertir el texto en un array
    let word=data[0];
    let wordArray=word.toUpperCase().split("");
    console.log(wordArray);

    //////////////////////////// crear la primera fila del juegoo ///////////////////////////////
    let filaActual=document.querySelector(".fila")
    dibujarCuadrados(filaActual)

    escucharIngreso(filaActual);
    agregarFocus(filaActual);




    function escucharIngreso(filaActual){
        // Llamar a  los cuadrados/input
        let cuadrados=filaActual.querySelectorAll('.cuadrado')
        cuadrados=[...cuadrados]// de node list a array
        // Recoger los datos ingresados en el input
        let datosIngresados=[]// donde se almacenara
        cuadrados.forEach((element)=>{
            element.addEventListener('input',event=>{
            if(event.inputType !=='deleteContentBackward'){
                datosIngresados.push(event.target.value.toUpperCase());
                console.log(datosIngresados);

                    //SE MUEVA AL SIGUIENTE ELEMENTO
                    if(event.target.nextElementSibling){ // se esta viendo si hay vecino
                        event.target.nextElementSibling.focus();
                    }
                    else{
                        //trabajar sobre datos ingresados y que son borradospara obetener un input final
                        let cuadradosFinales=document.querySelectorAll('.cuadrado')
                        cuadradosFinales=[...cuadradosFinales]
                        //obtenemos los 5 finales de cada elemento por que se esta almacenando
                        let ultimoSCincoCuadradosFinales=cuadradosFinales.slice(-word.length);
                        let datosFinalesIngresados=[]; //3:02:08
                        ultimoSCincoCuadradosFinales.forEach((element)=>{
                            datosFinalesIngresados.push(element.value.toUpperCase());
                        })
                        let elementosAcertados=comprobarExistencia(wordArray,datosFinalesIngresados);
                        elementosAcertados.forEach((element)=>{
                            cuadrados[element].classList.add('dorado')
                        })
                        elementosIguales=compararArreglos(wordArray,datosFinalesIngresados);
                        elementosIguales.forEach((element)=>{
                        cuadrados[element].classList.add('verde'); })
                            if(elementosIguales.length==wordArray.length ){
                            mirarResultado("ganastes");  

                            //es necesario ponerlo dentro de la funcion, ya que fuera lo toma primero
                            // y por ende no se puede llamar antes de ser creado
                            //resetear los inputs --1:26
                            return;// colocado en esta posicion para que finalice sin afecta
                            }
                            let filaActual=crearNuevaFila();
                            if(!filaActual){
                                return;
                                }
                            //crear la nueva linea
                            dibujarCuadrados(filaActual);
                            escucharIngreso(filaActual);
                            agregarFocus(filaActual);
                        
                        }
            }
            else{
                    datosIngresados.pop();
            }  
            });
        })
    
    } 

    //funciones PARA DETECTAR SI ESTA EN LA POSICION CORRECTA LA LETRA
    function compararArreglos(arrray1,array2){
        let indiceIguales=[]
        arrray1.forEach((element,index)=>{
            if(element==array2[index]){
                console.log("encontrado en "+index)
                indiceIguales.push(index);
            }
            else{
                console.log("No se parece en "+index)
            }
        })
        return indiceIguales;
    }
    //Funciones para detectar que existe la letra pero no esta posicionada
    function comprobarExistencia(array1,array2){
        let elementosExistentes=[];
        array2.forEach((element,index)=>{
            if(array1.includes(element)){
                elementosExistentes.push(index)
            }
        
        })
        return elementosExistentes;

    }
    //funcion para crear una nueva fila
    function crearNuevaFila(){
        filaId++
        if(filaId<=5){
            let nuevaFila=document.createElement('div')
            nuevaFila.classList.add('fila')
            nuevaFila.setAttribute('id',filaId)
            contenedorJuego.appendChild(nuevaFila)
            return nuevaFila;
        }
        else{
            mirarResultado(`intentalo de nuevo!, la respuesta correcta era:"${word.toUpperCase()}"`)
        }
    }
    //dibujar cuadrados
    function dibujarCuadrados(filaActual){
        wordArray.forEach((item,index) => {
            if(index===0){
                filaActual.innerHTML+='<input type="text" maxlength="1" class="cuadrado focus"></input>'
            }
            else{
            filaActual.innerHTML+='<input type="text" maxlength="1" class="cuadrado"></input>'
            }
        });
    }
    //2:03:18 
    //funcion para poder dar el focus al primer elemento de la nueva fila
    function agregarFocus(filaActual){
        //creamos el elemento focus
        let elementoFocus=filaActual.querySelector('.focus') // creamos una clase desde js
        elementoFocus.focus(filaActual);
    }
    function mirarResultado(mensaje){
        resultado.innerHTML=`<p class="ganar">${mensaje}</p>
                            <button class="boton">Siguiente</button>`
        let botonReiniciar=document.querySelector('.boton')
        botonReiniciar.addEventListener('click',()=>{
        location.reload(); });
    }
    })

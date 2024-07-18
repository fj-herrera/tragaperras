window.onload = function (){iniciar()}

const PERSONAJES = [ "Adam.webp", "Battle_Cat.webp", "Evil-Lyn.webp", "hefaces.jpg", "hordak.webp", "skeletor.webp" , "trapjou.jpg"]
let numeros = [[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6]]
let combinacion = []
const PREMIOS = [20,1,3,5,0,6,10]
let elPremio
let creditos = 10
let ultimo = false
let esPremio = false

let numeros_new =[]
let btn1, btn2, btn3, btnTirar, btnReiniciar, cajaReiniciar, img1, img2, img3, valor1, valor2, valor3,  pasadas=0, numero, cajon; 


function iniciar(){
    // Selectores
   btnTirar = document.querySelector("#btn-tirar")
   btn1 = document.querySelector("#btn-1")
   btn2 = document.querySelector("#btn-2")
   btn3 = document.querySelector("#btn-3")
   btnReiniciar = document.querySelector("#btn-reiniciar")
   img1 = document.querySelector("#img-1")
   img2 = document.querySelector("#img-2")
   img3 = document.querySelector("#img-3")
   cajon = document.querySelector("#creditos")
   cajaReiniciar = document.querySelector("#caja-reiniciar")


   //umero = numeros.length
    // Eventos
   btnTirar.addEventListener("click", tirar)
   btn1.addEventListener("click", () => {avanzar(1)}, false )
   btn2.addEventListener("click", () => {avanzar(2)}, false )
   btn3.addEventListener("click", () => {avanzar(3)}, false )
   btnReiniciar.addEventListener("click", reiniciar)

   pintarCreditos(creditos)
  
}

// FUNCIONES llamadas por los botones 
////////////////////

function tirar(){
    esPremio=false
    if(creditos > 1){ ocultarBotones(); pedirAleatorios() ;restarMonedas();revisar()} else{ 
       ultimo=true; ocultarBotones(); pedirAleatorios() ;restarMonedas();revisar(); mostrarReiniciar(); 
}}

function avanzar(valor){
    if(creditos > 1){
        pedirAleatorio(valor)
        restarMonedas()
        revisar()
    } else { 
        ocultarBotones(); pedirAleatorio(valor) ;restarMonedas();revisar(); mostrarReiniciar(); 
    }}

function reiniciar(){
    
    alert("reinicia")
    btnTirar.style.display= ""
    cajaReiniciar.style.display= "none"
    creditos = 10
    pintarCreditos(creditos)
    ocultarBotones
    img1.innerHTML = `` ; img2.innerHTML = ``; img3.innerHTML = ``

}

// FUNCIONES SECUNDARIAS  
////////////////////

function pedirAleatorios(){
   valor1 =  Math.floor(Math.random()*numeros[0].length);
   valor2 =  Math.floor(Math.random()*numeros[0].length);
   valor3 =  Math.floor(Math.random()*numeros[0].length);
   combinacion = [valor1, valor2, valor3]
   cambiar(0)
}
function pedirAleatorio(valor){
    let numero_nuevo =  Math.floor(Math.random()*numeros[0].length);
    if (valor == 1){combinacion[0] = numero_nuevo; cambiar(valor)} 
    else if (valor == 2){combinacion[1] = numero_nuevo; cambiar(valor)} 
    else if (valor == 3){combinacion[2] = numero_nuevo; cambiar(valor)} 
}
function pedirPremio(){
    let premio = Math.floor(Math.random()*numeros[0].length);
    elPremio = PREMIOS[premio]
    contarTiempo()
}
function sumarMonedas(valor){
    creditos += Number(valor)
    pintarCreditos(creditos)
}
function restarMonedas(){
    creditos --
    pintarCreditos(creditos)
}
function pintarCreditos(valor){
    cajon.innerHTML =``
    document.querySelector("#contenedor strong").innerHTML=`Tus Créditos son: ${creditos}`
    for(let a=0; a < Number(creditos); a++){
        cajon.innerHTML+=`<div class="coin"><img src="./img/coin.svg" /></div>` 
}}

// FUNCIONES logicas 
////////////////////
function revisar(){
    // Si coinciden las 3 imges
    if(combinacion[0] == combinacion[1] && combinacion[0] == combinacion[2]){ premio()}
    else if (combinacion[1] == combinacion[0] && combinacion[1] == combinacion[2]){premio()}
    else if (combinacion[2] == combinacion[0] && combinacion[2] == combinacion[1]){premio()}
    // Si coinciden 2 imges
    else if(combinacion[0] == combinacion[1]){mostrarBoton(3)}
    else if(combinacion[1] == combinacion[0]){mostrarBoton(3)}
    else if(combinacion[0] == combinacion[2]){mostrarBoton(2)}
    else if(combinacion[2] == combinacion[0]){mostrarBoton(2)}
    else if(combinacion[1] == combinacion[2]){mostrarBoton(1)}
    else if(combinacion[2] == combinacion[1]){mostrarBoton(1)}
}
function cambiar(valor){
    if(valor == 0){
        img1.innerHTML = `<img class="mini" src="./img/${PERSONAJES[combinacion[0]]}" />`
        img2.innerHTML = `<img class="mini" src="./img/${PERSONAJES[combinacion[1]]}" />`
        img3.innerHTML = `<img class="mini" src="./img/${PERSONAJES[combinacion[2]]}" />`}
    else if(valor == 1){img1.innerHTML = `<img class="mini" src="./img/${PERSONAJES[combinacion[0]]}" />`}
    else if(valor == 2){img2.innerHTML = `<img class="mini" src="./img/${PERSONAJES[combinacion[1]]}" />`}
    else if(valor == 3){img3.innerHTML = `<img class="mini" src="./img/${PERSONAJES[combinacion[2]]}" />`
}}


// FUNCIONES VISUALES Y DE TIEMPO 
////////////////////

function mostrarBoton(valor){
    if (valor == 1){btn1.style.visibility= "visible"} 
    else if (valor == 2){btn2.style.visibility= "visible"} 
    else if (valor == 3){btn3.style.visibility= "visible"} 
}
function ocultarBotones(){
    btn1.style.visibility= "hidden"
    btn2.style.visibility= "hidden"
    btn3.style.visibility= "hidden"
}

function contarTiempo(valor){
    setTimeout(mensajePremio, 100)
}

function mostrarReiniciar(){
    if(creditos==0 && esPremio == false) {
        ocultarBotones()
        btnTirar.style.display= "none"
        cajaReiniciar.style.display= "block"}
    else {}    
}


function premio(){
    esPremio= true;
    ocultarBotones()
    pedirPremio()
}

function mensajePremio(valor){
    alert("Premio!\n has ganado: " + elPremio + " monedas" )
    sumarMonedas(elPremio)
}



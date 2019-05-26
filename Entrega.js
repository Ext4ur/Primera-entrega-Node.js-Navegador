const fs = require('fs');

const express = require('express')
const app = express()
opciones = {
    id:{
        demand: true,
        alias: 'i'
    },
    nombre:{
        demand: true,
        alias: 'n'
    },
    cedula:{
        demand: true,
        alias: 'c'
    }
}

const argv = require('yargs')
            .command ('inscribir','Inscribirme en un curso',opciones)
            .argv

let cursos = [{
    id: 1,
    nombre: "Curso A",
    duracion: 10,
    valor: 100000
},
{
    id: 2,
    nombre: "Curso B",
    duracion: 20,
    valor: 200000
},
{
    id: 3,
    nombre: "Curso C",
    duracion: 30,
    valor: 300000
},
{
    id: 4,
    nombre: "Curso D",
    duracion: 40,
    valor: 400000
},
{
    id: 5,
    nombre: "Curso E",
    duracion: 50,
    valor: 500000
}]

const comandos = argv._

let courses=()=>{
    for (let i=0;i<cursos.length;i++){
        setTimeout(function(){
            let {id,nombre,duracion,valor} = cursos[i]
            console.log("Curso #" + id + "    Nombre: " + nombre + "    Duración: " + duracion + 
                        " horas    Valor: $" + valor);
        },2000*(i+1));
    }
}
let createFile=(curso,nombre,cedula)=>{
    let {id,duracion,valor} = curso
    let text = 'Se ha matriculado al estudiante ' + nombre + ' con cédula ' + cedula + ' en el curso llamado ' + curso.nombre
    + ' con id de ' + curso.id + ', el cual tiene una duración de ' + curso.duracion + ' horas y un costo de $' + curso.valor
    app.get('/',function(req,res){
        res.send('Se ha matriculado al estudiante ' + nombre + ' con cédula ' + cedula + ' en el curso llamado ' + curso.nombre
        + ' con id de ' + curso.id + ', el cual tiene una duración de ' + curso.duracion + ' horas y un costo de $' + curso.valor)
    })
    console.log("Curso #" + id + "    Nombre: " + curso.nombre + "    Duración: " + duracion + 
        " horas    Valor: $" + valor + "\nEcha un vistazo al localhost:3000")
}
let inscripcion = () =>{
    let {id,nombre,cedula} = argv
    let bool = cursos.some((e)=>e.id==id)
    if (bool){
        let curso = cursos.find((e)=>{if(e.id==id)return e})
        createFile(curso,nombre,cedula)
    }
    else{
        console.log("Este curso no existe :c\nAquí están los cursos disponibles:")
        courses()
    }
}

if (comandos.includes('inscribir')){
    inscripcion()
}
else{
    courses()
}
app.listen(3000)
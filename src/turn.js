const fs = require('fs');
const colors = require('colors/safe')
const _ = require('underscore');
const Turn = require('./models/turn');
let con = console.log;
let data = [];

const loadTurn = () => {
    try{
        let db = require('./db/turns.json');
        data = db;
    }
    catch{
        data=[];
    }
}
//Guardar Turno en ld base de datos

const saveDB = () => {
    data = JSON.stringify(data,null,'\t');
    fs.writeFile('src/db/turns.json',data, (err)=>{
        if(err) throw new Error('No se pudo cargar el archivo', err);
        con('Archivo modificado exitosamente');
    })
}

//crear Turno

const createTurn = async (objTurn) =>{
    loadTurn();
    const { campo, hora, tiempo, idusuario, idmonitor, idprofesor } = objTurn
    const turn = new Turn({
        campo,
        hora,
        tiempo,
        idusuario,
        idmonitor,
        idprofesor
    })
    data.push(turn);
    saveDB();
    turn.save()
    .then(resp=>{
        con('Turno guardado')
    })
    .catch(err=>{
        con(err)
    });
}
//obtener un turno en especifico
const getTurnFile = (idTurn) => {
    loadTurn();
    return new Promise((resolve, reject)=>{
        let findedTurn = data.find(turn=>{
            return turn._id==idTurn;
        })
        if(findedTurn==undefined){
            reject(`No se ha encontrado el turno con el id: ${idTurn}`)
        }else{
            resolve(findedTurn);
        }
    })  
}
const getTurnDB = async (idUsuario) => {
    //Promesa
    // Turn.findById(idUsuario)
    //     .then(turn=>{
    //         if(!turn){
    //             con(`No se ha encontrado el turno con el id ${idUsuario}`);
    //         }else{
    //             con('Turno de la base de datos: ',turn)
    //         }
    //     })
    //     .catch(err=>{
    //         con('Error en el ingreso del id',err)
    //     });
    // callback
    // Turn.findById(idUsuario,(err,resp)=>{
    //     if(err){
    //         con('Error del callback',err);
    //     }else{
    //         if(resp==null){
    //             con('Turno con el id '+idUsuario+' no existe')
    //         }
    //         else{
    //             con('Turno de la base de datos con callback',resp)
    //         }
    //     }
    // })
    // Async y await
    try{
        const turn = await Turn.findById(idUsuario);
        if(turn==null){
            con('No se encuentra el id:',idUsuario);
        }
        else{
            con('Turno encontrado: ',turn);
        }
    }
    catch(e){
        con('Error del async', e)
    }
    
}

//actualizar Turno

const updateTurnFile = (objTurn) => {
    loadTurn();
    let postnTurno = data.findIndex(turno=>{
        return turno._id == objTurn.idturno;
    })
    if(postnTurno<0){
        con('No se encuentra el id:',objTurn.idturno);
    }else{
        if(objTurn.tiempo!=undefined){
            data[postnTurno].tiempo = objTurn.tiempo;
        }
        if(objTurn.idmonitor!=undefined){
            if(objTurn.idmonitor==="null"){
                data[postnTurno].idmonitor=null;
            }else{
                data[postnTurno].idmonitor = objTurn.idmonitor;
            }
        }
        if(objTurn.idprofesor!=undefined){
            if(objTurn.idprofesor==="null"){
                data[postnTurno].idprofesor = null;
            }else{
                data[postnTurno].idprofesor = objTurn.idprofesor;
            }
        }
        con('Turno del archivo json', data[postnTurno]);
        saveDB();
    }
}

const updateTurnDB = async(objTurn) => {
   
    const objTurno = {tiempo:objTurn.tiempo, idmonitor:objTurn.idmonitor, idprofesor:objTurn.idprofesor};
    
    // metodo 1 para eliminar pasando el objeto objTurno
    if(objTurno.tiempo==null){
        delete objTurno.tiempo;
    } 
    if(objTurno.idmonitor==null){
        delete objTurno.idmonitor;
    }
    if(objTurno.idprofesor==null){
        delete objTurno.idprofesor;
    }

    //metodo 2 para eliminar usando el paquete underscores js pasando el objeto "newObjTurno"
    // const arrProp = [];
    // if(objTurno.tiempo!=null){
    //     arrProp.push("tiempo");
    // }
    // if(objTurno.idmonitor!=null){
    //     if(objTurn.idmonitor==="null"){
    //         objTurn.idmonitor=null;
    //     }
    //     arrProp.push("idmonitor");
    // }
    // if(objTurno.idprofesor!=null){
    //     if(objTurn.idprofesor==="null"){
    //         objTurn.idprofesor=null;
    //     }
    //     arrProp.push("idprofesor");
    // }
    // const newObjTurno =_.pick(objTurn,arrProp);

    //callback
    // Turn.findByIdAndUpdate(objTurn.idturno,newObjTurno,{new:true},(err,resp)=>{
    //     if(err){
    //         con('Error en el id: ', err);
    //     }else{
    //         if(resp==null){
    //             con('No se encuentra el id: ',objTurn.idturno)
    //         }else{
    //             con('Respuesta del callback', resp);
    //         }
    //     }
    // });

    //promesa
    //Objeto opcinal para actualizar solo los campos introducidos pero es mejor hacer uso de el paquete underscore
    //con metodo _.pick se puede crear un nuevo objeto solo con las propiedades que se quieren actualizar 
    //{tiempo:objTurn.tiempo,idmonitor:objTurn.idmonitor, idprofesor:objTurn.idprofesor}
    // Turn.findByIdAndUpdate(objTurn.idturno,newObjTurno,{new:true})
    //     .then(resp=>{
    //         if(resp==null){
    //             con('El turno con el id: '+objTurn.idturno+' no se encuentra')
    //             // return('El turno con el id: '+objTurn.idturno+' no se encuentra')
    //         }else{
    //             con('Turno actualizado: ',resp);
    //             // return resp;
    //         }
    //     })
    //     .catch(err=>{
    //         con('Error de digtacion usando promesas',err);
    //     });
    // async y await
    try{
        const findedTurn = await Turn.findByIdAndUpdate(objTurn.idturno,objTurno,{new:true})
        if(findedTurn==null){
            con('El turno con el id: '+objTurn.idturno+' no se encuentra')
        }else{
            con('Turno actualizado: ',findedTurn);
        }
    }
    catch(e){
        con('Error del async y await',e)
    }
    
}

function deleteTurnFile(idturno){
    loadTurn()
    let postnTurn = data.findIndex(turno=>{
        return turno._id==idturno;
    })
    if(postnTurn<0){
        con('No se encontro el id: '+ idturno);
    }else{
        data.splice(postnTurn,1);
        saveDB();
    }
}

const deleteTurnDB = async (idturno) => {
    //callback
    // Turn.findByIdAndDelete(idturno,(err,res)=>{
    //     if(err){
    //         console.log("error del callback: ",err.message);
    //     }else{
    //         if(res == null){
    //             console.log(`No se encuentra el id: ${idturno} en la base de datos`);
    //         }else{
    //             console.log('respuesta correcta enviada ',res);
    //         }
    //     }
    // })
    //promesa
    // Turn.findByIdAndDelete(idturno)
    //     .then(res=>{
    //         if(res==null){
    //             console.log('No se encuentra el id: ',idturno);
    //         }else{
    //             console.log('respuesta de la promesa:', res)
    //         }
    //     })
    //     .catch(err=>{
    //         console.log('Error usando la promesa ',err.message)
    //     })
    //async y await
    try {
        let turnDeleted = await Turn.findByIdAndDelete(idturno);
        if(turnDeleted==null){
            console.log('No se encuentra el turno:', idturno);
        }else{
            console.log('Turno eliminado con async: ', turnDeleted);
        }
    } catch (error) {
        console.log('Error con async: ', error)
    }
}
    
module.exports = {
    createTurn,
    getTurnFile,
    getTurnDB,
    updateTurnFile,
    updateTurnDB,
    deleteTurnFile,
    deleteTurnDB
}

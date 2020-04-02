const Worker = require('./models/worker');
const fs = require('fs');

let workerDB = [];

const loadData = () => {
    try {
        workerDB = require('./db/worker.json');        
    } catch {
        workerDB = [];
    }
}
const saveDB = () => {
    fs.writeFileSync('src/db/worker.json',JSON.stringify(workerDB,null,"\t"));
}

const createWorker = async (objWorker) => {
    loadData();
    let codeFound = workerDB.findIndex(worker=>{
        return worker.codigo == objWorker.codigo
    })
    if(codeFound>=0){
        console.log(`Ya se encuentra asignado el codigo ${objWorker.codigo}` )
    }else{
        let worker = new Worker({
            nombre:objWorker.nombre,
            codigo:objWorker.codigo,
            rol:objWorker.rol
        })
        workerDB.push(worker);
        saveDB();
        worker.save(function(err,res){
            if(err){
                console.log("El rol debe ser unico ",err)
            }else{
                console.log('Turno guardado: ',res);
            }
        });
    }
}

function getWorkerFile (codigo){
    loadData();
    let workerFound = workerDB.find(function(worker){
        return worker.codigo==codigo;
    })
    if(workerFound==undefined){
        console.log("No se encuentra el codigo: ", codigo);
    }else{
        console.log('Usuario encontrado en el archivo json',workerFound);
    }
}

const getWorkerDB = async (codigo) => {
    //callback
    Worker.find({codigo},function(err,resp){
        if(err){
            console.log(err);
        }else{
            if(!resp){
                console.log("El empleado con el codigo "+codigo+" no existe");
            }else{
                console.log('Empleado de la DB: ', resp);
            }
        }
    })
    //promesa
    Worker.find({codigo})
        .then(resp=>{
            if(!resp){
                console.log(`No existen empleados con el codigo: ${codigo}`)
            }else{
                console.log('Promesa: ', resp);
            }
        })
        .catch(err=>{
            console.log('Error promesa: ',err)
        })
    //async
    try {
        let workerFound = await Worker.find({codigo});
        if(!workerFound){
            console.log(`No se encuentra el empleado con el codigo ${codigo} usando el callback: `);
        }else{
            console.log(`Empleado con el async y await: `, workerFound);
        }
    } catch (error) {
        console.log(err);
    }
    
}

function updateWorkerFile(objWorker){
    loadData();
    // const { codigo, rol, newCodigo} = objWorker;
    // let postWorker = workerDB.findIndex(worker=>{
    //     return worker.codigo==codigo;
    // })
    // let postNewCode = workerDB.findIndex(worker=>{
    //     return worker.codigo==newCodigo;
    // })
    // if(postWorker<0){
    //     console.log('empleado no encontrado', postWorker);
    // }else if(postNewCode>=0){
    //     console.log(`Ya se ha asignado el codigo ${newCodigo} a un empleado`)
    // }else{
    //     workerDB[postWorker].rol=rol;
    //     workerDB[postWorker].codigo=newCodigo;
    //     console.log(workerDB[postWorker]);
    //     saveDB();
    // }
}
const updateWorkerDB = async (objWorker) => {
    const {codigo, newCodigo, rol} = objWorker;
    // Worker.updateOne({codigo:codigo},{rol:rol,codigo:newCodigo},{runValidators:true},(err,resp)=>{
    //     if(err){
    //         console.log('Error del callback',err);
    //     }else{
    //         if(resp.n==0){
    //             console.log(`No se encuentra el codigo: ${codigo} en la base de datos`);
    //         }else{
    //             Worker.find({codigo:newCodigo},(err,resp)=>{
    //                 if(err){
    //                     console.log(err)
    //                 }else{
    //                     console.log('return del callback: ',resp)
    //                 }
    //             })
    //         }
    //     }
    // })

    //promesas
    Worker.updateOne({codigo:codigo},{codigo:newCodigo,rol:rol},{runValidators:true})
        .then(update=>{
            if(update.n==0){
                return 'Consulta realizada pero no se encontro el codigo'
            }else{
                return Worker.find({codigo:newCodigo});
            }
        })
        .then(resp=>{
            if(typeof(resp)==="string"){
                console.log(resp)
            }else{
                console.log('Turno actualizado "promesa" ',resp);
            }
        })
        .catch(err=>{
            console.log(err);
        });
    //async
    // try {
    //     let query = await Worker.updateOne({codigo:codigo},{codigo:newCodigo,rol:rol},{runValidators:true});
    //     if(query.n==0){
    //         return console.log("No se encontro el codigo: ", codigo);
    //     }
    //     let workerFound = await Worker.find({codigo:newCodigo})
    //     console.log('Empleaado modificado: ',workerFound);
    // } catch (error) {
    //     console.log(error)
    // }
}

module.exports = {
    createWorker,
    getWorkerFile,
    getWorkerDB,
    updateWorkerFile,
    updateWorkerDB
}
let con = console.log;
const User = require('./models/user');
const fs = require('fs');

let userDB = [];

const loadData = () =>{
    try {
        userDB=require('./db/user.json');
    } catch {
        userDB=[];
    }
}
const saveDB = () => {
    fs.writeFileSync('src/db/user.json',JSON.stringify(userDB,null,"\t"))
}
const createUser = async(objUser) => {
    loadData();
    const {nombre,codigo, tipoMembresia} = objUser;
    const user = new User({
        nombre,
        codigo,
        tipoMembresia,
    })
    userDB.push(user);
    saveDB();
    await user.save();
}

function getUserFile(idUser){
    loadData();
    let userFinded = userDB.find(user=>{
        return user._id==idUser
    })
    if(userFinded==undefined){
        return con(`El id: ${idUser} no se encuentra en la BD`);
    }
    con(`Usuario del archivo encontrado: `,userFinded);
}

const getUserDB = async (idUser) => {
    //callback
    User.findById(idUser,(err,res)=>{
        if(err){
            con(`Error de callback:`, err);
        }else{
            if(res==null){
                con(`No se encuentra el id: ${idUser}`);
            }else{
                con(`Turno encontrado en mongo con el callback: `, res)
            }
        }
    })
    //promesa
    User.findById(idUser)
    .then(res=>{
        if(res==undefined){
            con(`No se encuentra el usuario ${idUser}`);
        }else{
            con('Turno encontrado con la promesa: ',res)
        }
    })
    .catch(err=>{
        con(`Error usando promesas`, err);
    })
    //async y await
    try {
        const userFinded = await User.findById(idUser);
        if(userFinded==null){
            con(`el id: ${idUser} no existe`);
        }else{
            con('Turno encontrado con el async: ', userFinded)
        }
    } catch (e) {
        con(`Error usando el async: `,e)
    }
}

function updateUserFile(idUser, tipoMembresia){
    loadData();
    let postnUser = userDB.findIndex(user=>{
        return user._id==idUser;
    })
    if(postnUser<0){
        con(`El id: ${idUser} no se encuentra en el archivo`);
    }else{
        userDB[postnUser].tipoMembresia=tipoMembresia;
        saveDB();
        con(`Usuario encontrado y actualizado: `, userDB[postnUser])
    }
}
const updateUserDB = (tipoMembresia, codigo) =>{
    // con(typeof(codigo));
    // User.findOne({codigo:codigo},"nombre codigo",(err,res)=>{
    //     if(err){
    //         con(`Error usando callback: `, err);
    //     }else{
    //         if(res==undefined){
    //             con(`No se encuentra el id: ${idUser} en la base de datos`)
    //         }else{
    //callback
    User.updateOne({codigo:codigo},{tipoMembresia:tipoMembresia},(err,res)=>{
        if(err){
        }else{
            if(res.nModified==0){
                con(`No se encuentra el codigo: ${codigo}`,res.nModified)
            }else{
                User.find({codigo:codigo},(err,res)=>{
                    if(err){
                        con(err);
                    }else{
                        con('respuesta: ',res)
                    }
                })
            }
        }
    })
}

function deleteUserFile(codigo){
    loadData();
    let postUserToDelete = userDB.findIndex(user=>{
        return user.codigo==codigo;
    })
    if(postUserToDelete<0){
        con(`No se encuentra el codigo: ${codigo}`)
    }else{
        userDB.splice(postUserToDelete,1)
        saveDB();
    }
}
const deleteUserDB = async (codigo) => {
    // User.deleteOne({codigo:codigo},(err,res)=>{
    //     if(err){
    //         con(err)
    //     }else{
    //         con("Usuario eliminado con el callback",res);
    //     }
    // })
    //promesa
    // User.deleteOne({codigo:codigo})
    //     .then(resp=>{
    //         con(`Usuario eliminado con la promesa `, resp)
    //     })
    //     .catch(err=>{
    //         con('error usando la promesa: ',err)
    //     })
    // Async y await
    try {
        let userDeleted = await User.deleteOne({codigo:codigo});
        con('Async y awairt: ',userDeleted);
    } catch (error) {
        con('Error usando el async', error)
    }
}

module.exports = {
    createUser,
    getUserFile,
    getUserDB,
    updateUserFile,
    updateUserDB,
    deleteUserFile,
    deleteUserDB
}


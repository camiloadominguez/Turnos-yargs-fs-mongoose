const argv = require('yargs')
.command('newTurn','Ingresa un nuevo turno',{
    campo:{
        alias:'c',
        demand:true,
        describe: 'Campo a utilizar por el turno'
    },
    hora:{
        alias:'h',
        demand:true,
        describe:'Hora del turno'
    },
    idusuario:{
        alias:'u',
        demand:true,
        describe:'id del usuario',
    },
    idmonitor:{
        alias:'m',
        describe:'Codigo del monitor',
        default: null
    },
    idprofesor:{
        alias:'p',
        describe:'codigo del profesor',
        default: null
    },
    tiempo:{
        alias:'t',
        default:1,
        describe: 'Duracion del turno'
    }
})
.command('getTurn','Trae el usuario por el id',{
    idusuario:{
        demand:true,
        alias:'u',
        describe: 'id del usuario a buscar'
    }
})
.command('updateTurn','Actualiza un turno pasando el id',{
    idturno:{
        demand:true,
        alias:'k',
        describe:'Id del turno que se va a actualizar'
    },
    tiempo:{
        alias:'t',
        describe:'Modificar el tiempo de que se va a usar el campo'
    },
    idmonitor:{
        alias:'m',
        describe:'Modificar el monitor'
    },
    idprofesor:{
        alias:'p',
        describe:'Modificar el profesor'
    }
})
.command('deleteTurn','Turno a eliminar',{
    idturno:{
        alias:'k',
        describe:"id del turno que se va a eliminar",
        demand:true
    }
})
.command('newUser','Ingrese un nuevo usuario a la base de datos', {
    nombre:{
        alias:'n',
        demand:true,
        describe:'Nombre del usuario'
    },
    codigo:{
        alias:'c',
        demand:true,
        describe:'Codigo del usuario'
    },
    tipoMembresia:{
        alias:'t',
        demand:true,
        describe:'Tipo de membresia para poder ingresar',
        choices:['socio','invitado','cortesia', 'canje']
    },
})
.command("getUser","Trae un usuario",{
    idUsuario:{
        alias:"k",
        derscribe:"id del usuario que se va a mostrar",
        demand:true
    }
})
.command("updateUser","Actualizar un usuario de la BD",{
    // idUser:{
    //     demand:true,
    //     alias:"k",
    //     describe:"id del usaurio que se va a actualizar"
    // },
    codigo:{
        alias:"c",
        demand:true,
        describe:"Codigo en caso de querer actualizar por el codigo"
    },
    tipoMembresia:{
        demand:true,
        alias:"t",
        derscribe:"Modifcar el tipo de membresia con la que ingrea al establecimiento",
        choices:["socio","invitado","canje","cortesia"]
    }
})
.command("deleteUser","Eliminar un usuario", {
    codigo:{
        demand:true,
        describe:"codigo del usuario a eliminar",
        alias:"c"
    }
})
.command("newWorker", "Crea un nuevo empleado", {
    nombre:{
        alias:"n",
        describe: "Nombre del empleado",
        demand: true
    },
    codigo:{
        alias:"c",
        describe:"Codigo del empleado",
        demand:true
    },
    rol:{
        alias:"r",
        describe:"rol del empleado",
        demand: true,
        choices: ["monitor", "profesor"]
    }
})
.command("getWorker","Muestra el empleado a visualizar", {
    codigo:{
        alias:"c",
        demand:true,
        describe:"Codigo del empleado a obtener"
    }
})
.command("updateWorker","Trabajador que se va a actualizar", {
    rol:{
        alias:"r",
        describe:"Nuevo rol del empleado",
        demand: true,
        choices:["monitor","profesor"]
    },
    codigo:{
        alias:"c",
        describe: "Codigo del empleado que se  va a actualizar",
        demand: true
    },
    newCodigo:{
        alias:"n",
        describe:"Nuevo codigo del empleado",
        demand:true
    }
})
.help().argv;

module.exports = {
    argv
}

/*
    turnos:{
        campo,
        hora,
        monitor,
        profesor,
        tiempo
    },
    empleados:{
        nombre:,
        rol
    },
    usuarios:{
        nombre,
        codigo,
        tipoMembresia
    }
*/
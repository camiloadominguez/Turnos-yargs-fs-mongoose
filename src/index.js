const colors = require('colors');
const {argv} = require('./config/yargs');
require('./config/database');

const {createTurn, getTurnFile, getTurnDB, updateTurnFile, updateTurnDB, deleteTurnFile, deleteTurnDB} = require('./turn');
const {createUser, getUserFile, getUserDB, updateUserFile, updateUserDB, deleteUserFile, deleteUserDB} = require('./user');
const {createWorker, getWorkerFile, getWorkerDB, updateWorkerFile, updateWorkerDB} = require('./worker')

let con = console.log;

let comando = argv._[0];

(()=>{
    switch (comando){
        case 'newTurn':
            createTurn(argv)
        break;
        case 'getTurn':
            getTurnFile(argv.idusuario)
                .then(turn=>con(`Turno del archivo creado `,turn))
                .catch(err=>con(err));
            
            getTurnDB(argv.idusuario);
        break;
        case 'updateTurn':
            // const {idturno,tiempo ,idmonitor , idprofesor} = argv;
            updateTurnFile(argv);
            updateTurnDB(argv)
        break;
        case "deleteTurn":
            deleteTurnFile(argv.idturno);
            deleteTurnDB(argv.k);
        break;
        case "newWorker":
            createWorker(argv);
        break;
        case 'newUser':
            createUser(argv);
        break;
        case "getWorker":
            getWorkerFile(argv.codigo);
            getWorkerDB(argv.codigo);
        break;
        case "updateWorker":
            updateWorkerFile(argv);
            updateWorkerDB(argv)
        break;
        case "getUser":
            getUserFile(argv.idUsuario);
            getUserDB(argv.idUsuario);
        break;
        case "updateUser":
            updateUserFile(argv.idUser,argv.tipoMembresia);
            updateUserDB(argv.tipoMembresia, argv.codigo);
        break;
        case "deleteUser":
            deleteUserFile(argv.codigo);
            deleteUserDB(argv.codigo);
        break;
        default:
            con('comando no reconocido'.red);
    }
})();




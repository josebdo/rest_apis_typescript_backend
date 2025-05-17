import express from 'express'
import colors from 'colors'
import cors, {CorsOptions} from "cors"
import morgan from 'morgan'
import router from './router'
import db from './config/db'


//conectar a la base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue('Conexion exitosa a la BD') );
        
    } catch (error) {
        // console.log(error);
        console.log(colors.bgRed.bold('Hubo un error al conectar a la DB'));
        
        
    }
}

connectDB()

//isntancia de exoress
const server = express()

//Permitr conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
       if (origin === process.env.FRONTEND_URL) {
         callback(null, true)
       } else {
        callback(new Error('Error de CORS'))
        
       }
        
    }
}

server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)


server.get('/api',(req, res) => {
    res.json({msg: 'Desde api'})
})

export default server
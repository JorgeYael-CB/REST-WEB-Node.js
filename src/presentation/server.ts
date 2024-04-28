import express, { Router } from 'express';
import path from 'path';



interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}


export class Server{

    private app = express(); // solo se queda aqui para que no afecte lo demas.
    private readonly port: number; // readonly no se puede cambiar su valor fuera del constructor
    private readonly public_path: string;
    private readonly routes: Router;

    constructor( options: Options ){
        const { port, routes, public_path = 'public' } = options;

        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }


    start(){

        //* Middlwares
        this.app.use( express.json() ); // lo formatea todo a JSON y así aceptamos method POST - RAW
        this.app.use( express.urlencoded( {extended: true} ) ); // x-www-form-urlencoded


        //* public folder
        this.app.use(express.static( this.public_path ));


        //* Routes
        this.app.use( this.routes );


        //* Cualquier ruta no definida pasa por aquí - SPA
        this.app.get('*' , (req, res) => {
            const indexPath = path.join( __dirname + `../../../${this.public_path}/index.html` );
            res.sendFile(indexPath);

            return;
        })


        // escuchar peticiones
        this.app.listen( this.port, () => {
            console.log(`Server Running on ${this.port}`);
        })
    }

}


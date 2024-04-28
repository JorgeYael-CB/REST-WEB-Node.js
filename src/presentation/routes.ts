import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";



export class AppRoutes{


    static get routes(): Router{
        const router = Router();


        //Importamos las rutas de TODOS
        router.use( '/api/todos', TodoRoutes.routes );


        return router;
    }

}
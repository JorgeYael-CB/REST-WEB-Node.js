//?STATUS CODES: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdadteDto } from "../../domain/dtos/todos";

interface TodoProps{
    id: number;
    text: string;
    completedAt?: Date | null;
}

export class TodosController{
    // * DI
    constructor(){};


    public getTodos = async(req: Request, res: Response) => {
        return res.json( await prisma.todo.findMany() );
    };


    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id; // extraemos la variable de la URL

        if( !id ) return res.status(400).json({error: `ID argument not is a number`});
        const todo = await prisma.todo.findUnique({ where: { id }}) ?? null;

        (todo) ? res.json( todo ) : res.status(404).json({error: `Todo with id: ${id} not found`});
    }


    public createTodo = async(req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create( req.body );
        if( error ) return res.status(400).json({error});

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json( todo );
    };


    public updateTodoById = async(req: Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdadteDto.create({ ...req.body, id})
        if( error ) return res.status(400).json({error});

        const todo = await prisma.todo.findUnique({ where: { id }}) ?? null;
        if( !todo ) return res.status(404).json({error: `Todo with id: ${id} not found`});

        const todoUpdated = await prisma.todo.update({ // actualizar un nuevo valor
            where: {id}, // el valor que se modifica
            data: updateTodoDto!.values // el nuevo valor
        })

        res.json( todoUpdated );
    };


    public deleteTodo = async (req: Request, res:Response) => {
        const id = +req.params.id;
        if( !id ) return res.status(400).json(`Id is required`);

        const todoExist = await prisma.todo.findUnique({ where: { id }}) ?? null;
        if( !todoExist ) return res.status(404).json(`todo with id: ${id} not found`);

        await prisma.todo.delete({
            where: {id}
        })

        res.json( 'Todo deleted' );
    };

}


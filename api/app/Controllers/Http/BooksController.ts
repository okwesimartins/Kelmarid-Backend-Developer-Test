import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book';
export default class BooksController {
   
    public async show ({request, response}: HttpContextContract){
        const page = request.input('page', 1)
        let nameSearch = request.input('name');
        let getbooks;
        if(nameSearch){
            getbooks = await (await Book.query().where('name', 'like', `%${nameSearch}%`).paginate(page, 4)).toJSON()
        }else{
            getbooks = await (await Book.query().paginate(page, 4)).toJSON()
        }
        response.status(200)
        return getbooks
    }

    public async update ({params, request, response}: HttpContextContract){
        const name = request.input('name');

        const book = await Book.findOrFail(params.id);

        book.name = name
        
        response.status(200);
        return book.save();
}
}

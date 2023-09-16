
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Author from 'App/Models/Author'
// import Book from 'App/Models/Book';
export default class AuthorsController {
   

    public async show ({request, response}: HttpContextContract){
        const page = request.input('page', 1)
        let nameSearch = request.input('name');
        let getauthors;
        if(nameSearch){
            getauthors = await (await Author.query().where('name', 'like', `%${nameSearch}%`).withCount('book').paginate(page, 4)).toJSON()
        }else{
            getauthors = await (await Author.query().withCount('book').paginate(page, 4)).toJSON()
        }
        
       
        const authorarray: { name: any; number_of_books: any; }[] = [];
        
        getauthors.data.forEach((value)=>{
            const totalbooks = value.$extras.book_count;
            const finalResult  = {
                "name": value.name,
                "number_of_books": totalbooks
            }

            authorarray.push(finalResult)
        })
       

        const result = {
            "meta": getauthors.meta,
            "data": authorarray
        }
        response.status(200)
        return result

    }

    public async update ({params, request, response}: HttpContextContract){
            const body = request.body();

            const author = await Author.findOrFail(params.id);

            author.name = body.name
            
            response.status(200);
            return author.save();
    }

    public async destroy ({params, response}: HttpContextContract){
        const author = await Author.findOrFail(params.id);

        author.delete();
        
        response.status(200)
        return {message: "Author deleted"}
    }
}

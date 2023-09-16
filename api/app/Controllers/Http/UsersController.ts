import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'



export default class UsersController {
    public async login ({ request, response, auth }: HttpContextContract) {
        
        const body = request.body();
        
        const username = body.username;
        const password = body.password;

        const token = await auth.attempt(username, password)
        
        response.status(200)

        return {token};
    }
}

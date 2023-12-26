import { Router, request } from "express";
import createUserController from '../modules/users/useCases/createUser'
// TODO: Factory vs Facade Pattern

export const usersRoutes = Router() 

usersRoutes.post('/', (request, response) => {
    return createUserController().handle(request, response)
})

usersRoutes.post('/teste', (request, response) => {
    const {
        email, 
        password, 
        full_name, 
        social_name, 
        sex, 
        cellphone, 
        cpf, 
        date_of_birth, 
        state, 
        city 
    } = request.body
    
    return response.json({ message: 'ok' })
})
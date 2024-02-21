import express from 'express';
import path from 'path';

// import UsersFs from '../../data/fs/users.fs.js';
// const usersManager = new UsersFs('./src/data/fs/files/users.json');

import { usersManager } from '../../data/mongo/manager.mongo.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        // Leer los filtros y opciones de ordenamiento de la consulta
        const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
        const sortOptions = req.query.sort ? JSON.parse(req.query.sort) : {};

        // Obtener todos los usuarios aplicando filtros y ordenamiento
        const allUsers = await usersManager.read({ filter: filters, sort: sortOptions });

        // Enviar la respuesta
        res.json({
            statusCode: 200,
            response: allUsers
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newUser = req.body;
        const createdUser = await usersManager.create(newUser);
        res.status(201).json({
            statusCode: 201,
            response: createdUser
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    try {
        const user = await usersManager.readOne(userId);
        if (user) {
            res.json({
                statusCode: 200,
                response: user
            });
        } else {
            const notFoundError = new Error("User not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/email/:email', async (req, res, next) => {
    const userEmail = req.params.email;
    try {
        const user = await usersManager.readByEmail(userEmail);
        if (user) {
            res.json({
                statusCode: 200,
                response: user
            });
        } else {
            const notFoundError = new Error("User not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    try {
        const updatedUser = await usersManager.update(userId, req.body);
        if (updatedUser) {
            res.json({
                statusCode: 200,
                response: updatedUser
            });
        } else {
            const notFoundError = new Error("User not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

// Eliminar un usuario por su ID
router.delete('/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    try {
        const deletedUser = await usersManager.destroy(userId);
        if (deletedUser) {
            res.json({
                statusCode: 200,
                response: "User deleted successfully"
            });
        } else {
            const notFoundError = new Error("User not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

export default router;


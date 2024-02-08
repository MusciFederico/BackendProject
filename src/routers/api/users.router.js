const express = require('express');
const router = express.Router();
const path = require('path');

const UsersFs = require('../../data/fs/users.fs');
const usersManager = new UsersFs(path.join(__dirname, '..', '..', 'data', 'fs', 'files', 'users.json'));

// const { usersManager } = require('../../data/mongo/manager.mongo');

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await usersManager.read();
        if (allUsers.length > 0) {
            res.json({
                statusCode: 200,
                response: allUsers
            });
        } else {
            const notFoundError = new Error("Users not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
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

module.exports = router;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TodoController {
    static async all(req, res) {
        const userId = req.loggedUser.id;
        const todo = await prisma.todo.findMany({
            where: {
                userId: Number(userId)
            }
        });
        res.status(200).json({
            message: 'Success',
            data: todo
        });
    }

    static async detail(req, res) {
        try {
            const result = await prisma.todo.findUnique({
                where: {
                    id: Number(req.params.id),
                    userId: Number(req.loggedUser.id)
                }
            })
            if (result === null) {
                res.status(404).json({
                    message: 'Not Found'
                });    
                return
            }
            res.status(200).json({
                message: 'Success',
                data: result
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
    
    static async store(req, res) {
        try {
            const userId = req.loggedUser.id;
            await prisma.todo.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    userId: Number(userId),
                }
            });

            res.status(200).json({
                message: 'Success',
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
    
    static async update(req, res) {
        try {
            await prisma.todo.update({
                where: {
                    id: Number(req.params.id),
                    userId: Number(req.loggedUser.id)
                },
                data: {
                    title: req.body.title || undefined,
                    description: req.body.description || undefined,
                }
            });
            res.status(200).json({
                message: 'Success',
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
    
    static async delete(req, res) {
        try {
            await prisma.todo.delete({
                where: {
                    id: Number(req.params.id),
                    userId: Number(req.loggedUser.id)
                }
            });
            res.status(200).json({
                message: 'Success',
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = TodoController
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TodoController {
    static async all(req, res) {
        const todo = await prisma.todo.findMany();
        res.status(200).json({
            message: 'Success',
            data: todo
        });
    }

    static async detail(req, res, next) {
        try {
            const result = await prisma.todo.findUnique({
                where: {
                    id: Number(req.params.id)
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
            await prisma.todo.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    userId: Number("1"),
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
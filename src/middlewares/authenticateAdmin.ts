import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, senha } = req.body; // Recebe email e senha da requisição

    // Verifica se o usuário existe
    const user = await prisma.userAdmin.findUnique({
        where: { email },
    });
    console.log(user);
    console.log(senha);

    // Verifica se o usuário foi encontrado e se a senha está correta
    if (user && user.senha === senha) {
        next(); // Usuário autenticado, prossegue para a próxima função
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' }); // Retorna erro se as credenciais forem inválidas
    }
};

export default authenticateAdmin;

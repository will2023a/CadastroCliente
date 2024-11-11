import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para obter usuários

// Função para criar um novo usuário
export const createUserAdmin = async (req: Request, res: Response) => {
    const { email, senha, nome, sobrenome, cpf, grupo } = req.body;

    try {
        const newUser = await prisma.userAdmin.create({
            data: {
                email,
                senha,
                nome,
                sobrenome,
                cpf,
                grupo
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// Função para filtrar um usuário pelo ID
// userController.ts


import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para obter usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        endereco: true, // Inclui o endereço na consulta
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// Função para criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  const { email, nome, sobrenome, rg, cpf, nascimento, grupo, enderecoId } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        nome,
        sobrenome,
        rg,
        cpf,
        nascimento,
        grupo,
        endereco: { connect: { id: enderecoId } }, // Conecta o usuário ao endereço existente
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Função para filtrar um usuário pelo ID
// userController.ts

export const findUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: { endereco: true },
        });

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};


// Função para deletar um usuário
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};

// Função para atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, nome, sobrenome, rg, cpf, nascimento, grupo, enderecoId } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        nome,
        sobrenome,
        rg,
        cpf,
        nascimento,
        grupo,
        endereco: { connect: { id: enderecoId } }, // Conecta ao endereço existente
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

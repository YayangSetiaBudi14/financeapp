import { PrismaClient } from "@prisma/client";
import e, { query } from "express";

const prisma = new PrismaClient();

export const createIncome = async (req, res) => {
    try {
        const response = await prisma.income.create({
            data: {
                amount: req.body.amount,
                time_stamp: req.body.time_stamp,
                id_wallet: req.body.id_wallet,
            },
        });
        res.status(201).json({ msg: 'Income created successfully', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllIcnome = async (req, res) => {
    try {
        const response = await prisma.income.findMany();
        res.status(200).json({ msg: 'All incomes', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllIncomeByUsername = async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM get_income_by_username(${req.params.username})`;
        if (!result) {
            res.status(404).json({ msg: 'Income not found' });
        } else {
            res.status(200).json({ msg: 'Income found', data: result });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllIncomeInPeriode = async (req, res) => {
    try {
        console.log(req.body);
        const result = await prisma.$queryRaw`SELECT * FROM get_income_for_period(${req.body.username}, ${req.body.start},${req.body.end})`;
        if (!result) {
            res.status(404).json({ msg: 'Income not found' });
        } else {
            res.status(200).json({ msg: 'Income found', data: result });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getIncomeByUser = async (req, res) => {
    const { username } = req.params; // Extract the username from the URL parameter

    try {
        const userIncomes = await prisma.income.findMany({
            where: { wallet: { username } },
            select: {
                id_income: true,
                id_wallet: true,
                amount: true,
                time_stamp: true,
                wallet: { select: { username: true, tipe: true } },
            },
        });

        if (!userIncomes) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            return res.status(200).json({ msg: 'User found', data: userIncomes });
        }
    } catch (error) {
        console.error('Error retrieving user outcomes:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
};


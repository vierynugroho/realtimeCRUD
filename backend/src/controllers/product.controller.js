// TODO: Controller
// logika aplikasi dan interaksi models dan views
// --------------------------------------

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
	try {
		const response = await prisma.product.findMany();
		res.status(200).json({ status: 200, data: response });
	} catch (error) {
		res.status(500).json({ status: 500, message: error });
	}
};

const getProduct = async (req, res) => {
	try {
		const response = await prisma.product.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json({
			status: 200,
			data: response,
		});
	} catch (error) {
		res.status(500).json({
			status: 404,
			message: error.message,
		});
	}
};

const createProduct = async (req, res) => {
	const { name, price } = req.body;

	try {
		const product = await prisma.product.create({
			data: {
				name: name,
				price: Number(price),
			},
		});

		res.status(201).json({
			status: 201,
			data: product,
		});
	} catch (error) {
		res.status(400).json({
			status: 400,
			message: error.message,
		});
	}
};

const editProduct = async (req, res) => {
	const { name, price } = req.body;

	try {
		const product = await prisma.product.update({
			where: {
				id: Number(req.params.id),
			},
			data: {
				name: name,
				price: Number(price),
			},
		});

		res.status(200).json({
			status: 200,
			data: product,
		});
	} catch (error) {
		res.status(400).json({
			status: 400,
			message: error.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		await prisma.product.delete({
			where: {
				id: Number(req.params.id),
			},
		});

		res.status(200).json({
			status: 200,
		});
	} catch (error) {
		res.status(400).json({
			status: 400,
			message: error.message,
		});
	}
};

export { getAllProducts, getProduct, createProduct, editProduct, deleteProduct };

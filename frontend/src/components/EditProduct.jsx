import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditProduct = () => {
	const navigate = useNavigate();

	const { id } = useParams();

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	const updateProduct = async (e) => {
		e.preventDefault();
		await axios.patch(`http://localhost:2000/products/${id}`, {
			name: name,
			price: Number(price),
		});

		navigate('/');
	};

	useEffect(() => {
		const getProductById = async () => {
			const response = await axios.get(`http://localhost:2000/products/${id}`);
			console.log(response.data);
			setName(response.data.data.name);
			setPrice(response.data.data.price);
		};

		getProductById();
	}, [id]);

	return (
		<div className='max-w-lg mx-auto my-10 text-white p-8 rounded-xl shadow shadow-slate-600'>
			<h2 className='font-bold text-lg pb-3 border-b'>Edit Product</h2>
			<form
				className='my-10'
				onSubmit={updateProduct}
			>
				<div className='flex flex-col'>
					<div className='mb-5'>
						<label className='font-bold text-white'>Product Name</label>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type='text'
							className='w-full py-3 mt-1 border border-slate-600 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover: shadow'
							placeholder='Product Name'
						/>
					</div>
					<div className='mb-5'>
						<label className='font-bold text-white'>Price</label>
						<input
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							type='number'
							className='w-full py-3 mt-1 border border-slate-600 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover: shadow'
							placeholder='Price'
						/>
					</div>
				</div>
				<button
					type='submit'
					className='w-full py-3 font-bold text-black bg-slate-100 hover:bg-slate-200 rounded-lg border-slate-500 hover:shadow'
				>
					Update
				</button>
			</form>
		</div>
	);
};

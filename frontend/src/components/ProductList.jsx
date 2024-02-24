import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';

export const ProductList = () => {
	const { mutate } = useSWRConfig();

	const fetchProduct = async () => {
		const response = await axios.get('http://localhost:2000/products');
		return response.data.data;
	};

	const deleteProduct = async (productId) => {
		await axios.delete(`http://localhost:2000/products/${productId}`);
		mutate('products');
	};

	const { data } = useSWR('products', fetchProduct);
	if (!data) return <h1>Loading...</h1>;

	return (
		<div className='flex flex-col mt-5'>
			<div className='w-full'>
				<Link
					to={'/add'}
					className='bg-white hover:bg-slate-200 border border-slate-50 text-black font-bold py-2 px-4 rounded-lg'
				>
					Add New
				</Link>
				<div className='relative shadow rounded-lg mt-5'>
					<table className='w-full text-sm text-left text-white'>
						<thead className='text-xs text-white uppercase bg-gray-700'>
							<tr>
								<th className='py-3 px-1 text-center'>No</th>
								<th className='py-3 px-6'>Product Name</th>
								<th className='py-3 px-6'>Price</th>
								<th className='py-3 px-1 text-center'>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((product, index) => (
								<tr
									className='border-b'
									key={product.id}
								>
									<td className='py-3 px-1 text-center'>{index + 1}</td>
									<td className='py-3 px-6 text-white font-bold'>{product.name}</td>
									<td className='py-3 px-6'>{product.price}</td>
									<td className='py-3 px-1 text-center'>
										<Link
											to={`/edit/${product.id}`}
											className='font-medium bg-yellow-300 hover:bg-yellow-500 px-3 py-1 rounded text-black mr-1'
										>
											Edit
										</Link>
										<button
											type='button'
											onClick={() => deleteProduct(product.id)}
											className='font-medium bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white mr-1'
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

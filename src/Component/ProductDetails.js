import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../style/productDetails.css";
import { Product } from './Home.js';

function ProductDetailsCard(props) {
	return (

		<div className="main-product">
			<div className="image">
				<img src={props.product.image} alt="product image" />
			</div>
			<div className="details">
				<h1 className="titel">{props.product.title}</h1>
				<p className="discription">{props.product.description}</p>
				<span className="price">Price only: {props.product.price}$</span>
			</div>
			<Link to="/" className="buy">Buy</Link>
		</div>

	);
}

function MoreProducts(props) {
	const products = props.products;

	return (

		<div className="more-products">
			<h2 className="sec-title">Might You Like</h2>
			<div className="products">
				{products.map(productData => (<Product key={productData.id} product={productData} />))}
			</div>
		</div>

	);
}





function ProductDetails() {
	const [productData, setProductData] = useState([]);
	const [products, setProducts] = useState([]);
	const productId = useParams().productId;

	useEffect(() => {

		fetch(`https://fakestoreapi.com/products/${productId}`)
			.then(res => res.json())
			.then(json => setProductData(json));

	}, []);

	useEffect(() => {

		fetch(`https://fakestoreapi.com/products/category/${productData.category}`)
			.then(res => res.json())
			.then(json => setProducts(json));

	}, [productData])

	return (

		<div className="product-details">
			<ProductDetailsCard product={productData} />
			<MoreProducts products={products} />
		</div>

	);
}

export default ProductDetails;
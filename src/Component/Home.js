import "../style/home.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import img1 from '../assets/images/img-1.jpg';
import img2 from '../assets/images/img-2.jpg';
import img3 from '../assets/images/img-3.jpg';

const initialImages = [img1, img2, img3];

function Slider() {
	const [imgLinks] = useState(initialImages);
	const [imgIndex, setImgIndex] = useState(0);

	useEffect(() => {
		const imgs = document.querySelectorAll(".img");

		imgs.forEach(img => {img.style.visibility = "hidden";})
		imgs[imgIndex].style.visibility = "visible";

	}, [imgIndex]);

	// setTimeout(handleIncrement, 3000); // need to fix

	function handleIncrement() {
		const imgs = document.querySelectorAll(".img");
		const maxLen = imgs.length - 1;
		const minLen = 0;
		setImgIndex(imgIndex + 1);
		if (imgIndex >= maxLen) {
			setImgIndex(minLen);
		}
	}

	function handleDecrement() {
		const imgs = document.querySelectorAll(".img");
		const maxLen = imgs.length - 1;
		const minLen = 0;
		setImgIndex(imgIndex - 1);
		if (imgIndex <= minLen) {
			setImgIndex(maxLen);
		}
	}

	function handleClick(e) {
		if (e.target.classList.contains("rightArrow")) {
			handleIncrement();
		} else {
			handleDecrement();
		}
	}

	return (

		<div className="imgContainer">
			{imgLinks.map((link, index) => (<img
																		key={index}
																		src={link}
																		alt="Slider image"
																		className={`img img${index+1}`}
																		 />))}
			<span className="leftArrow arrow" onClick={handleClick}>{"<"}</span>
			<span className="rightArrow arrow" onClick={handleClick}>{">"}</span>
		</div>

	);
}

function Filter({ filterName, onClick }) {
	return (
		<span className={`filter ${filterName}`} onClick={onClick}>{filterName}</span>
	);
}

function Filters({ filter }) {
	const [categories, setCategories] = useState([]);

	useEffect(() => {

		fetch("https://fakestoreapi.com/products/categories")
			.then(res => res.json())
			.then(json => setCategories(json));

	}, []);

	return (

		<div className="filters">
			<Filter key="all" filterName="all" onClick={filter} />
			{categories.map(category => (<Filter key={category} filterName={category} onClick={filter} />))}
		</div>

	);
}

export function Product({ product }) {
	return (

		<div className="product">
			<img src={product.image} alt="product image" />
			<div className="information">
				<h3 className="title">{product.title}</h3>
				<p className="discription">{product.description}</p>
				<span className="price">{product.price}$</span>
			</div>
			<Link to={`/product/${product.id}`} className="details">Details</Link>
		</div>

	);
}

function fetchProductData(category, setData) {
	let link;
	if (category === "all") {
		link = "https://fakestoreapi.com/products";
	} else if (!isNaN(category)) {
		link = `https://fakestoreapi.com/products/${category}`
	} else {
		link = `https://fakestoreapi.com/products/category/${category}`
	}

	fetch(link)
		.then(res => res.json())
		.then(json => setData(json));
};

function Products() {
	const [productsData, setProductsData] = useState([]);
	const [dataValue, setDataValue] = useState("all");
	const [filters, setFilters] = useState([]);

	useEffect(() => {

		fetchProductData(dataValue, (json) => {setProductsData(json)});

		const filtersNode = document.querySelectorAll(".filter");
		const filtersNodeArr = Array.from(filtersNode);
		setFilters(filtersNodeArr);
		
	}, [dataValue]);

	useEffect(() => {
		const element = document.querySelectorAll(".filter")[0];
		// default selected filter
		element.classList.add("selected");
	},[]);

	function handleFilterChange(e) {

		setDataValue(e.target.textContent);

		filters.map((filter) => {filter.classList.remove("selected")});

		e.target.classList.add("selected");
	}

	return (

		<div className="productsSection">
			<Filters filter={handleFilterChange} />
			<div className="products">
				{productsData.map(p => (<Product key={p.id} product={p} />))}
			</div>
		</div>

	);
}

export function Home() {
 return (

 	<div className="home">
 		<Slider />
 		<Products />
 	</div>

 	);	
};
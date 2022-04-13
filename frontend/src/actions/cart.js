export const addToCart = (product, quantity) => {
	// if cart already exists in local storage, use it, otherwise set to empty array
	const cart = localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [];
	const duplicates = cart.filter(cartItem => cartItem._id === product._id);
	if (duplicates.length === 0) {
		const productToAdd = {
			...product,
			quantity: quantity,
		};
		cart.push(productToAdd);
		localStorage.setItem('cart', JSON.stringify(cart));
		return{
			type: 'ADD_TO_CART',
			payload: cart,
		};
	}else{
		cart.forEach(cartItem => {
			if (cartItem._id === product._id) {
				cartItem.quantity = parseInt(cartItem.quantity) + parseInt(quantity);
			}
		});
		localStorage.setItem('cart', JSON.stringify(cart));
		return{
			type: 'ADD_TO_CART',
			payload: cart,
		};
	}
};

export const deleteFromCart = product => {
	const cart = localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [];

	const updatedCart = cart.filter(cartItem => cartItem._id !== product._id);

	localStorage.setItem('cart', JSON.stringify(updatedCart));

	return{
		type: 'DELETE_FROM_CART',
		payload: updatedCart,
	};
};
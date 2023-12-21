function deleteFromCart(product_id) {
    const product = {'product_id': Number(product_id)};
    fetch('/shop/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    window.location.reload();
}
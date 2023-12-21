function deleteProduct(product_id){
    const datos = {'product_id': Number(product_id)};
    const response = fetch('/admin/delete', {
        method: 'DELETE',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.reload();
}
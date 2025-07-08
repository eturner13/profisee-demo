export const getProducts = (async () => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Products');
    const data = await response.json();
    return data;
})

export const getProduct = (async (id) => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Products/' + id);
    const data = await response.json();
    return data;
})

export const updateProduct = (async (product) => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Products/' + product.id, {
        method: 'PUT',
        body: JSON.stringify(product)
    });
    const data = await response.json();
    return data;
})
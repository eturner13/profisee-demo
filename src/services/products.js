export const getProducts = (async () => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Products');
    const data = await response.json();
    return data;
})

export const updateProduct = (async (id, product) => {
    console.log('todo');
})
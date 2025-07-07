export const getSalesPersons = (async () => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/SalesPersons');
    const data = await response.json();
    return data;
})

export const updateSalesPerson = (async (id, salesperson) => {
    console.log('todo');
})
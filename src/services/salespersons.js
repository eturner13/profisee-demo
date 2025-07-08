export const getSalesPersons = async () => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/SalesPersons');
    const data = await response.json();
    return data;
}

export const getSalesPerson = async (id) => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/SalesPersons/' + id);
    const data = await response.json();
    return data;
}

export const updateSalesPerson = async (salesperson) => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/SalesPersons/' + salesperson.id, {
        method: 'PUT',
        body: JSON.stringify(salesperson)
    });
    const data = await response.json();
    return data;
}
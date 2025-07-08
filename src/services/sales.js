export const getSales = async () => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Sales');
    const data = await response.json();
    return data;
}

export const createNewSale = async (sale) => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Sales', {
        method: 'POST',
        body: JSON.stringify(sale)
    });
    const data = await response.json();
    return data;
}

export const getSalesData = (sales) => {
    return {

    };
}


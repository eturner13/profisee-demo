export const getSales = (async () => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Sales');
    const data = await response.json();
    return data;
})
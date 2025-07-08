export const getCustomers = async () => {
    const response = await fetch('https://profiseebespokedbikesapi.azurewebsites.net/api/Customers');
    const data = await response.json();
    return data;
}
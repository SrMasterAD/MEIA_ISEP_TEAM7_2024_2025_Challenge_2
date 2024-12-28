const dishes = ['Carne Vermelha', 'Frutos do Mar', 'Massas'];

const wineRecommendation = [
    { name: 'Vinho Especial', type: 'Cabernet Sauvignon', price: 'R$100' }
];

const populateTable = (tableId, data, templateFn) => {
    const table = document.getElementById(tableId);
    if (table) table.innerHTML = data.map(templateFn).join('');
};

const recommendationTemplate = (wine) => `
    <tr>
        <td>${wine.name}</td>
        <td>${wine.type}</td>
        <td>${wine.price}</td>
    </tr>
`;

const dishSelect = document.getElementById('dish-select');
if (dishSelect) {
    dishSelect.innerHTML = dishes.map(dish => `<option value="${dish}">${dish}</option>`).join('');
}

window.resetDishes = () => {
    dishSelect.selectedIndex = 0; // Reset selection
    populateTable('recommendation', [], () => ''); // Clear recommendation table
};

window.findWine = () => {
    populateTable('recommendation', wineRecommendation, recommendationTemplate);
};

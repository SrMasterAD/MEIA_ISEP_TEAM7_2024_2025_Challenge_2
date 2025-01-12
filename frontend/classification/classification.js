document.addEventListener('DOMContentLoaded', function () {
    // Dish options and wine recommendations
    const dishes = ['Red Meat', 'Seafood', 'Pasta'];

    const wineRecommendation = [
        { name: 'Special Wine', type: 'Cabernet Sauvignon', price: '$100' }
    ];

    // Populate a table dynamically
    const populateTable = (tableId, data, templateFn) => {
        const table = document.getElementById(tableId);
        if (table) table.innerHTML = data.map(templateFn).join('');
    };

    // Template for recommendations
    const recommendationTemplate = (wine) => `
        <tr>
            <td>${wine.name}</td>
            <td>${wine.type}</td>
            <td>${wine.price}</td>
        </tr>
    `;

    // Populate the dish dropdown
    const dishSelect = document.getElementById('dish-select');
    if (dishSelect) {
        dishSelect.innerHTML = dishes.map(dish => `<option value="${dish}">${dish}</option>`).join('');
    }

    // Reset function: clear recommendations and reset dropdown
    window.resetDishes = () => {
        dishSelect.selectedIndex = 0; // Reset selection
        populateTable('recommendation', [], () => ''); // Clear recommendation table
        document.getElementById('recommendation-section').style.display = 'none'; // Hide results section
    };

    // Search function: populate and show recommendations
    window.findWine = () => {
        populateTable('recommendation', wineRecommendation, recommendationTemplate);
        document.getElementById('recommendation-section').style.display = 'block'; // Show results section
    };
});

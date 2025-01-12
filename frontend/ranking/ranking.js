document.addEventListener('DOMContentLoaded', function () {
    // Criteria Data
    const criteriaData = [
        { name: 'Acidity', isMinimized: false },
        { name: 'Price', isMinimized: true },
        { name: 'Alcohol Content', isMinimized: false }
    ];

    // Sample Results
    const sampleResults = [
        { name: 'Wine A', type: 'Red', grapes: 'Cabernet Sauvignon', abv: '13.5%', country: 'France', region: 'Bordeaux', winery: 'Chateau XYZ', website: 'https://example.com' },
        { name: 'Wine B', type: 'White', grapes: 'Chardonnay', abv: '12.0%', country: 'USA', region: 'Napa Valley', winery: 'Winery ABC', website: 'https://example.com' }
    ];

    // Helper to populate a table
    const populateTable = (tableId, data, templateFn) => {
        const tableBody = document.getElementById(tableId);
        if (!tableBody) {
            console.error(`Table with id '${tableId}' or its <tbody> is missing in the DOM.`);
            return;
        }
        tableBody.innerHTML = data.map((item, index) => templateFn(item, index)).join('');
    };

    // Template for criteria table rows
    const criteriaTemplate = (criteria, index) => `
        <tr>
            <td>${criteria.name}</td>
            <td><input type="range" id="weight-${index}" min="0" max="10" value="5"></td>
            <td>
                <select id="min-max-${index}">
                    <option value="min" ${criteria.isMinimized ? 'selected' : ''}>Minimize</option>
                    <option value="max" ${!criteria.isMinimized ? 'selected' : ''}>Maximize</option>
                </select>
            </td>
        </tr>
    `;

    // Template for results table rows
    const resultsTemplate = (result, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${result.name}</td>
            <td>${result.type}</td>
            <td>${result.grapes}</td>
            <td>${result.abv}</td>
            <td>${result.country}</td>
            <td>${result.region}</td>
            <td>${result.winery}</td>
            <td><a href="${result.website}" target="_blank">Visit</a></td>
        </tr>
    `;

    // Populate criteria table
    const populateCriteriaTable = () => {
        populateTable('criteria-table', criteriaData, criteriaTemplate);
    };

    // Reset function
    window.resetCriteria = () => {
        // Reset sliders and dropdowns
        criteriaData.forEach((_, index) => {
            const weightElement = document.getElementById(`weight-${index}`);
            const minMaxElement = document.getElementById(`min-max-${index}`);
            if (weightElement) weightElement.value = 5; // Default value
            if (minMaxElement) minMaxElement.value = 'max'; // Default option
        });

        // Hide results and clear table
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) resultsSection.style.display = 'none';

        const resultsTableBody = document.getElementById('results-table')?.querySelector('tbody');
        if (resultsTableBody) resultsTableBody.innerHTML = '';
    };

    // Search function
    window.searchResults = () => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) resultsSection.style.display = 'block';
        populateTable('results-table', sampleResults, resultsTemplate);
    };

    // Populate criteria table on load
    populateCriteriaTable();
});

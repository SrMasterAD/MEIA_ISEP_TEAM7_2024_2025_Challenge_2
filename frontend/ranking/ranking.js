const criteriaData = [
    { name: 'Acidez', isMinimized: false },
    { name: 'Preço', isMinimized: true },
    { name: 'Teor Alcoólico', isMinimized: false }
];

const sampleResults = [
    { name: 'Vinho A', score: 9.2, criteriaScore: '8, 9, 10', price: 'R$50' },
    { name: 'Vinho B', score: 8.5, criteriaScore: '7, 8, 10', price: 'R$40' },
    { name: 'Vinho C', score: 8.0, criteriaScore: '7, 7, 9', price: 'R$60' }
];

const populateTable = (tableId, data, templateFn) => {
    const table = document.getElementById(tableId);
    if (table) table.innerHTML = data.map(templateFn).join('');
};

const criteriaTemplate = (criteria, index) => `
    <tr>
        <td>${criteria.name}</td>
        <td><input type="range" id="peso-${index}" min="0" max="10" value="5"></td>
        <td>
            <select id="min-max-${index}">
                <option value="min" ${criteria.isMinimized ? 'selected' : ''}>Minimizar</option>
                <option value="max" ${!criteria.isMinimized ? 'selected' : ''}>Maximizar</option>
            </select>
        </td>
    </tr>
`;

const resultsTemplate = (result) => `
    <tr>
        <td>${result.name}</td>
        <td>${result.score}</td>
        <td>${result.criteriaScore}</td>
        <td>${result.price}</td>
    </tr>
`;

populateTable('criteria-table', criteriaData, criteriaTemplate);

window.resetCriteria = () => {
    criteriaData.forEach((_, index) => {
        document.getElementById(`peso-${index}`).value = 5;
        document.getElementById(`min-max-${index}`).value = 'max';
    });
    populateTable('results-table', [], () => ''); // Clear results table
};

window.searchResults = () => {
    populateTable('results-table', sampleResults, resultsTemplate);
};

/*document.addEventListener('DOMContentLoaded', function() {
    const saveButtons = document.querySelectorAll('.save button');

    saveButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const productDetails = this.parentElement;
            const productName = productDetails.querySelector('h3').textContent;
            const quantity = productDetails.querySelector('input[type="range"]').value;
            const priceLabel = productDetails.querySelector('label:nth-of-type(2)').textContent;
            const caloriesLabel = productDetails.querySelector('label:nth-of-type(3)').textContent;
            const price = parseFloat(priceLabel.match(/[\d,]+/)[0].replace(',', '.')); // Konvertiert den Preis in eine Zahl
            const calories = parseInt(caloriesLabel.match(/[\d]+/)[0]); // Konvertiert Kalorien in eine Zahl

            const product = {
                name: productName,
                category: productDetails.dataset.category,
                price: price,
                quantity: quantity + ' Stück',
                calories: calories
            };

            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));

            alert('Produkt gespeichert');
        });
    });

    // Hinzufügen des input-Ereignisses für die Menge
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const quantityValue = this.value;
            const quantitySpan = this.parentElement.querySelector('span');
            quantitySpan.textContent = quantityValue;
        });
    });

    // Anzeigen der Produkte in der Tabelle
    const productTableBody = document.getElementById('productTableBody');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(function(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}€</td>
            <td>${product.quantity}</td>
            <td>${product.calories} kcal</td>
            <td><img src="edit_icon.png" class="icon edit-icon"></td>
            <td><img src="delete_icon.png" class="icon delete-icon"></td>
        `;
        productTableBody.appendChild(row);
    });
});
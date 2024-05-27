/*document.addEventListener('DOMContentLoaded', function() {
    const saveButtons = document.querySelectorAll('.save.button'); 

    saveButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const productDetails = this.parentElement;
            const productName = productDetails.querySelector('h3').textContent; 
            const quantity = productDetails.querySelector('input[type="range"]').value;
            const price = productDetails.querySelector('label:nth-of-type(2)').textContent.split(' ')[1];
            const calories = productDetails.querySelector('label:nth-of-type(3)').textContent.split(' ')[1]; 

            const product = {
                name: productName,
                price: price,
                quantity: quantity + ' Stück',
                calories: calories + ' kcal'
            };

            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));

            alert('Produkt gespeichert');
        });
    });
*/
    // Filterfunktionen
    const filterLinks = document.querySelectorAll('.filter-link');
    filterLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.dataset.category;
            filterProducts(category);
        });
    });

    
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        filterProducts(null, filter);
    });

    
    function filterProducts(category, filter) {
        const rows = document.querySelectorAll('#productTableBody tr');
        rows.forEach(function(row) {
            const productName = row.querySelector('td:first-of-type').textContent.toLowerCase();
            const productCategory = row.querySelector('td:nth-of-type(2)').textContent.toLowerCase();
            if ((!category || productCategory === category) && (!filter || productName.includes(filter))) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

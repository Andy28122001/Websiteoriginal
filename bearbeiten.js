document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('productTable');

    table.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit-icon')) {
            const row = target.closest('tr');
            const cells = row.querySelectorAll('td');
            const product = {
                name: cells[0].textContent,
                category: cells[1].textContent,
                price: cells[2].textContent,
                quantity: cells[3].textContent,
                calories: cells[4].textContent
            };
            localStorage.setItem('editProduct', JSON.stringify(product));
            window.location.href = 'edit.html';
        } else if (target.classList.contains('delete-icon')) {
            const row = target.closest('tr');
            const productName = row.querySelector('td:first-of-type').textContent;
            row.remove();
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products = products.filter(p => p.name !== productName);
            localStorage.setItem('products', JSON.stringify(products));
        }
    });

    const productTableBody = document.getElementById('productTableBody');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(function(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.calories}</td>
            <td><img src="edit_icon.png" class="icon edit-icon"></td>
            <td><img src="delete_icon.png" class="icon delete-icon"></td>
        `;
        productTableBody.appendChild(row);
    });
});

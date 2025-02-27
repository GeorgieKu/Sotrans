let productsInput = document.querySelector('.products__input');
let productsList = document.querySelector('.products__search ul');
let searchBadges = document.querySelectorAll('.search__badges button');

if(productsInput) {
    productsInput.addEventListener('focus', function() {
        productsList.style.display = 'block'
    })
    
    productsInput.addEventListener('blur', function() {
        productsList.style.display = 'none'
    })
    
    searchBadges.forEach(function(badge) {
        badge.addEventListener('click', function() {
            productsInput.value = badge.textContent;
        })
    })
}

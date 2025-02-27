document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector("header").classList.toggle("open")
    })
})

function openAcc(toggleButton, content, toggleArrow) {
    toggleButton.addEventListener('click', function() {
        content.classList.toggle('open');
        toggleArrow.classList.toggle('rotate');
        
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let toggleButtons = document.querySelectorAll('.acc');
    let contents = document.querySelectorAll('.content');
    
    toggleButtons.forEach((toggleButton, index) => {
        let toggleArrow = toggleButton.querySelector('svg');
        openAcc(toggleButton, contents[index], toggleArrow);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let cookie = document.getElementById('cookie');

    cookie.style.opacity = '1'

})


function closeCookie() {
    cookie.style.opacity = '0'

    setTimeout(() => {
        cookie.style.display = 'none'
    }, 500);
}





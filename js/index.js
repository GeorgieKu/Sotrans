document.addEventListener("DOMContentLoaded", function() {
    
    //Открытие/закртие бургер-меню
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector("header").classList.toggle("open")
    })

    let dropdownBtns = document.querySelectorAll('.header__button');

    //Выпадающие списки в header
    dropdownBtns.forEach(function(dropdownBtn) {
        dropdownBtn.addEventListener('click', function(event) {
            event.stopPropagation();

            let content = dropdownBtn.closest('.header__item').querySelector('.accordion-content');
            let dropdownList = content.querySelector('.header__dropdown');

            if (dropdownList) {
                dropdownBtns.forEach(function(otherDropdownBtn) {
                    if (otherDropdownBtn !== dropdownBtn) {
                        let otherContent = otherDropdownBtn.closest('.header__item').querySelector('.accordion-content');
                        let otherDropdownList = otherContent.querySelector('.header__dropdown');
                        if (otherDropdownList) {
                            otherDropdownList.classList.remove('active');
                            otherDropdownBtn.classList.remove('active');
                            otherDropdownBtn.querySelector('.header__arrow').classList.remove('active');
                        }
                    }
                });

                dropdownList.classList.toggle('active');

                dropdownBtn.classList.toggle('active');
                let arrow = dropdownBtn.querySelector('.header__arrow');
                if (dropdownList.classList.contains('active')) {
                    arrow.classList.add('active');
                } else {
                    arrow.classList.remove('active');
                }
            }
        });
    });

    // Обработчик клика по документу
    document.addEventListener('click', function(event) {
        dropdownBtns.forEach(function(dropdownBtn) {
            let content = dropdownBtn.closest('.header__item').querySelector('.accordion-content');
            let dropdownList = content.querySelector('.header__dropdown');
            if (dropdownList && dropdownList.classList.contains('active') && !dropdownList.contains(event.target) && !dropdownBtn.contains(event.target)) {
                dropdownList.classList.remove('active');
                dropdownBtn.classList.remove('active');
                dropdownBtn.querySelector('.header__arrow').classList.remove('active');
            }
        });
    });

    // Аккардеон
    function openAcc(toggleButton, content, toggleArrow) {
        toggleButton.addEventListener('click', function() {
            content.classList.toggle('open');
            toggleButton.classList.toggle('open')
            
        });
    }
    
        let toggleButtons = document.querySelectorAll('.accordion-btn');
        let contents = document.querySelectorAll('.accordion-content');
        
        toggleButtons.forEach((toggleButton, index) => {
            let toggleArrow = toggleButton.querySelector('svg');
            openAcc(toggleButton, contents[index], toggleArrow);
        });
    


    const form = document.querySelector('.contacts__form');
    const emailInput = document.querySelector('#formEmail');
    const passwordInput = document.querySelector('#formPassword');
    const showPasswordBtn = document.querySelector('.contacts__show-password-btn');
    const passwordStrengthIndicators = document.querySelectorAll('.contacts__password-strength span');
    const errorContainer = document.querySelector('.contacts__error');
    const contactsPasswordInfo = document.querySelector('.contacts__password-info');
    const nameInput = document.querySelector('#formName');
    const phoneInput = document.querySelector('#formPhone');

    // Валидация
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = true;

        // Проверка email
        if (!emailPattern.test(emailValue)) {
            errorContainer.style.display = 'flex';
            emailInput.style.borderColor = 'var(--input-error)';
            isValid = false;
        } else {
            errorContainer.style.display = 'none';
            emailInput.style.borderColor = 'var(--input-border)';
        }

        // Проверка имени
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            nameInput.style.borderColor = 'var(--input-error)';
            isValid = false;
        } else {
            nameInput.style.borderColor = 'var(--input-border)';
        }

        // Проверка телефона
        const phoneValue = phoneInput.value;
        if (phoneValue.length < 18) {
            phoneInput.style.borderColor = 'var(--input-error)';
            isValid = false;
        } else {
            phoneInput.style.borderColor = 'var(--input-border)';
        }

        // Проверка пароля
        const passwordValue = passwordInput.value;
        if (passwordValue.length < 1) {
            passwordInput.style.borderColor = 'var(--input-error)';
            isValid = false;
        } else {
            passwordInput.style.borderColor = 'var(--input-border)';
        }

        // Проверка надежности пароля
        const strength = checkPasswordStrength(passwordValue);
        if (strength < 2) {
            passwordInput.style.borderColor = 'var(--input-error)';
        } else {
            passwordInput.style.borderColor = 'var(--input-border)';
        }
    });

    // Показать/скрыть пароль
    showPasswordBtn.addEventListener('click', function () {
        event.preventDefault();
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'; 
        } else {
            passwordInput.type = 'password';
        }
    });

    // Проверка надежности пароля
    passwordInput.addEventListener('input', function () {
        const passwordValue = passwordInput.value;
        const strength = checkPasswordStrength(passwordValue);
        passwordStrengthIndicators.forEach((indicator, index) => {
            if (index < strength) {
                indicator.style.backgroundColor = getStrengthColor(strength);
            } else {
                indicator.style.backgroundColor = 'var(--input-strength-indicator)';
            }
        });
    });

    // Функция для проверки надежности пароля
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[A-Z]/.test(password)) strength++; 
        if (/[0-9]/.test(password)) strength++; 
        if (/[^A-Za-z0-9]/.test(password)) strength++; 
        return strength; 
    }

    // Функция для получения цвета в зависимости от уровня надежности
    function getStrengthColor(strength) {
        switch (strength) {
            case 1:
                contactsPasswordInfo.textContent = 'Too weak';
                return 'red';
            case 2:
                contactsPasswordInfo.textContent = 'Weak';
                return 'orange'; 
            case 3:
                contactsPasswordInfo.textContent = 'Medium';
                return 'yellow'; 
            case 4:
                contactsPasswordInfo.textContent = 'Strong';
                return 'green'; 
            default:
                return 'var(--input-strength-indicator)';
        }
    }

    // Маска ввода для номера телефона
    phoneInput.addEventListener('input', function () {
        let value = phoneInput.value.replace(/\D/g, ''); 

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        let formattedValue = '+7 (';
        if (value.length > 1) {
            formattedValue += value.slice(1, 4) + ') ';
            if (value.length > 4) {
                formattedValue += value.slice(4, 7) + '-';
                if (value.length > 7) {
                    formattedValue += value.slice(7, 9) + '-';
                    if (value.length > 9) {
                        formattedValue += value.slice(9, 11);
                    }
                }
            }
        } else if (value.length === 1) {
            formattedValue += value.slice(1);
        }

        if (formattedValue.length <= 19) {
            phoneInput.value = formattedValue;
        }
    });


    // Кастомный чекбокс
    let contactsCheckboxBlock = document.querySelector('.contacts__checkbox-block');
    
    contactsCheckboxBlock.addEventListener('click', function() {
        let contactsCustomCheckbox = contactsCheckboxBlock.querySelector('.contacts__custom-checkbox');
        let contactsCheckbox = contactsCheckboxBlock.querySelector('.contacts__checkbox');
        contactsCustomCheckbox.classList.toggle('checked');
    
        if (contactsCustomCheckbox.classList.contains('checked')) {
            contactsCheckbox.setAttribute('checked', 'checked');
        } else {
            contactsCheckbox.removeAttribute('checked');
        }

    });


    // Закрытие всплывашки cookie
    let cookie = document.getElementById('cookie')
    let cookieCloseBtn = document.getElementById('cookieCloseBtn');

    cookieCloseBtn.addEventListener('click', function() {
        cookie.style.opacity = 0;
        setTimeout(() => {
            cookie.style.display = 'none';
        }, 300);
    })

    //Скроллбар
    let area = document.querySelector('.simple-scrollbar');
    SimpleScrollbar.initEl(area);

    window.addEventListener('load', () => {
        let logos = document.querySelector('.logos__overflow');
        let rect = logos.getBoundingClientRect();
        logos.scrollLeft = (logos.scrollWidth - rect.width) / 2;
    });

})
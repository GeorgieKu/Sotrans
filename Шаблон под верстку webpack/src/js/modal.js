let modalCustomInput = document.getElementById('modalCustomInput');
let closeModal = document.getElementById('modalClose');
let modal = document.getElementById('modal');


//Открытие модалки
function openModal() {
    modal.showModal();
}
//Закрытие модалки
closeModal.addEventListener('click', function() {
    modal.close();  
})

modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();

    if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    ) {
        modal.close();
    }
});

//Скрипт для файлового инпута

modalCustomInput.classList.remove('not-valid');

document.getElementById("fileInput").addEventListener("change", function(event) {
    let files = event.target.files;
    let fileInfo = document.querySelector(".modal__custom-input span");
    fileInfo.innerHTML = "";

    const forbiddenFormats = ["video/mp4", "image/webp"];

    if (files.length > 3) {
        fileInfo.innerHTML = "Можно загрузить не более 3 файлов.";
        modalCustomInput.classList.add('not-valid');
        event.target.value = "";
        return;
    }

    let validFiles = [];
    for (let file of files) {
        if (file.size > 5 * 1024 * 1024) {
            fileInfo.innerHTML = "Слишком большой объем файла (>5МБ)";
            modalCustomInput.classList.add('not-valid');
            event.target.value = "";
            return;
        }

        if (forbiddenFormats.includes(file.type)) {
            fileInfo.innerHTML = "Неправильный формат файла";
            modalCustomInput.classList.add('not-valid');
            event.target.value = "";
            return;
        }

        validFiles.push(file.name);
    }

    if (validFiles.length === 1) {
        fileInfo.innerHTML = `  
            <svg>
                <use xlink:href="./img/svg.svg#paper" />
            </svg> 
            Загружен ${validFiles.length} файл`;
        modalCustomInput.classList.remove('not-valid');
    } else {
        fileInfo.innerHTML = `  
            <svg>
                <use xlink:href="./img/svg.svg#paper" />
            </svg> 
            Загружено ${validFiles.length} файла`;
        modalCustomInput.classList.remove('not-valid');
    }
});


//Валидация

const requiredInputs = modal.querySelectorAll(".required-input");
const submitButton = modal.querySelector(".modal__btn");

function checkFormValidity() {
    let isValid = true;

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
        }
    });

    submitButton.disabled = !isValid;
}

requiredInputs.forEach(input => {
    input.addEventListener("input", checkFormValidity);
});

checkFormValidity();
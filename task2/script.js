const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('name-error');
const passwordError = document.getElementById('password-error');
const nameWrapper = document.getElementById('name-wrapper');
const passwordWrapper = document.getElementById('password-wrapper');
const form = document.getElementById('form');

function defaultValidate(value) {
    if (value.trim().length == 0) {
        return "Not empty";
    } else if (value.length < 4) {
        return "Field must contain more than 4 characters";
    }
}

function nameValidate(value) {
    const isLetter = /^[A-Za-zА-Яа-яЁё\s]+$/.test(value);
    if (!isLetter) {
        return "Use only letters";
    } else {
        return defaultValidate(value);
    }
}

function passwordValidate(value) {
    const isForbidden = /[-*\\/_\s]/.test(value);
    if (isForbidden) {
        return "Not use -*/\\_ and space";
    } else {
        return defaultValidate(value);
    }
}

function clearAllErrors() {
    nameError.innerText = "";
    passwordError.innerText = "";

    usernameInput.classList.remove('form__input_error');
    passwordInput.classList.remove('form__input_error');

    passwordWrapper.classList.remove('form__input-wrapper_error');
    nameWrapper.classList.remove('form__input-wrapper_error');
}

function validateAndSetError(input, wrapper, errorElement, validateFunc) {
    const validationResult = validateFunc(input.value);
    if (validationResult) {
        errorElement.innerText = validationResult;
        input.classList.add('form__input_error');
        wrapper.classList.add('form__input-wrapper_error');
        wrapper.classList.remove('form__input-wrapper_success');
        return false; 
    } else {
        wrapper.classList.add('form__input-wrapper_success');
        return true; 
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    clearAllErrors();

    const validName = validateAndSetError(usernameInput, nameWrapper, nameError, nameValidate);
    const validPassword = validateAndSetError(passwordInput, passwordWrapper, passwordError, passwordValidate);

    if (!validName && !validPassword) {
        // здесь должна быть отправка формы
    }
});


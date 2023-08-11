import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]')

const KEY = "feedback-form-state";

form.addEventListener('input', throttle(handlerInput, 500));
form.addEventListener('submit', handlerSubmit);

function handlerInput(evt) {  
    const value = { email: email.value, message: message.value};       
    localStorage.setItem(KEY, JSON.stringify(value)); 
};

function handlerSubmit(evt) {
    evt.preventDefault();
    if (email.value === "" || message.value === "") {
        return; 
    } 
    console.log(JSON.parse(localStorage.getItem(KEY) ?? {}));
    form.reset();   
    localStorage.removeItem(KEY);    
}

if (JSON.parse(localStorage.getItem(KEY)) !== "") {
    const savedValue = JSON.parse(localStorage.getItem(KEY)) ?? {};
    email.value = savedValue.email ?? "" ;
    message.value = savedValue.message ?? "";    
};


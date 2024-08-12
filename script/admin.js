const money = document.getElementById('money-input');
const carbon = document.getElementById('carbon-input');

function submitButtonOnClick() {
    
    if(carbon.value !== ''){
        localStorage.removeItem('carbon');
        localStorage.setItem('carbon', carbon.value);
    }

    if(money.value !== ''){
        localStorage.removeItem('money');
        localStorage.setItem('money', money.value);
    }

    window.location.href = './home.html';

}
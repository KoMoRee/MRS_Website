
// login page

const nameInput = document.getElementById('name-input');

function loginButtonOnClick() {
    if(nameInput.value === ''){
        alert('กรุณากรอกชื่อของท่านก่อนเข้าใช้งาน');
    } else {
        localStorage.clear();
        localStorage.setItem('userName', nameInput.value);
        console.log('Name stored in local storage:', localStorage.getItem('userName'));
        window.location.href = './home.html';
    }
}

// index page

window.addEventListener('DOMContentLoaded', (event) => {

    const carbon = localStorage.getItem('carbon');
    const carbonOutput = document.getElementById('carbon-output');
    if(carbon){
        carbonOutput.innerHTML = carbon;
    } else {
        carbonOutput.innerHTML = '0.00';
    }
    
    
    const name = localStorage.getItem('userName');
    const nameOutput = document.getElementById('name');
    
    if (name){
        nameOutput.innerHTML = name;
    }

    const money = localStorage.getItem('money');
    const moneyOutput = document.getElementById('money-output');
    if(money) {
        moneyOutput.innerHTML = money;
    } else {
        moneyOutput.innerHTML = '0.00';
    }
});

// sell page

const inputBox = document.getElementById('sell-input-box');
const listContainer = document.getElementById('list-container');
// let sellOrderAmount = 0;
const sellOrders = [];

if(localStorage.getItem('sellOrdersLocalStoral')){

    sellOrders = [...localStorage.getItem('sellOrdersLocalStoral')];
        console.log(sellOrders);
    // for(let i = 0 ; i < localStorage.getItem('sellOrdersLocalStoral') ; i++){
    //     sellOrders[i] = localStorage.getItem('sellOrdersLocalStoral');
    //     console.log(sellOrders);
    // }
}

sellOrders.map((x)=>{
    let li = document.createElement('li');
        li.innerHTML = 'ขายคาร์บอนเครดิตปริมาณ  ' + x + '  MWh';
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
});

// let now = new Date();

function addSellOrderOnClick() {
    if(inputBox.value === "") {
        alert('กรุณากรอกจำนวน(ตัวเลข)คาร์บอนเครดิตที่ต้องการขาย');
     } else if(inputBox.value < 0){
        alert('กรุณากรอกเป็นจำนวนที่ถูกต้อง')
    } else {
        // sellOrderAmount++;
        let li = document.createElement('li');
        li.innerHTML = 'ขายคาร์บอนเครดิตปริมาณ  ' + inputBox.value + '  tCO2eq';
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);

        sellOrders.push(inputBox.value);
        console.log(sellOrders);
        localStorage.setItem('sellOrdersLocalStorage',sellOrders)
    }
    inputBox.value = "";
}

listContainer.addEventListener('click', function(e) {
    if (confirm('ท่านแน่ใจหรือไม่ว่าจะลบคำสั่งขายนี้')) {       
        e.target.parentElement.remove();
        // sellOrderAmount--;
      }
    

}, false);


// buy page

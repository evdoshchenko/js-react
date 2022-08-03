"use strict";

const inputUsd = document.querySelector('#usd'),
      inputBtc = document.querySelector('#btc');

inputUsd.addEventListener('input', () => {
    // 
    const request = new XMLHttpRequest();
    // request.open(method, url, async, login, pass);
    request.open('GET', 'https://blockchain.info/ticker');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    // status // statusText // response // readyState
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response.USD);
            
            const data = JSON.parse(request.response);
            console.log(data.USD);
            inputBtc.value = +inputUsd.value / data.USD.last;
        } else {
            inputBtc.value = "error";
        }
    });
});
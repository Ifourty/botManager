import {addFallingImages} from './animation.js';

var images;
var listImg = [];

var username;
var password;
var submit;

var errorDiv;
var errorText;


function main(){
    loadVariables();
    setInterval(() => {
       addFallingImages(images, listImg);
    }, 1000);
    initComponent();
}

function loadVariables(){
    images = [
        'img/AnimeDle.png',
        'img/LeakNews.jpg',
    ];

    username = document.getElementById('username');
    password = document.getElementById('passwordUser');
    submit = document.getElementById('submitBtn');

    errorDiv = document.getElementById('errorDiv');
    errorText = document.getElementById('errorText');
}

function initComponent(){
    submit.addEventListener('click', async () => {
        var usernameValue = username.value;
        var passwordValue = password.value;

        if(usernameValue == '' || passwordValue == ''){
            error('Please fill in all fields');
            return;
        } else{
            tryLogin(usernameValue, passwordValue);
        }

    });
}

function error(text){
    errorDiv.classList.remove('d-none');
    errorText.innerText = text;
}

function tryLogin(username, password){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({username: username, password: password}));
    xhr.onload = () => {
        var json = JSON.parse(xhr.responseText);
        if(json.status == 'success'){
            window.location.href = '/';
        } else {
            error(json.message);
        }
    }
}


main();
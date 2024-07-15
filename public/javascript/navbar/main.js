var logout;
var navBartop;
var scrollToActive;

function main(){
    loadVariables();
    initComponent();
}

function loadVariables(){
    logout = document.getElementById('logout');
    navBartop = document.getElementById('navBartop');
    scrollToActive = document.getElementsByClassName('active')[0];
}

function initComponent(){
    logout.addEventListener('click', async () => {
        tryLogout();
    });
    
    scrollToActive.scrollIntoView();
}

function tryLogout(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/logout');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            window.location.href = '/login';
        } else{
            console.log('error');
        }
    }
}

main();
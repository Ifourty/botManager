var logout;

function main(){
    loadVariables();
    initComponent();
}

function loadVariables(){
    logout = document.getElementById('logout');
}

function initComponent(){
    logout.addEventListener('click', async () => {
        tryLogout();
    });
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
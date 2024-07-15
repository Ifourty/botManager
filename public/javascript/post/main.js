var selectedGame;
var games;
var serverSelector;
var selectedServers;

function main(){
    loadVariables();
    initComponent();
}

function loadVariables(){
    selectedGame = null;
    selectedServers = [];
    games = document.getElementsByClassName('game');
    serverSelector = document.getElementById('serverSelector');
}

function initComponent(){
    for(var i = 0; i < games.length; i++){
        let index = i;
        games[i].addEventListener('click', async () => {
            if(selectedGame != null){
                selectedGame.classList.remove('selectedGame');
            }
            selectedGame = games[index];
            games[index].classList.add('selectedGame');
            getServerBySelectedGame();
        });
        
    }
}

function getServerBySelectedGame(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/leaknewspost/getservers?id=' + selectedGame.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            var servers = JSON.parse(xhr.responseText);
            console.log(servers);
            reloadServers(servers);
        } else{
            console.log('error');
        }
    }
}

function reloadServers(servers){
    selectedServers = [];
    serverSelector.innerHTML = '';
    for(var i = 0; i < servers.length; i++){
        let div = document.createElement('div');
        div.classList.add('server');
        div.id = servers[i].ID;
        var imgBuffer = servers[i].IMG.data;
        var binary = '';
        var len = imgBuffer.length;
        for (var j = 0; j < len; j++) {
            binary += String.fromCharCode(imgBuffer[j]);
        }
        var img = document.createElement('img');
        img.src = 'data:image/jpeg;base64,' + binary;
        div.appendChild(img);
        var name = document.createElement('p');
        name.innerText = servers[i].NAME;
        div.appendChild(name);


        div.addEventListener('click', async () => {
            if(selectedServers.includes(div.id)){
                selectedServers = selectedServers.filter(e => e !== div.id);
                div.classList.remove('selectedServer');
            } else{
                selectedServers.push(div.id);
                div.classList.add('selectedServer');
            }

            console.log(selectedServers);
        });

        serverSelector.appendChild(div);
    }

}

main();
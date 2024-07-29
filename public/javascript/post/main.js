var selectedGame;
var games;
var serverSelector;
var selectedServers;

var submitBtn
var post;

var addImage;
var imageInput;

var imageTable;

function main(){
    loadVariables();
    initComponent();
}

function loadVariables(){
    selectedGame = null;
    selectedServers = [];
    games = document.getElementsByClassName('game');
    serverSelector = document.getElementById('serverSelector');
    submitBtn = document.getElementById('submitBtn');
    post = document.getElementById('post');
    addImage = document.getElementById('addImage');
    imageInput = document.getElementById('imageInput');}
    imageTable = [];

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

    submitBtn.addEventListener('click', async () => {
        if(selectedGame == null){
            alert('Please select a game');
            return;
        }

        if(selectedServers.length == 0){
            alert('Please select a server');
            return;
        }

        if(post.value.length >= 2000){
            alert('Post is too long (max 2000 characters | current: ' + post.value.length + ')');
            return
        }

        var formData = new FormData();
        formData.append('id_game', selectedGame.id);
        formData.append('id_servers', JSON.stringify(selectedServers));
        formData.append('post', post.value);
        
        for (var i = 0; i < imageTable.length; i++) {
            formData.append('images', imageTable[i]);
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/leaknewspost/create');
        xhr.onload = () => {
            if (xhr.status == 200) {
                alert('Post created');
            } else {
                alert('Error');
            }
        };
        xhr.send(formData);

    });

    addImage.addEventListener('click', async () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', async () => {
        console.log(imageInput.files);
        for(var i = 0; i < imageInput.files.length; i++){
            let file = imageInput.files[i];
            var reader = new FileReader();
            reader.onload = function(e){
                console.log(e.target.result);
                var img = document.createElement('img');
                img.src = e.target.result;
                imageTable.push(file);
                var div = document.createElement('div');
                div.classList.add('imagePost');
                div.addEventListener('click', async () => {
                    div.remove();
                    imageTable = imageTable.filter(e => e !== file);
                });
                div.appendChild(img);
                document.getElementById('imagesContainer').appendChild(div);
            }
            reader.readAsDataURL(file);

        }
        console.log(imageTable);
    });
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
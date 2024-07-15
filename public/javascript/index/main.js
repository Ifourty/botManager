var LeaksNews;

function main(){
    loadVariables();
    initComponent();
}

function loadVariables(){
    LeaksNews = document.getElementById('LeaksNews');
}

function initComponent(){
    LeaksNews.addEventListener('click', async () => {
        window.location.href = '/leaknewspost';
    });
}

function tryLogout(){

}

main();
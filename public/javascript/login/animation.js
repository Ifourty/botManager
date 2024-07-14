function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


export function addFallingImages(images, listImg) {
    for (let i = 0; i < 1; i++) {
        let container = document.getElementById('container');
        let img = document.createElement('img');
        let randomIndex = Math.floor(Math.random() * images.length);
        img.src = images[randomIndex];
        img.classList.add('falling-image');
    
        // Position aléatoire sur l'axe horizontal
        let leftPosition = `${getRandom(0, 100)}%`;
        img.style.left = leftPosition;
        img.style.top = '-150px';
        let size = getRandom(50, 150);
    
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
    
        setTimeout(() => {
            let translateX = getRandom(-50, 50);
            let translateY = 150;
            img.style.transform = `translate(${translateX}vw, ${translateY}vh) rotate(${getRandom(-360, 360)}deg)`;
        }, 100);
        
        // Animation de la chute avec un délai aléatoire pour chaque image
        
        container.appendChild(img);
        listImg.push(img);
        setTimeout(() => {
            container.removeChild(listImg.shift());
        }, 12000);
    }
}
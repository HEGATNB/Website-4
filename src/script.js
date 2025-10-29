function createSnowflakes() {
    const snowContainer = document.getElementById('snowContainer');
    const snowflakeCount = 100; 
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 5 + 2; 
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        const left = Math.random() * 100;
        snowflake.style.left = `${left}%`;
        
        const delay = Math.random() * 10;
        snowflake.style.animationDelay = `${delay}s`;
        
        const duration = Math.random() * 10 + 5;
        snowflake.style.animationDuration = `${duration}s`;
        
        const opacity = Math.random() * 0.7 + 0.3; 
        snowflake.style.opacity = opacity;
        
        snowContainer.appendChild(snowflake);
    }
}
document.addEventListener('DOMContentLoaded', createSnowflakes);
document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.querySelector('.download');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            alert('Резюме будет скачано!');
        });
    }
});

let block1 = document.getElementById("project1");
let block2 = document.getElementById("project2");
let block3 = document.getElementById("project3");
let block4 = document.getElementById("project4");
function hideElement(block){
    switch (block){
        case 1: // Все
            block1.hidden = false;
            block2.hidden = false;
            block3.hidden = false;
            block4.hidden = false;
            break;
        case 2: // HTML
            block1.hidden = false; // Личный сайт - HTML
            block2.hidden = true;  // Калькулятор - C++
            block3.hidden = true;  // Игра - C#
            block4.hidden = false; // Портфолио - HTML
            break;
        case 3: // C++
            block1.hidden = true;  // Личный сайт - HTML
            block2.hidden = false; // Калькулятор - C++
            block3.hidden = true;  // Игра - C#
            block4.hidden = true;  // Портфолио - HTML
            break;
        case 4: // JS
            block1.hidden = false; // Личный сайт - JS
            block2.hidden = true;  // Калькулятор - C++
            block3.hidden = true;  // Игра - C#
            block4.hidden = false; // Портфолио - JS
            break;
    }
}

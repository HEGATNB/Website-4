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
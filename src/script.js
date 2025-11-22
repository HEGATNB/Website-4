function createSnowflakes() {
    const snowContainer = document.getElementById('snowContainer');
    if (!snowContainer) return;
    
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

function downloadResume() {
    const resumeUrl = 'other/резюме.txt';
    
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'resume_rybakov_mikhail.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const projectsData = {
    website: {
        title: "Сайт",
        description: "Разработка современного адаптивного веб-сайта с использованием HTML, CSS и JavaScript а также bootstrap. Проект включает в себя создание пользовательского интерфейса, оптимизацию для различных устройств и реализацию интерактивных элементов.",
        images: [
            "images/projects/website_1.png",
            "images/projects/website_2.png"
        ],
        link: "https://github.com/HEGATNB/HiddenProject_FABD"
    },
    calculator: {
        title: "Калькулятор на C#",
        description: "Создание калькулятора на языке C#. Проект демонстрирует знание основ c# и умение реализовать математические операции.",
        images: [
            "images/projects/calculator_1.png",
            "images/projects/calculator_2.png"
        ],
        link: "https://github.com/HEGATNB/Calculator-c"
    },
    minesweeper: {
        title: "Сапер с графическим интерфейсом",
        description: "Реализация классической игры 'Сапер' на языке c++ с современным графическим интерфейсом. Проект включает генерацию игрового поля, алгоритмы открытия клеток, систему подсчета очков и активируемые бонусы.",
        images: [
            "images/projects/minesweeper_1.png",
            "images/projects/minesweeper_2.png"
        ],
        link: "https://github.com/HEGATNB/MINESWEEPER"
    }
};
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalTitle = document.getElementById('projectModalLabel');
    const modalDescription = document.getElementById('projectDescription');
    const modalLink = document.getElementById('projectLink');
    const modalImg1 = document.getElementById('projectImg1');
    const modalImg2 = document.getElementById('projectImg2');

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalLink.href = project.link;

    const isMobile = window.innerWidth <= 768;
    const imageSuffix = isMobile ? '-mobile' : '-desktop';
    modalImg1.src = project.images[0];
    modalImg2.src = project.images[1];
    modalImg1.alt = `Изображение проекта "${project.title}" - вид 1`;
    modalImg2.alt = `Изображение проекта "${project.title}" - вид 2`;
    modalImg1.loading = "lazy";
    modalImg2.loading = "lazy";

    modal.show();
    const handleModalResize = () => {
        const currentIsMobile = window.innerWidth <= 768;
        if (currentIsMobile !== isMobile) {
            modalImg1.src = project.images[0];
            modalImg2.src = project.images[1];
        }
    };
    
    window.addEventListener('resize', handleModalResize);
    modal._element.addEventListener('hidden.bs.modal', () => {
        window.removeEventListener('resize', handleModalResize);
    });
}

let events = [];

function loadEvents() {
    const savedEvents = localStorage.getItem('studyEvents');
    if (savedEvents) {
        events = JSON.parse(savedEvents);
    } else {
        events = [
            { date: "15.12.2024", text: "Верстка макета сайта", status: "completed" },
            { date: "10.12.2024", text: "Основы js", status: "completed" },
            { date: "05.12.2024", text: "Создание приложения связанного с бд", status: "inprogress" },
            { date: "01.12.2024", text: "Разработка дизайна сайта", status: "inprogress" },
            { date: "25.11.2024", text: "Изучение основ HTML и CSS", status: "completed" },
            { date: "20.11.2024", text: "Настройка рабочего окружения", status: "completed" }
        ];
    }
    renderEvents();
}

function saveEvents() {
    localStorage.setItem('studyEvents', JSON.stringify(events));
}

function renderEvents() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;

    eventsList.innerHTML = '';

    const sortedEvents = [...events].sort((a, b) => {
        return new Date(b.date.split('.').reverse().join('-')) - new Date(a.date.split('.').reverse().join('-'));
    });

    sortedEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item d-flex justify-content-between align-items-center fade-in';
        
        const statusIcon = getStatusIcon(event.status);
        
        eventItem.innerHTML = `
            <h2 class="mb-0">${event.date} - ${event.text}</h2>
            <p class="mb-0 fs-5">${statusIcon}</p>
        `;
        
        eventsList.appendChild(eventItem);
    });
}

function getStatusIcon(status) {
    switch (status) {
        case 'completed': return '✅';
        case 'inprogress': return '🔄';
        case 'planned': return '📅';
        default: return '📝';
    }
}

function addEvent(date, text, status) {
    if (!isValidDateFormat(date)) {
        alert('Пожалуйста, введите дату в формате ДД.ММ.ГГГГ (например: 15.12.2024)');
        return false;
    }
    
    const newEvent = {
        date: date.trim(),
        text: text.trim(),
        status: status
    };
    
    events.push(newEvent);
    saveEvents();
    renderEvents();
    return true;
}

function isValidDateFormat(dateString) {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(dateString)) return false;
    
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > daysInMonth[month - 1]) return false;
    
    return true;
}

function validateDate(date) {
    if (!date.trim()) {
        alert('Пожалуйста, введите дату');
        return false;
    }
    return true;
}

function enhanceProgressBars() {
    const progressBars = document.querySelectorAll('.skill-bar');
    progressBars.forEach(bar => {
        const value = bar.value;
        const max = bar.max;
        const percentage = Math.round((value / max) * 100);
        
        bar.setAttribute('title', `${percentage}%`);
        bar.style.opacity = '0';
        bar.style.transform = 'scaleX(0.8)';
        
        setTimeout(() => {
            bar.style.transition = 'all 0.5s ease';
            bar.style.opacity = '1';
            bar.style.transform = 'scaleX(1)';
        }, 100);
    });
}

function hideElement(block){
    let block1 = document.getElementById("project1");
    let block2 = document.getElementById("project2");
    let block3 = document.getElementById("project3");
    let block4 = document.getElementById("project4");
    
    if (!block1 || !block2 || !block3 || !block4) return;
    
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
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    enhanceProgressBars();
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            openProjectModal(projectId);
        });
    });
    
    const downloadBtn = document.getElementById('downloadResume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResume);
    }
    
    const oldDownloadButton = document.querySelector('.download');
    if (oldDownloadButton) {
        oldDownloadButton.addEventListener('click', downloadResume);
    }
    
    const eventsList = document.getElementById('eventsList');
    if (eventsList) {
        loadEvents();
        
        const saveEventBtn = document.getElementById('saveEventBtn');
        if (saveEventBtn) {
            saveEventBtn.addEventListener('click', function() {
                const date = document.getElementById('eventDate').value;
                const text = document.getElementById('eventText').value;
                const status = document.getElementById('eventStatus').value;
                
                if (!validateDate(date)) return;
                if (!text.trim()) {
                    alert('Пожалуйста, введите описание события');
                    return;
                }
                if (addEvent(date, text, status)) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addEventModal'));
                    modal.hide();
                    document.getElementById('addEventForm').reset();
                }
            });
        }
    }
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = parseInt(this.dataset.filter);
            hideElement(filterType);
        });
    });
});

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

function handleOrientationChange() {
    const snowContainer = document.getElementById('snowContainer');
    if (snowContainer) {
        snowContainer.innerHTML = '';
        createSnowflakes();
    }
    enhanceProgressBars();
}
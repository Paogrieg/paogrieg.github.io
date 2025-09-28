    document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.testimonials-container');
    const viewport = document.querySelector('.slider');
    const avatars = document.querySelectorAll('.slider-nav .person');
    // Obtener la tarjeta activa inicial (para calcular el desplazamiento)
    let activeCard = document.querySelector('.testimonial-card.active');
    let currentIndex = Array.from(avatars).findIndex(person => person.classList.contains('active'));
    function slideTo(index) {
        avatars[currentIndex].classList.remove('active');
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.classList.remove('active', 'inactive');
        });        
        currentIndex = index;
        avatars[currentIndex].classList.add('active');
        const cards = document.querySelectorAll('.testimonial-card');
        cards[index].classList.add('active');
        // Las tarjetas de los lados se vuelven INACTIVAS (laterales)
        if (index > 0) {
            cards[index - 1].classList.add('inactive');
        }
        if (index < cards.length - 1) {
            cards[index + 1].classList.add('inactive');
        }
        activeCard = cards[index];
        const viewportCenter = viewport.offsetWidth / 2;
        const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
        const offset = viewportCenter - cardCenter;
        container.style.transform = `translateX(${offset}px)`;
    }
    avatars.forEach((person, index) => {
        person.addEventListener('click', () => {
            slideTo(index);
        });
    });
    if (activeCard) {
        // Necesitamos un pequeño retraso para asegurar que todos los estilos CSS se han cargado y las dimensiones son correctas
        setTimeout(() => {
            const viewportCenter = viewport.offsetWidth / 2;
            const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
            const initialOffset = viewportCenter - cardCenter;
            container.style.transform = `translateX(${initialOffset}px)`;
        }, 50); 
    }
});
// JS Carousel Animation
window.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    let speed = 2; // px per frame
    let slowSpeed = 0.3;
    let currentSpeed = speed;
    let pos = 0;

    // Duplicate items for seamless loop
    track.innerHTML += track.innerHTML;
    const totalWidth = items.length * (track.children[0].offsetWidth + 2 * 2 * window.innerWidth / 100); // item width + margin

    function animate() {
        pos -= currentSpeed;
        if (Math.abs(pos) >= totalWidth) pos = 0;
        track.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(animate);
    }

    track.parentElement.addEventListener('mouseenter', () => {
        currentSpeed = slowSpeed;
    });
    track.parentElement.addEventListener('mouseleave', () => {
        currentSpeed = speed;
    });

    animate();
});

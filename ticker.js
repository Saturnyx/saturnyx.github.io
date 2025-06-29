document.addEventListener('DOMContentLoaded', function() {
    const ticker = document.querySelector('.ticker');
    const tickerTrack = document.querySelector('.ticker-track');
    
    if (!ticker || !tickerTrack) {
        console.error('Ticker elements not found');
        return;
    }

    // Clone the ticker items to create seamless loop
    const tickerItems = tickerTrack.querySelectorAll('.ticker-item');
    const itemsToClone = Array.from(tickerItems);
    
    // Clone items for seamless loop
    itemsToClone.forEach(item => {
        const clone = item.cloneNode(true);
        tickerTrack.appendChild(clone);
    });

    let currentPosition = 0;
    const normalSpeed = 0.15; // Much slower default speed (vw per frame)
    const hoverSpeed = 0.05; // Even slower when hovering
    let currentSpeed = normalSpeed;
    const itemWidth = 24; // 20vw + 4vw margin = 24vw
    const totalItems = tickerItems.length;
    let isHovering = false;
    
    function animate() {
        currentPosition -= currentSpeed;
        
        // Reset position when first set of items is completely off screen
        const resetPosition = -(itemWidth * totalItems);
        if (currentPosition <= resetPosition) {
            currentPosition = 0;
        }
        
        tickerTrack.style.transform = `translateX(${currentPosition}vw)`;
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Slow down animation on hover
    ticker.addEventListener('mouseenter', () => {
        isHovering = true;
        currentSpeed = hoverSpeed;
    });
    
    ticker.addEventListener('mouseleave', () => {
        isHovering = false;
        currentSpeed = normalSpeed;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cursorGlow = document.querySelector('.cursor-glow');
    let isMoving = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        isMoving = true;
    });

    function animate() {
        if (isMoving) {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
            
            cursorGlow.style.left = `${currentX}px`;
            cursorGlow.style.top = `${currentY}px`;
            
            if (Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1) {
                isMoving = false;
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}); 
document.addEventListener("DOMContentLoaded", () => {
  const wall = document.querySelector(".wall");
  const images = document.querySelectorAll(".wall .image");

  // Add transition CSS to all images for smooth movement
  images.forEach((img) => {
    img.style.transition = "transform 0.3s ease-out";
    // Set initial position
    img.style.left = "50%";
    img.style.transform = "translate(-50%, 0)";
  });

  let isOverWall = false;
  let rafId = null;
  let mouseX = 0;
  let mouseY = 0;

  // Use requestAnimationFrame for smoother animations
  function updateImagePositions() {
    // Calculate center-based coordinates (-1 to 1 range)
    const normalizedX = mouseX / wall.offsetWidth - 0.5;
    const normalizedY = mouseY / wall.offsetHeight - 0.5;

    images.forEach((img) => {
      // Extract z-index from the class name
      const classNumber = parseInt(img.className.match(/image(\d+)/)[1]);
      // Create a movement scale that's more controlled (adjust the division factor as needed)
      const moveFactor = classNumber * 10; // Gentler movement scale

      // Apply the transform with controlled range
      img.style.transform = `translate(calc(-50% + ${-normalizedX * moveFactor}px), ${-normalizedY * moveFactor}px)`;
    });

    if (isOverWall) {
      rafId = requestAnimationFrame(updateImagePositions);
    }
  }

  wall.addEventListener("mouseenter", () => {
    isOverWall = true;
    rafId = requestAnimationFrame(updateImagePositions);
  });

  wall.addEventListener("mouseleave", () => {
    isOverWall = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    // Reset all images to center position with smooth transition
    images.forEach((img) => {
      img.style.transform = "translate(-50%, 0)";
    });
  });

  wall.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
});

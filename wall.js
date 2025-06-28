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
  let lerpedX = 0;
  let lerpedY = 0;
  const lerpSpeed = 0.15; // Lower = smoother, higher = more responsive

  // Use requestAnimationFrame for smoother animations
  function updateImagePositions() {
    // Lerp towards the actual mouse position
    lerpedX += (mouseX - lerpedX) * lerpSpeed;
    lerpedY += (mouseY - lerpedY) * lerpSpeed;

    // Calculate center-based coordinates (-1 to 1 range)
    const normalizedX = lerpedX / wall.offsetWidth - 0.5;
    const normalizedY = lerpedY / wall.offsetHeight - 0.5;

    images.forEach((img) => {
      // Extract z-index from the class name
      const classNumber = parseInt(img.className.match(/image(\d+)/)[1]);
      // Create a movement scale that's more controlled (adjust the division factor as needed)
      const moveFactor = classNumber * 12; // Gentler movement scale

      // Apply the transform with controlled range
      img.style.transform = `translate(calc(-50% + ${-normalizedX * moveFactor}px), ${-normalizedY * moveFactor}px)`;
    });

    if (isOverWall) {
      rafId = requestAnimationFrame(updateImagePositions);
    }
  }

  function resetImagesToCenter() {
    lerpedX = wall.offsetWidth / 2;
    lerpedY = wall.offsetHeight / 2;
    images.forEach((img) => {
      img.style.transform = "translate(-50%, 0)";
    });
  }

  function stopAnimation() {
    isOverWall = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    resetImagesToCenter();
  }

  wall.addEventListener("mouseenter", (e) => {
    // Set mouse position to center of wall to prevent jump
    const rect = wall.getBoundingClientRect();
    mouseX = rect.left + rect.width / 2;
    mouseY = rect.top + rect.height / 2;
    resetImagesToCenter();
    if (!isOverWall) {
      isOverWall = true;
      rafId = requestAnimationFrame(updateImagePositions);
    }
  });

  wall.addEventListener("mouseleave", stopAnimation);

  // Handle when mouse leaves the window entirely
  document.addEventListener("mouseleave", (e) => {
    // Only reset if the mouse is outside the window (not just over a child element)
    if (!e.relatedTarget && !e.toElement) {
      stopAnimation();
    }
  });

  // Listen for mousemove on the whole document to always get cursor position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
});

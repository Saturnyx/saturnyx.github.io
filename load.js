function clear() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.8s ease-out";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    clear();
  }
};

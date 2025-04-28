// Actualizar el año en el pie de página
document.getElementById('year').textContent = new Date().getFullYear();

// Añadir efecto de desplazamiento suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Ajuste para la barra de navegación
        behavior: 'smooth'
      });
    }
  });
});
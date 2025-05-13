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

// Funcionalidad de cambio de tema (modo oscuro/claro)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const htmlElement = document.documentElement;

// Comprobar si hay una preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  // Comprobar preferencia del sistema
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkScheme.matches) {
    htmlElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }
}

// Manejar el clic en el botón de tema
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  updateThemeIcon(newTheme);
});

// Actualizar el icono según el tema
function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

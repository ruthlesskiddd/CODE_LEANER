function inscribirse() {
  const modal = document.getElementById("modal-exito");
  if (modal) modal.style.display = "flex";
}


// Posicionar dinámicamente los cuadros de info
document.querySelectorAll('.language-card').forEach(card => {
  const infoBox = card.querySelector('.language-info');

  card.addEventListener('mouseenter', () => {
    const cardRect = card.getBoundingClientRect();
    const infoBoxWidth = 200; // Mismo que en CSS
    const margin = 10;

    // Comprobamos si hay suficiente espacio en la pantalla para colocar la caja de información a la derecha
    if (cardRect.right + infoBoxWidth + margin > window.innerWidth) {
      infoBox.style.left = 'auto';
      infoBox.style.right = '100%';
    } else {
      infoBox.style.left = '100%';
      infoBox.style.right = 'auto';
    }

    // Hacer que la caja de información sea visible
    infoBox.style.opacity = '1';
    infoBox.style.visibility = 'visible';
  });

  // Cuando el ratón salga de la tarjeta, ocultamos la caja de información
  card.addEventListener('mouseleave', () => {
    infoBox.style.opacity = '0';
    infoBox.style.visibility = 'hidden';
  });
});

// Nuevo código para el formulario y modal
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('.inscripcion-form-container form');
  const modal = document.getElementById('modal-exito');
  const cerrarBtn = document.querySelector('.inscripcion-close-btn');

  if (formulario && modal && cerrarBtn) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault(); // Previene envío real
      modal.style.display = 'flex';
      formulario.reset(); // Limpia el formulario
    });

    cerrarBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});


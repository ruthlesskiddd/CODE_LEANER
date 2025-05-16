document.addEventListener('DOMContentLoaded', () => {
  const carritoKey = 'carritoCursos';

  function guardarCarrito(carrito) {
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
  }

  function cargarCarrito() {
    return JSON.parse(localStorage.getItem(carritoKey)) || [];
  }

  function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
      const carrito = cargarCarrito();
      contador.textContent = carrito.length;
    }
  }

  // Página de cursos
  const botonesAgregar = document.querySelectorAll('.add-to-cart');
  if (botonesAgregar.length > 0) {
    const carrito = cargarCarrito();

    botonesAgregar.forEach(button => {
      button.addEventListener('click', () => {
        const curso = button.getAttribute('data-curso');
        const precio = parseFloat(button.getAttribute('data-precio'));
        const imagen = button.getAttribute('data-imagen');
        carrito.push({ curso, precio, imagen });
        guardarCarrito(carrito);
        actualizarContadorCarrito(); // ✅ Actualiza el contador
        alert(`✅ "${curso}" añadido al carrito.\nTotal: $${carrito.reduce((sum, item) => sum + item.precio, 0).toFixed(2)}`);
      });
    });
  }

  // Página del carrito
  const contenedorCursos = document.getElementById('lista-cursos');
  const totalDiv = document.getElementById('total-carrito');

  if (contenedorCursos) {
    const carrito = cargarCarrito();

    function renderizarCarrito() {
      contenedorCursos.innerHTML = '';

      carrito.forEach((item, index) => {
        const cursoElemento = document.createElement('div');
        cursoElemento.classList.add('curso-en-carrito');
        cursoElemento.style.display = 'flex';
        cursoElemento.style.alignItems = 'center';
        cursoElemento.style.gap = '10px';

        cursoElemento.innerHTML = `
          <img src="${item.imagen}" alt="${item.curso}" width="60" height="60" style="object-fit: contain;">
          <div>
            <h3>${item.curso}</h3>
            <p>Precio: $${item.precio}</p>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
          </div>
        `;
        contenedorCursos.appendChild(cursoElemento);
      });

      // Mostrar total general
      if (totalDiv) {
        const total = carrito.reduce((sum, item) => sum + item.precio, 0);
        totalDiv.textContent = `Total: $${total.toFixed(2)}`;
      }

      // Eventos para eliminar cursos
      document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', function () {
          const index = this.getAttribute('data-index');
          carrito.splice(index, 1);
          guardarCarrito(carrito);
          actualizarContadorCarrito(); // ✅ Actualiza al eliminar
          renderizarCarrito();
        });
      });
    }

    renderizarCarrito();

    // Procesar pago
    const formPago = document.getElementById("formulario-pago");
    if (formPago) {
      formPago.addEventListener("submit", function(e) {
        e.preventDefault();
        localStorage.removeItem(carritoKey);
        alert("✅ Pago procesado correctamente.");
        contenedorCursos.innerHTML = '';
        if (totalDiv) {
          totalDiv.textContent = "Total: $0.00";
        }
        actualizarContadorCarrito(); // ✅ Reinicia el contador
      });
    }
  }

  // ✅ Siempre que se cargue la página, actualizar el contador
  actualizarContadorCarrito();
});

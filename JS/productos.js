// 1. Cargar productos desde JSON
function cargarProductos() {
  fetch('../db/productos.json')
    .then(response => response.json())
    .then(data => {
      mostrarTarjetas(data);
      prepararBotones(data);
    })
    .catch(error => console.error('Error al cargar productos:', error));
}

// 2. Mostrar tarjetas en el DOM
function mostrarTarjetas(productos) {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('product-card');
    tarjeta.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>$${producto.precio.toFixed(2)}</p>
      <button class="ver-detalles" data-id="${producto.id}">Ver detalles</button>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// 3. Preparar botones de “Ver detalles”
function prepararBotones(productos) {
  document.querySelectorAll('.ver-detalles').forEach(boton => {
    boton.addEventListener('click', () => {
      const id = parseInt(boton.getAttribute('data-id'));
      const producto = productos.find(p => p.id === id);
      mostrarModal(producto);
    });
  });
}

// 4. Mostrar modal con detalles
function mostrarModal(producto) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <h3>${producto.nombre}</h3>
    <img src="${producto.imagen}" alt="${producto.nombre}" style="width:60%; border-radius:8px; margin-bottom:1rem;">
    <p>${producto.descripcion}</p>
    <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
    <label for="cantidad">Cantidad:</label>
    <input type="number" id="cantidad" min="1" value="1" style="margin-bottom: 1rem; padding: 6px; width: 60px; text-align: center;">
    <button id="agregar-carrito" data-id="${producto.id}" class="add-button">Agregar al carrito</button>
  `;

  modal.style.display = 'flex';

   document.getElementById('agregar-carrito').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    if (cantidad >= 1) {
      agregarAlCarrito(producto, cantidad);
    } else {
      Swal.fire({
        title: 'Cantidad inválida',
        text: 'Por favor, ingresa una cantidad válida.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}
// 5. Cerrar modal
function prepararModal() {
  const modal = document.getElementById('modal');
  const closeButton = document.querySelector('.close-button');

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// 6.Funcion agregar al carrito
function agregarAlCarrito(producto, cantidad = 1) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const existente = carrito.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Feedback visual
    Swal.fire({
    title: '¡Producto agregado!',
    text: `"${producto.nombre}" fue añadido al carrito.`,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    timer: 2000,
    showConfirmButton: false
  });
}



// 7. Inicializar
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  prepararModal();
});


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
    <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; border-radius:8px; margin-bottom:1rem;">
    <p>${producto.descripcion}</p>
    <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
    <button id="agregar-carrito" data-id="${producto.id}" class="add-button">Agregar al carrito</button>
  `;

  modal.style.display = 'flex';

  document.getElementById('agregar-carrito').addEventListener('click', () => {
    agregarAlCarrito(producto);
  });
}

// 5. Simular agregar al carrito
function agregarAlCarrito(producto) {
  console.log(`Agregado al carrito: ${producto.nombre}`);
  alert(`Agregaste "${producto.nombre}" al carrito`);
}

// 6. Cerrar modal
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

// 7. Inicializar
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  prepararModal();
});


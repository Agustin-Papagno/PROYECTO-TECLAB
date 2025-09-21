function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contenedor = document.getElementById('carrito-contenido');
  const totalTexto = document.getElementById('carrito-total');
  const botonCheckout = document.getElementById('boton-checkout');

  contenedor.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalTexto.textContent = '';
     botonCheckout.style.display = 'none';
    return;
  }

    botonCheckout.style.display = 'inline-block';

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const item = document.createElement('div');
    item.innerHTML = `
      <div class="carrito-item-contenido">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img">
        <div class="carrito-info">
          <h4>${producto.nombre}</h4>
          <p>Cantidad: ${producto.cantidad}</p>
          <p>Subtotal: $${subtotal.toFixed(2)}</p>
          <button class="restar" data-id="${producto.id}">−</button>
          <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        </div>
      </div>
      <hr>
    `;
    contenedor.appendChild(item);
  });

  totalTexto.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll('.eliminar').forEach(boton => {
    boton.addEventListener('click', () => {
      const id = parseInt(boton.getAttribute('data-id'));
      eliminarDelCarrito(id);
    });
  });

   document.querySelectorAll('.restar').forEach(boton => {
    boton.addEventListener('click', () => {
      const id = parseInt(boton.getAttribute('data-id'));
      restarCantidad(id);
    });
  });
}


function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function restarCantidad(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const producto = carrito.find(p => p.id === id);

  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
    } else {
      carrito = carrito.filter(p => p.id !== id);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);

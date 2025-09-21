document.addEventListener('DOMContentLoaded', () => {
  const metodoEnvio = document.getElementById('metodo-envio');
  const direccionContainer = document.getElementById('direccion-container');
  const formulario = document.getElementById('formulario-checkout');

  // Mostrar u ocultar campo de dirección según método de envío
  function actualizarDireccion() {
    if (metodoEnvio.value === 'Envío a domicilio') {
      direccionContainer.style.display = 'block';
      direccionContainer.querySelector('input').required = true;
    } else {
      direccionContainer.style.display = 'none';
      direccionContainer.querySelector('input').required = false;
    }
  }

  metodoEnvio.addEventListener('change', actualizarDireccion);
  actualizarDireccion(); // Ejecutar al cargar

  // Enviar datos a WhatsApp
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const metodoPago = document.getElementById('metodo-pago').value;
    const metodoEnvioValor = metodoEnvio.value;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'Agregá productos antes de finalizar la orden.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let mensaje = `¡Hola! Quiero hacer una compra:\n\n`;
    carrito.forEach(p => {
      mensaje += `• ${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}\n`;
    });

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    mensaje += `\nTotal: $${total.toFixed(2)}\n\n`;
    mensaje += `Datos del comprador:\n`;
    mensaje += `Nombre: ${nombre}\n`;
    if (metodoEnvioValor === 'Envío a domicilio') {
      mensaje += `Dirección: ${direccion}\n`;
    }
    mensaje += `Teléfono: ${telefono}\n`;
    mensaje += `Email: ${email}\n`;
    mensaje += `Método de pago: ${metodoPago}\n`;
    mensaje += `Método de envío: ${metodoEnvioValor}`;

    const numeroWhatsApp = '5491140268452'; 
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
    localStorage.removeItem('carrito');

  });
});

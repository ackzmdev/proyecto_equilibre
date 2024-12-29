window.addEventListener('DOMContentLoaded', () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    let precioTotal = 0;
    let totalProductos = basket.length;

    basket.forEach((product) => {
        precioTotal = precioTotal + product.price;
    })

    const precioElement = document.getElementById('precio');
    precioElement.textContent = precioTotal;

    const totalUnidadesElement = document.getElementById('cantidad');
    totalUnidadesElement.textContent = totalProductos;
})

//Face cart check

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
    const buyButton = document.getElementById("buy-button");
  
    // Cargar productos del LocalStorage
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
  
    // Función para renderizar el carrito
    function renderCart() {
      cartItemsContainer.innerHTML = "";
      let total = 0;
  
      basket.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
  
        // Imagen del producto
        const img = document.createElement("img");
        img.src = item.image.src;
        img.alt = item.image.alt;
  
        // Título del producto
        const title = document.createElement("div");
        title.classList.add("cart-item-title");
        title.textContent = item.title;
  
        // Controles de cantidad
        const quantityControls = document.createElement("div");
        quantityControls.classList.add("quantity-controls");
  
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.addEventListener("click", () => updateQuantity(index, -1));
  
        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = item.quantity || 1;
  
        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.addEventListener("click", () => updateQuantity(index, 1));
  
        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(plusButton);
  
        // Precio
        const price = document.createElement("div");
        const itemPrice = (item.price * (item.quantity || 1)).toFixed(2);
        price.textContent = `$${itemPrice}`;
        total += parseFloat(itemPrice);
  
        cartItem.appendChild(img);
        cartItem.appendChild(title);
        cartItem.appendChild(quantityControls);
        cartItem.appendChild(price);
  
        cartItemsContainer.appendChild(cartItem);
      });
  
      cartTotalElement.textContent = total.toFixed(2);
    }
  
    // Actualizar cantidad de producto
    function updateQuantity(index, delta) {
      if (!basket[index].quantity) basket[index].quantity = 1;
      basket[index].quantity += delta;
  
      if (basket[index].quantity <= 0) {
        basket.splice(index, 1); // Eliminar producto si la cantidad es 0
      }
  
      localStorage.setItem("basket", JSON.stringify(basket));
      renderCart();
    }
  
    // Eliminar todo el carrito
    clearCartButton.addEventListener("click", () => {
      localStorage.removeItem("basket");
      basket = [];
      renderCart();
    });
  
    // Función para comprar (simulada en este caso)
    buyButton.addEventListener("click", () => {
      if (basket.length === 0) {
        alert("El carrito está vacío. Por favor, agrega productos.");
      } else {
        // Aquí puedes redirigir a una página de pago, o mostrar un mensaje de agradecimiento.
        alert("¡Gracias por tu compra! El pago será procesado.");
        localStorage.removeItem("basket"); // Limpiar carrito después de la compra
        basket = [];
        renderCart();
      }
    });
  
    renderCart();
  });
  



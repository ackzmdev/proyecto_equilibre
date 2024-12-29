const productos = [
  {
    title: "Serum The Ordinary",
    price: 8500,
    image: {
      src: "/proyecto_equilibre/assets/img/producto5.png",
      alt: "",
    },
  },
  {
    title: "Bálsamo Cicauronic",
    price: 3500,
    image: {
      src: "/proyecto_equilibre/assets/img/producto9.png",
      alt: "",
    },
  },
  {
    title: "Masajeador facial",
    price: 5000,
    image: {
      src: "/proyecto_equilibre/assets/img/producto11.png",
      alt: "",
    },
  },
];

// Renderizar productos al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount(); // Asegurarse de cargar el contador al inicio
});

function renderProducts() {
  const gallery = document.getElementsByClassName("galeriaRecomendados")[0];

  function addProduct(product) {
    // Renderizar producto
    const img = document.createElement("img");
    img.src = product.image.src;
    img.classList.add("imgGR");

    const container = document.createElement("div");
    container.classList.add("contenidoProductos");

    const titleElement = document.createElement("h2");
    titleElement.textContent = product.title;

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price}`;

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Agregar";
    buttonElement.classList.add("agregarCarrito");

    const icon = document.createElement("i");
    icon.classList = "fa-solid fa-cart-shopping";
    icon.setAttribute("aria-hidden", "true");
    buttonElement.appendChild(icon);

    container.appendChild(titleElement);
    container.appendChild(priceElement);
    container.appendChild(buttonElement);

    const productElement = document.createElement("div");
    productElement.classList.add("productosRecomendados");
    productElement.appendChild(img);
    productElement.appendChild(container);

    gallery.appendChild(productElement);

    // Evento para agregar producto al carrito
    buttonElement.addEventListener("click", () => {
      const basket = JSON.parse(localStorage.getItem("basket")) || [];

      // Verificar si el producto ya existe en el carrito
      const existingProduct = basket.find((item) => item.title === product.title);
      if (existingProduct) {
        // Si existe, aumentar la cantidad
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        // Si no existe, agregarlo con cantidad inicial de 1
        basket.push({ ...product, quantity: 1 });
      }

      // Guardar en localStorage y actualizar contador
      localStorage.setItem("basket", JSON.stringify(basket));
      updateCartCount();
    });
  }

  productos.forEach((product) => addProduct(product));
}

// Función para actualizar el número del carrito en el header
function updateCartCount() {
  const cartCountSpan = document.getElementById("cuenta-carrito");

  if (cartCountSpan) {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    const totalItems = basket.reduce((total, item) => total + (item.quantity || 1), 0);
    cartCountSpan.textContent = totalItems;
  }
}

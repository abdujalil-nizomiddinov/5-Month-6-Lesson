const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const products = [
  {
    id: 1,
    name: "Premium Smart Watch",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    discount: 20,
    price: 199.99,
    discountedPrice: 159.99,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    discount: 15,
    price: 149.99,
    discountedPrice: 127.49,
    rating: 4.2,
    inStock: true,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    discount: 10,
    price: 59.99,
    discountedPrice: 53.99,
    rating: 4.0,
    inStock: false,
  },
  {
    id: 4,
    name: "4K Action Camera",
    category: "Cameras",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    discount: 25,
    price: 299.99,
    discountedPrice: 224.99,
    rating: 4.7,
    inStock: true,
  },
];

function printProducts(products) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  products.forEach((product) => {
    const productHTML = `
      <div class="bg-white rounded-xl shadow-lg overflow-hidden max-w-xs w-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div class="relative">
          <img src="${product.image}" alt="${
      product.name
    }" class="w-full h-56 object-cover" />
          <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -${product.discount}%
          </div>
          <button class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <i class="fa-regular fa-heart text-red-500"></i>
          </button>
        </div>
        <div class="p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">${
            product.category
          }</p>
          <h3 class="font-semibold text-gray-800 text-lg mb-2 truncate">${
            product.name
          }</h3>
          <div class="flex items-center mb-2">
            <div class="flex text-yellow-400">
              ${generateStars(product.rating)}
            </div>
            <span class="text-xs text-gray-500 ml-1">(${product.rating})</span>
          </div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-gray-400 line-through text-sm">$${
                product.price
              }</span>
              <span class="font-bold text-gray-800 text-xl ml-1">$${
                product.discountedPrice
              }</span>
            </div>
            <span class="text-xs ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } px-2 py-1 rounded">
              ${product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            data-id="${product.id}"
          >
            <i class="fas fa-shopping-cart mr-2"></i>
            Add to Cart
          </button>
        </div>
        <div class="grid grid-cols-3 divide-x border-t">
          <button class="py-2 hover:bg-gray-50 text-sm text-gray-600 flex items-center justify-center">
            <i class="fas fa-eye mr-1"></i> View
          </button>
          <button class="py-2 hover:bg-gray-50 text-sm text-gray-600 flex items-center justify-center">
            <i class="fas fa-exchange-alt mr-1"></i> Compare
          </button>
          <button class="py-2 hover:bg-gray-50 text-sm text-gray-600 flex items-center justify-center">
            <i class="fas fa-share-alt mr-1"></i> Share
          </button>
        </div>
      </div>
    `;

    container.innerHTML += productHTML;
  });
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  while (stars.match(/fa-star/g)?.length < 5) {
    stars += '<i class="far fa-star"></i>';
  }
  return stars;
}
printProducts(products);

let cartIds = [];
const addToCartButtons = document.querySelectorAll("button[data-id]");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.closest("button").getAttribute("data-id");
    if (!cartIds.includes(productId)) {
      cartIds.push(productId);
      document.getElementById("idlar").innerText = cartIds.join(", ");
      button.disabled = true;
      button.innerText = "Added";
      button.classList.add("bg-gray-400");
    } else {
      alert("This product is already in the cart!");
    }
  });
});

function addNewProduct() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const image = document.getElementById("image").value;
  const discount = parseFloat(document.getElementById("discount").value);
  const price = parseFloat(document.getElementById("price").value);
  const rating = parseFloat(document.getElementById("rating").value);
  const inStock = document.getElementById("inStock").checked;

  const discountedPrice = +(price - (price * discount / 100)).toFixed(2);

  const newProduct = {
    id: products.length + 1,
    name,
    category,
    image,
    discount,
    price,
    discountedPrice,
    rating,
    inStock
  };

  products.push(newProduct);
  printProducts(products);
}

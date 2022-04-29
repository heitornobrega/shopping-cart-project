const btnClean = document.querySelector('.empty-cart');
const carrinho = document.querySelector('.cart__items');
const loadDiv = document.querySelector('.loading');
const totalOutput = document.querySelector('.total-price');

let total = 0;

function createProductImageElement(imageSource) { 
  const img = document.createElement('img'); 
  img.src = imageSource;
  return img; 
}

function createCustomElement(element, className, innerText) { 
  const e = document.createElement(element); 
  e.className = className; 
  e.innerText = innerText; 
  return e; 
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function updateLocalStorage() {
  saveCartItems(carrinho.innerHTML);
}

function precosSaida(event) {
  const precoItemRemovido = parseFloat(event.target.children[0].innerText) * -1;
  total += precoItemRemovido;
  totalOutput.innerText = total;
}

const cartItemClickListener = (event) => {
  event.target.remove();
  updateLocalStorage();
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) { // Cria elementos que serão adicionados ao carrinho 
  const li = document.createElement('li');
  li.className = 'cart__item'; 
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $<span>${salePrice}</span>`;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', precosSaida);
  return li;
}

async function addProductToCart(event) {
  const idProduto = getSkuFromProductItem(event.path[1]);
  const objItem = await fetchItem(idProduto);
  carrinho.appendChild(createCartItemElement(objItem));
  updateLocalStorage();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) { 
  const section = document.createElement('section');
  section.className = 'item'; 
  section.appendChild(createCustomElement('span', 'item__sku', sku)); 
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', addProductToCart);
  return section; 
}

async function addProducts(produto) {
  loadDiv.innerText = 'Carregando...';
  const { results } = await fetchProducts(produto);
  loadDiv.remove();
  const items = document.querySelector('.items');
  results.forEach((elemento) => {
    items.appendChild(createProductItemElement(elemento));
  });
}

function carregaCarrinho() {
  carrinho.innerHTML = JSON.parse(getSavedCartItems('cartItems'));
  carrinho.addEventListener('click', cartItemClickListener);
}

function limpaCarrinho() {
  carrinho.innerHTML = '';
  localStorage.clear();
}

btnClean.addEventListener('click', limpaCarrinho);

function precosEntrada(event) {
  const precoItemAdicionado = parseFloat(event.path[0].parentElement.childNodes[3].outerText);
  total += precoItemAdicionado;
  totalOutput.innerText = total;
}

function addEventNoAddCart() {
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => element.addEventListener('click', precosEntrada));
}

window.onload = async () => {
  await addProducts('computador');
  carregaCarrinho();
  addEventNoAddCart();
};

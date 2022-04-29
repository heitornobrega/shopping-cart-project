const saveCartItems = (argumento) => localStorage
  .setItem('cartItems', JSON.stringify(argumento));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

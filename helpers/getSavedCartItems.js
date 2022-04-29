const getSavedCartItems = (chave) => localStorage.getItem(chave);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se saveCartItems("<ol><li>Item</li></ol>") invoca o método localStorage.setItem', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Testa se saveCartItems("<ol><li>Item</li></ol>") invoca o método localStorage.setItem com dois parâmetros, o primeiro "cartItems" e o segundo o valor passado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});

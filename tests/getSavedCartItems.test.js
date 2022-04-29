const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se a função getSavedCartItems invoca o método localStorage.getItem quando chamada', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('Testa se a função getSavedCartItems invoca o método localStorage.getItem quando chamada com o parâmetro "cartItems"', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});

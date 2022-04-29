require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Verifica se a função fetchProducts invoca a função fetch', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('verifique se, ao chamar a função fetchProducts com o argumento "computador", a função fetch foi chamada com o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador".', async () => {
    url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('verifica se o retorno da função fetchProducts é igual ao objeto computadorSearch.', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  })
  it('verifica se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});

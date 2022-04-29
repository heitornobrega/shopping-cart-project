require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa se a função fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Testa se fetchItem invoca a função fetch', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('Testa se ao invocar fetchItem com o argumento "MLB1615760527" a função fetch usa o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('Testa se o retorno de fetchItem é igual ao objeto "item"', async () => {
    const obj = await fetchItem("MLB1615760527");
    expect(obj).toEqual(item);
  })
  it('Testa se fetchItem quando chamada sem argumento retorna um erro com a mensagem: "You must provide an url"', async() => {
    const erro = await fetchItem()
    expect(erro).toEqual(new Error('You must provide an url'))
  })
});

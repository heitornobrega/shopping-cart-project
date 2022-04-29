const fetchItem = async (item) => {
  try {
    const url = `https://api.mercadolibre.com/items/${item}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error; 
  }
};
// fetchItem('MLB1341706310');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

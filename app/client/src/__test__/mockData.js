const input = document.createElement( 'input' );
input.name = 'nameCrypto';
input.value = 'ETH';

const checkbox = document.createElement( 'input' );
checkbox.type = 'checkbox';
checkbox.name = 'fiatCrypto';
checkbox.checked = true;
checkbox.value = 'dollar';

const checkbox2 = document.createElement( 'input' );
checkbox2.type = 'checkbox';
checkbox2.name = 'fiatCrypto';
checkbox2.checked = false;
checkbox2.value = 'euro';
const inputs = [input, checkbox, checkbox2];
const inputValues = {
  nameCrypto: 'ETH',
  fiatCrypto: 'dollar'
};

const mockData = {
  utils: {
    amount: 45,
    price_1: 0.5,
    price_2: 3.45,
    invested_1: 5000,
    invested_2: 2000,
    currentValue: 3000,
    possibleFiat: ['dollar', 'euro', 'pound'],
    inputs,
    inputValues
  }
};

export default mockData;

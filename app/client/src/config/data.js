module.exports = {
  formData: [
    {
      name: 'dateCrypto',
      id: 'dateCrypto',
      text: 'Date Crypto Purchase',
      type: 'date',
      placeholder: 'Add date coins was bought'
    },
    {
      name: 'nameCrypto',
      id: 'nameCrypto',
      text: 'Name Crypto',
      type: 'text',
      placeholder: 'Add coin name',
      required: 'required'
    },
    {
      name: 'amountCrypto',
      id: 'amountCrypto',
      text: 'Amount Crypto',
      type: 'number',
      placeholder: 'Add coin amount',
      step: '0.0001',
      required: 'required'
    },
    {
      name: 'priceCrypto',
      id: 'priceCrypto',
      text: 'Price Crypto',
      type: 'number',
      placeholder: 'Add price coin',
      step: '0.0001'
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-dollar',
      value: 'dollar',
      text: 'dollar',
      type: 'radio',
      required: 'required'
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-pound',
      value: 'pound',
      text: 'pound',
      type: 'radio',
      required: 'required'
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-euro',
      value: 'euro',
      text: 'euro',
      type: 'radio',
      required: 'required'
    }
  ]
};

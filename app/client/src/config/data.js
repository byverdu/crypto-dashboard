module.exports = {
  formData: {
    general: [
      {
        name: 'dateCrypto',
        text: 'Date Crypto Purchase',
        type: 'date',
        placeholder: 'Add date coins was bought'
      },
      {
        name: 'nameCrypto',
        text: 'Name Crypto',
        type: 'text',
        placeholder: 'Add coin name',
        required: 'required'
      },
      {
        name: 'amountCrypto',
        text: 'Amount Crypto',
        type: 'number',
        placeholder: 'Add coin amount',
        step: '0.0001',
        required: 'required'
      },
      {
        name: 'priceCrypto',
        text: 'Price Crypto',
        type: 'number',
        placeholder: 'Add price coin',
        step: '0.0001'
      }
    ],
    fiat: [
      {
        name: 'fiatCrypto',
        value: 'dollar',
        text: 'dollar',
        type: 'radio',
        required: 'required'
      },
      {
        name: 'fiatCrypto',
        value: 'pound',
        text: 'pound',
        type: 'radio',
        required: 'required'
      },
      {
        name: 'fiatCrypto',
        value: 'euro',
        text: 'euro',
        type: 'radio',
        required: 'required'
      }
    ]
  }
};

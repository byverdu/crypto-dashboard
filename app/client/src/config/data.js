module.exports = {
  inputFields: [
    {
      name: 'amountCrypto',
      id: 'amountCrypto',
      text: 'Amount Crypto',
      type: 'number',
      placeholder: 'Add coin amount',
      step: '0.0001',
      required: true
    },
    {
      name: 'priceCrypto',
      id: 'priceCrypto',
      text: 'Price Crypto',
      type: 'number',
      placeholder: 'Add price coin',
      step: '0.0001'
    }
  ],
  dateFields: {
    name: 'dateCrypto',
    id: 'dateCrypto',
    text: 'Date Crypto Purchase',
    placeholder: 'Add date coins was bought'
  },
  radioFiatFields: [
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-na',
      value: 'NA',
      text: 'n/a',
      type: 'radio',
      required: true
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-dollar',
      value: 'USD',
      text: 'dollar',
      type: 'radio',
      required: true
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-pound',
      value: 'GBP',
      text: 'pound',
      type: 'radio',
      required: true
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-euro',
      value: 'EUR',
      text: 'euro',
      type: 'radio',
      required: true
    }
  ]
};

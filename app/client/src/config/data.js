module.exports = {
  inputFields: [
    {
      name: 'dateCrypto',
      id: 'dateCrypto',
      text: 'Date Crypto Purchase',
      type: 'date',
      placeholder: 'Add date coins was bought'
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
    }
  ],
  radioFiatFields: [
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-na',
      value: 'NA',
      text: 'n/a',
      type: 'radio',
      required: 'required'
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-dollar',
      value: 'USD',
      text: 'dollar',
      type: 'radio',
      required: 'required'
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-pound',
      value: 'GBP',
      text: 'pound',
      type: 'radio',
      required: 'required'
    },
    {
      name: 'fiatCrypto',
      id: 'fiatCrypto-euro',
      value: 'EUR',
      text: 'euro',
      type: 'radio',
      required: 'required'
    }
  ],
  radioCryptoFields: [
    // {
    //   name: 'pairCrypto',
    //   id: 'pairCrypto-btc',
    //   value: 'btc',
    //   text: 'btc',
    //   type: 'radio',
    //   required: 'required'
    // },
    // {
    //   name: 'pairCrypto',
    //   id: 'pairCrypto-eth',
    //   value: 'eth',
    //   text: 'eth',
    //   type: 'radio',
    //   required: 'required'
    // }
  ]
};

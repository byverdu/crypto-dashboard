import * as actions from '../redux/constants';

const input = document.createElement( 'input' );
input.name = 'coinCrypto';
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
  coinCrypto: 'ETH',
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
    inputValues,
    formData: [
      {
        name: 'dateCrypto',
        text: 'Date Crypto Purchase',
        type: 'date',
        placeholder: 'Add date coins was bought'
      },
      {
        name: 'coinCrypto',
        id: 'coinCrypto',
        text: 'Name Crypto',
        type: 'text',
        placeholder: 'Add coin name',
        required: 'required'
      },
      {
        name: 'fiatCrypto',
        id: 'fiatCrypto-dollar',
        value: 'dollar',
        text: 'dollar',
        type: 'radio',
        required: 'required'
      }
    ]
  },
  reducers: [
    {
      coinCrypto: 'btc',
      amountCrypto: '0.05',
      priceCrypto: '0.0004',
      fiatCrypto: 'dollar',
      dateCrypto: '2018-02-11',
      exchangeCrypto: 'Cexio'
    },
    {
      coinCrypto: 'eth',
      amountCrypto: '67',
      priceCrypto: '23',
      fiatCrypto: 'dollar',
      dateCrypto: '2018-02-09'
    }
  ],
  reducersFetchApi: {
    priceHistorical: 200,
    priceMulti: {
      ETH: {
        USD: 200
      },
      ADA: {
        GBP: 0.1531
      }
    }
  },
  apiPriceHistorical: {
    coinCrypto: 'ETH',
    amountCrypto: '10',
    pairCrypto: 'USD',
    dateCrypto: '2018-02-09'
  },
  apiPriceMulti: {
    coins: ['ETH', 'ADA'],
    fiats: ['USD', 'GBP']
  },
  socketGenerator: [
    {
      dateCrypto: '2018-04-15',
      coinCrypto: 'XLM',
      amountCrypto: '34',
      priceCrypto: 0.2954,
      fiatCrypto: 'dollar',
      pairCrypto: 'BTC',
      exchangeCrypto: 'Bitstamp'
    },
    {
      dateCrypto: '2018-04-15',
      coinCrypto: 'ADA',
      amountCrypto: '34',
      priceCrypto: 0.2954,
      fiatCrypto: 'pound',
      pairCrypto: 'ETH',
      exchangeCrypto: 'Binance'
    },
    {
      dateCrypto: '2018-04-15',
      coinCrypto: 'BTC',
      amountCrypto: '34',
      priceCrypto: 0.2954,
      fiatCrypto: 'euro',
      pairCrypto: 'USD',
      exchangeCrypto: 'Binance'
    }
  ],
  socketData: [
    '1~Binance~XRP~BTC~4~0.00008151~1526769716~3290~0.2681679~17033450~76264766.89401536~6227.053551017059~789',
    '1~Binance~XRP~BTC~1~0.00008145~1526769767~505~0.0411878~17033488~76387682.4304587~6237.062095127003~79069920.93039997~6457.766538580469~Binance~40fe9'
  ],
  successFetch: [
    {
      type: actions.FETCH_API_DATA_REQUEST
    },
    {
      type: actions.FETCH_API_DATA_SUCCESS,
      payload: {
        status: 200,
        data: []
      }
    }
  ],
  failFetchResponse: {
    status: 404,
    statusText: 'Not Found',
    url: 'api/cryptouj',
    ok: false
  },
  failFetch: [
    {
      type: actions.FETCH_API_DATA_REQUEST
    },
    {
      type: actions.FETCH_API_DATA_FAILED,
      payload: {
        status: 404,
        message: 'api/cryptouj Not Found'
      }
    }
  ],
  successAddItem: [
    {
      type: actions.ADD_ITEM_TO_API_REQUEST
    },
    {
      type: actions.ADD_ITEM_TO_API_SUCCESS,
      payload: {
        status: 200,
        data: []
      }
    }
  ],
  failAddItem: [
    {
      type: actions.ADD_ITEM_TO_API_REQUEST
    },
    {
      type: actions.ADD_ITEM_TO_API_FAILED,
      payload: {
        status: 404,
        message: 'api/cryptouj Not Found'
      }
    }
  ],
  successDeleteItem: [
    {
      type: actions.DELETE_API_ITEM_REQUEST
    },
    {
      type: actions.DELETE_API_ITEM_SUCCESS,
      payload: {
        status: 200,
        data: []
      }
    }
  ],
  failDeleteItem: [
    {
      type: actions.DELETE_API_ITEM_REQUEST
    },
    {
      type: actions.DELETE_API_ITEM_FAILED,
      payload: {
        status: 404,
        message: 'api/cryptouj Not Found'
      }
    }
  ],
  successFetchApiMulti: [
    {
      type: actions.FETCH_CRYPTOCOMPARE_API_REQUEST
    },
    {
      type: actions.FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS,
      status: 200,
      priceMulti: {
        ETH: {
          USD: 200
        },
        ADA: {
          GBP: 0.1531
        }
      }
    }
  ],
  successFetchApiHistorical: [
    {
      type: actions.FETCH_CRYPTOCOMPARE_API_REQUEST
    },
    {
      type: actions.FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS,
      status: 200,
      priceHistorical: 200
    }
  ],
  failFetchApi: [
    {
      type: actions.FETCH_CRYPTOCOMPARE_API_REQUEST
    },
    {
      type: actions.FETCH_CRYPTOCOMPARE_API_FAILED,
      status: 404,
      message: 'api/cryptouj Not Found'
    }
  ],
  successEditItem: [
    {
      type: actions.EDIT_API_ITEM_REQUEST
    },
    {
      type: actions.EDIT_API_ITEM_SUCCESS,
      status: 200,
      data: [{
        coinCrypto: 'eth',
        amountCrypto: '67',
        priceCrypto: '23',
        fiatCrypto: 'dollar',
        dateCrypto: '2018-02-09'
      }]
    }
  ],
  failEditItem: [
    {
      type: actions.EDIT_API_ITEM_REQUEST
    },
    {
      type: actions.EDIT_API_ITEM_FAILED,
      status: 404,
      message: 'api/cryptouj Not Found'
    }
  ],
  successFetchExchanges: [
    {
      type: actions.FETCH_EXCHANGES_REQUEST
    },
    {
      type: actions.FETCH_EXCHANGES_SUCCESS,
      status: 200,
      data: { polinex: '', binance: '' }
    }
  ],
  failFetchExchanges: [
    {
      type: actions.FETCH_EXCHANGES_REQUEST
    },
    {
      type: actions.FETCH_EXCHANGES_FAILED,
      status: 404,
      message: 'api/cryptouj Not Found'
    }
  ]
};

export default mockData;

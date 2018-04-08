import * as actions from '../redux/constants';

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
    inputValues,
    formData: [
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
      }
    ]
  },
  reducers: [
    {
      nameCrypto: 'btc',
      amountCrypto: '0.05',
      priceCrypto: '0.0004',
      fiatCrypto: 'dollar',
      dateCrypto: '2018-02-11'
    },
    {
      nameCrypto: 'eth',
      amountCrypto: '67',
      priceCrypto: '23',
      fiatCrypto: 'dollar',
      dateCrypto: '2018-02-09'
    }
  ],
  reducersFetchApi: {
    priceValue: {
      ETH: {
        USD: 382.98
      }
    }
  },
  successFetch: [
    {
      type: actions.FETCH_API_DATA_REQUEST
    },
    {
      type: actions.FETCH_API_DATA_SUCCESS,
      status: 200,
      data: []
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
      status: 404,
      message: 'api/cryptouj Not Found'
    }
  ],
  successAddItem: [
    {
      type: actions.ADD_ITEM_TO_API_REQUEST
    },
    {
      type: actions.ADD_ITEM_TO_API_SUCCESS,
      status: 200,
      data: []
    }
  ],
  failAddItem: [
    {
      type: actions.ADD_ITEM_TO_API_REQUEST
    },
    {
      type: actions.ADD_ITEM_TO_API_FAILED,
      status: 404,
      message: 'api/cryptouj Not Found'
    }
  ],
  successDeleteItem: [
    {
      type: actions.DELETE_API_ITEM_REQUEST
    },
    {
      type: actions.DELETE_API_ITEM_SUCCESS,
      status: 200,
      data: []
    }
  ],
  failDeleteItem: [
    {
      type: actions.DELETE_API_ITEM_REQUEST
    },
    {
      type: actions.DELETE_API_ITEM_FAILED,
      status: 404,
      message: 'api/cryptouj Not Found'
    }
  ],
  successFetchApi: [
    {
      type: actions.FETCH_CRYPTOCOMPARE_API_REQUEST
    },
    {
      type: actions.FETCH_CRYPTOCOMPARE_API_SUCCESS,
      status: 200,
      priceValue: {
        ETH: {
          USD: 382.98
        }
      }
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
        nameCrypto: 'eth',
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
  ]
};

export default mockData;

/* global describe, it */
import { expect } from 'chai';
import {
  FIAT_SIGN, FIAT_THREE_CODE_LETTER, CRYPTO_API_URL
} from '../../config/client';
import * as utils from '../../clientUtils';
import mockData from '../mockData';

const nameCrypto = mockData.utils.formData[ 1 ];
const fiatCrypto = mockData.utils.formData[ 2 ];
const apiData = mockData.reducers[ 0 ];

describe( 'Utils methods', () => {
  it( 'has a calculateTradingValue method', () => {
    expect( utils.calculateTradingValue )
      .not.eq( undefined );
  });
  it( 'calculateTradingValue multiplies amount and price and returns 3 decimal digits', () => {
    const { amount, price_1 } = mockData.utils;
    expect( utils.calculateTradingValue( amount, price_1 ))
      .to.be.a( 'string' )
      .and.eq( '22.50000000' );
  });
  it( 'has a getFiatSign method', () => {
    expect( utils.getFiatSign )
      .not.eq( undefined );
  });
  it( 'getFiatSign returns the proper fiat sign', () => {
    mockData.utils.possibleFiat.forEach(( fiat ) => {
      expect( utils.getFiatSign( fiat ))
        .to.eq( FIAT_SIGN[ fiat ]);
    });
  });
  it( 'has a getFiatCodeLetter method', () => {
    expect( utils.getFiatCodeLetter )
      .not.eq( undefined );
  });
  it( 'getFiatCodeLetter returns the proper 3 code letter for a fiat', () => {
    mockData.utils.possibleFiat.forEach(( fiat ) => {
      expect( utils.getFiatCodeLetter( fiat ))
        .and.eq( FIAT_THREE_CODE_LETTER[ fiat ]);
    });
  });
  it( 'has a getAPIUrl method', () => {
    expect( utils.getAPIUrl )
      .not.eq( undefined );
  });
  it( 'getAPIUrl returns the api url and the query', () => {
    expect( utils.getAPIUrl( 'ETH?345' ))
      .to.include.string( CRYPTO_API_URL )
      .and.not.include.string( 'BTC' );
  });
  it( 'has a getAPIUrlPriceHistorical method', () => {
    expect( utils.getAPIUrlPriceHistorical )
      .not.eq( undefined );
  });
  it( 'getAPIUrlPriceHistorical returns the url for cryptocompare API', () => {
    expect( utils.getAPIUrlPriceHistorical( mockData.apiPriceHistorical ))
      .to.eq( 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=GBP&ts=1541807220' );
  });
  it( 'has a getAPIUrlPriceMulti method', () => {
    expect( utils.getAPIUrlPriceMulti )
      .not.eq( undefined );
  });
  it( 'getAPIUrlPriceMulti returns the url for cryptocompare API', () => {
    expect( utils.getAPIUrlPriceMulti( mockData.apiPriceMulti ))
      .to.eq( 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,ADA&tsyms=USD,GBP' );
  });
  it( 'has a calculateProfitLost method', () => {
    expect( utils.calculateProfitLost )
      .not.eq( undefined );
  });
  it( 'calculateProfitLost returns the value between invested and the current value', () => {
    const {
      currentValue,
      invested_1,
      invested_2
    } = mockData.utils;
    expect( utils.calculateProfitLost( invested_1, currentValue ))
      .to.eq( '-2000.00000000' );
    expect( utils.calculateProfitLost( invested_2, currentValue ))
      .to.eq( '1000.00000000' );
  });
  it( 'has a getInputFieldValues method', () => {
    expect( utils.getInputFieldValues )
      .not.eq( undefined );
  });
  it( 'getInputFieldValues, returns the validated values from inputs', () => {
    expect( utils.getInputFieldValues( mockData.utils.inputs ))
      .to.eql( mockData.utils.inputValues );
  });
  it( 'has a hasRequiredField method', () => {
    expect( utils.hasRequiredField )
      .not.eq( undefined );
  });
  it( 'hasRequiredField returns true if object contains a required property', () => {
    expect( utils.hasRequiredField( mockData.utils.formData[ 0 ]))
      .to.eq( false );
    expect( utils.hasRequiredField( mockData.utils.formData[ 1 ]))
      .to.eq( true );
  });
  it( 'has a fetchConfig method', () => {
    expect( utils.fetchConfig )
      .not.eq( undefined );
  });
  it( 'fetchConfig returns an object with "method", "headers" and "body" properties', () => {
    const data = utils.fetchConfig( 'post', []);
    expect( data )
      .to.have.property( 'method' );
    expect( data )
      .to.have.property( 'headers' );
    expect( data )
      .to.have.property( 'body' );
  });
  it( 'has a isTradeProfitable method', () => {
    expect( utils.isTradeProfitable )
      .not.eq( undefined );
  });
  it( 'isTradeProfitable, returns true if the trade has positive balance', () => {
    expect( utils.isTradeProfitable( 89 ))
      .to.eq( true );
    expect( utils.isTradeProfitable( -89 ))
      .to.eq( false );
  });
  it( 'has a getValueWithFiatSign method', () => {
    expect( utils.getValueWithFiatSign )
      .not.eq( undefined );
  });
  it( 'getValueWithFiatSign, returns a interpolated number with fiat sign', () => {
    expect( utils.getValueWithFiatSign( 'dollar', 90 ))
      .to.eq( '$90' );
    expect( utils.getValueWithFiatSign( 'pound', -89 ))
      .to.eq( '£-89' );
  });
  it( 'has a socketSubscriptionGenerator method', () => {
    expect( utils.socketSubscriptionGenerator )
      .not.eq( undefined );
  });
  it( 'socketSubscriptionGenerator returns an Array', () => {
    expect( utils.socketSubscriptionGenerator( mockData.socketGenerator[ 0 ]))
      .to.be.an( 'string' );
  });
  it( 'socketSubscriptionGenerator generates a string from the saved data', () => {
    expect( utils.socketSubscriptionGenerator( mockData.socketGenerator[ 0 ]))
      .to.eq( '2~Bitstamp~XLM~BTC' );
  });
  it( 'socketSubscriptionGenerator generates a string from the saved data', () => {
    expect( utils.socketSubscriptionGenerator( mockData.socketGenerator[ 1 ]))
      .to.eql( '2~Binance~ADA~ETH' );
  });
  it( 'socketSubscriptionGenerator generates uses fiat currency if pair trade is omited', () => {
    expect( utils.socketSubscriptionGenerator( mockData.socketGenerator[ 2 ]))
      .to.eq( '2~Binance~BTC~USD' );
  });
  it( 'has a getCryptoPairToWatch method', () => {
    expect( utils.getCryptoPairToWatch )
      .not.eq( undefined );
  });
  it( 'getCryptoPairToWatch returns an Array', () => {
    expect( utils.getCryptoPairToWatch(
      utils.socketSubscriptionGenerator( mockData.socketGenerator[ 0 ])
    ))
      .to.be.an( 'string' );
  });
  it( 'getCryptoPairToWatch generates a string from the saved data', () => {
    expect( utils.getCryptoPairToWatch(
      utils.socketSubscriptionGenerator( mockData.socketGenerator[ 0 ])
    ))
      .to.eq( 'Bitstamp~XLM~BTC' );
  });
  it( 'getCryptoPairToWatch generates a string from the saved data', () => {
    expect( utils.getCryptoPairToWatch(
      utils.socketSubscriptionGenerator( mockData.socketGenerator[ 1 ])
    ))
      .to.eql( 'Binance~ADA~ETH' );
  });
  it( 'getCryptoPairToWatch generates uses fiat currency if pair trade is omited', () => {
    expect( utils.getCryptoPairToWatch(
      utils.socketSubscriptionGenerator( mockData.socketGenerator[ 2 ])
    ))
      .to.eq( 'Binance~BTC~USD' );
  });
  it( 'has a deleteRepeatedItems method', () => {
    expect( utils.deleteRepeatedItems )
      .not.eq( undefined );
  });
  it( 'deleteRepeatedItems returns an Array', () => {
    expect( utils.deleteRepeatedItems())
      .to.be.an( 'Array' );
  });
  it( 'deleteRepeatedItems returns an Array with no repeated values', () => {
    expect( utils.deleteRepeatedItems(['1', '1', '2']))
      .to.eql(['1', '2']);
  });
  describe( 'generateSubscription', () => {
    it( 'is defined', () => {
      expect( utils.generateSubscription )
        .not.eq( undefined );
    });
    const scenarios = [
      {
        oldProps: [],
        newProps: ['2~Binance~ADA~ETH'],
        expected: ['2~Binance~ADA~ETH']
      },
      {
        oldProps: ['2~Binance~ADA~ETH'],
        newProps: ['2~Binance~ADA~ETH'],
        expected: []
      },
      {
        oldProps: ['2~Binance~ADA~ETH'],
        newProps: ['2~Binance~ADA~ETH', '2~Binance~ADA~ETH', '2~Binance~ETH~USD'],
        expected: ['2~Binance~ETH~USD']
      },
      {
        oldProps: [],
        newProps: ['2~Binance~ADA~ETH', '2~Binance~ETH~USD'],
        expected: ['2~Binance~ADA~ETH', '2~Binance~ETH~USD']
      }
    ];

    scenarios.forEach(( item, index ) => {
      const { oldProps, newProps, expected } = item;
      it( `Case for scenario ${index} adding new items`, () => {
        expect( utils.generateSubscription( oldProps, newProps ))
          .to.eql( expected );
      });
    });
  });
  describe( 'generateUnsubscribe', () => {
    it( 'is defined', () => {
      expect( utils.generateUnsubscribe )
        .not.eq( undefined );
    });
    const scenarios = [
      {
        oldProps: ['2~Binance~ADA~ETH'],
        newProps: [],
        expected: ['2~Binance~ADA~ETH']
      },
      {
        oldProps: ['2~Binance~ADA~ETH', '2~Binance~ETH~USD'],
        newProps: ['2~Binance~ADA~ETH'],
        expected: ['2~Binance~ETH~USD']
      },
      {
        oldProps: ['2~Binance~ADA~ETH', '2~Binance~ADA~ETH', '2~Binance~ETH~USD'],
        newProps: ['2~Binance~ADA~ETH', '2~Binance~ETH~USD'],
        expected: []
      }
    ];

    scenarios.forEach(( item, index ) => {
      const { oldProps, newProps, expected } = item;
      it( `Case for scenario ${index} adding new items`, () => {
        expect( utils.generateUnsubscribe( oldProps, newProps ))
          .to.eql( expected );
      });
    });
  });
  describe( 'applyValuesToInput', () => {
    const resultName = {
      ...nameCrypto,
      value: 'btc',
      id: 'coinCrypto-0'
    };
    const resultFiat = {
      ...fiatCrypto,
      value: 'dollar',
      id: 'fiatCrypto-dollar-0',
      checked: true
    };
    const methodCalledFor = field => utils.applyValuesToInput(
      [field], { ...apiData, position: 0 }
    )[ 0 ];

    it( 'applyValuesToInput returns an array with values from props', () => {
      it( 'has a applyValuesToInput method', () => {
        expect( utils.applyValuesToInput )
          .not.eq( undefined );
      });
      expect( methodCalledFor( nameCrypto ))
        .to.eql( resultName );
    });
    it( 'applyValuesToInput returns checked property for fiatCrypto props', () => {
      expect( methodCalledFor( fiatCrypto ))
        .to.eql( resultFiat );
    });
  });
  it( 'has a getSocketData method', () => {
    expect( utils.getSocketData )
      .not.eq( undefined );
  });
  it( 'getSocketData creates a string from socket response', () => {
    expect( utils.getSocketData( mockData.socketData[ 0 ]))
      .to.eql({
        pairToWatch: 'Binance~XRP~BTC',
        exchange: 'Binance',
        coin: 'XRP',
        pair: 'BTC',
        flag: '4',
        price: '0.00008151'
      });
  });
  it( 'has a getFiatToWatch method', () => {
    expect( utils.getFiatToWatch )
      .not.eq( undefined );
  });
  it( 'getFiatToWatch should return non repeated coins and fiat', () => {
    const data = [
      { coinCrypto: 'BTC', pairCrypto: 'USD', fiatCrypto: 'NA' },
      { coinCrypto: 'ADA', pairCrypto: 'ETH', fiatCrypto: 'USD' },
      { coinCrypto: 'XLM', pairCrypto: 'BTC', fiatCrypto: 'EUR' },
      { coinCrypto: 'TRX', pairCrypto: 'BTC', fiatCrypto: 'GBP' }
    ];
    const oldData = {
      coins: ['XRP'],
      fiats: ['USD', 'CYN']
    };
    const newData = {
      coins: ['XRP', 'ETH', 'BTC', 'ADA', 'XLM', 'TRX'],
      fiats: ['USD', 'CYN', 'EUR', 'GBP']
    };
    utils.getFiatToWatch( oldData, data );
    expect( oldData )
      .to.eql( newData );
  });
});

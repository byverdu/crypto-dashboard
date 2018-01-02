import fs from 'fs';
import {
  describe, it, expect
} from '../testSetup';

describe( 'initial config', () => {
  it( 'Username should be a "env"', () => {
    expect( process.env.CRYPTO_USERNAME ).not.eq( undefined );
  });
  it( 'Password should be a "env"', () => {
    expect( process.env.CRYPTO_PASSWORD ).not.eq( undefined );
  });
  it( 'portfolio.json shouldn\'t be in source control', () => {
    const fileContent = fs.readFileSync( './.gitignore', 'utf8' );
    expect( fileContent ).to.include( 'app/data/portfolio.json' );
  });
});

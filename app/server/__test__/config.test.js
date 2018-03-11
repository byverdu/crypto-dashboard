/* global describe, it */

import fs from 'fs';
import { expect } from 'chai';

describe( 'initial config', () => {
  it( 'portfolio.json shouldn\'t be in source control', () => {
    const fileContent = fs.readFileSync( './.gitignore', 'utf8' );
    expect( fileContent ).to.include( 'app/data/portfolio.json' );
  });
});

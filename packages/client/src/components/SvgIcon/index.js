import React from 'react';
import { SvgIcon } from '@material-ui/core';

const svgBuilder = ( path, viewBox = '0 0 24 24' ) => props => (
  <SvgIcon
    {...props}
    viewBox={viewBox }
  >
    {path}
  </SvgIcon>
);

export default svgBuilder;

import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import classNames from 'classnames';

const styles = theme => ({
  warning: {
    background: amber[ 700 ],
    color: 'black',
    fontSize: 20
  },
  error: {
    background: theme.palette.error.dark
  }
});

const Info = ({
  message, type, className, classes, ...props
}) => (
  <SnackbarContent
    className={classNames( classes[ type ], className )}
    message={message || props.children}
  />
);

Info.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(
    ['success', 'warning', 'error', 'info']
  ).isRequired
};

Info.defaultProps = {
  message: 'Kameha',
  type: 'success'
};

export default withStyles( styles )( Info );

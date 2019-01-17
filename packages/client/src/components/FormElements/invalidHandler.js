const invalidHandler = ( setInvalid, setMessage ) => ( e ) => {
  if ( Object.prototype.hasOwnProperty.call( e, 'target' )) {
    e.preventDefault();
    setInvalid( e.target.validity.valid );
    setMessage( e.target.validationMessage );
  } else {
    setInvalid( true );
  }
};

export default invalidHandler;

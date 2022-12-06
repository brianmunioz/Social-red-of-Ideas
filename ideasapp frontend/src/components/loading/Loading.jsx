import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return <Spinner className="col-12 mx-auto d-block mt-5" animation="grow" />;
}

export default Loading;

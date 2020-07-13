import React from 'react';
import classnames from 'classnames'
import './Error.scss'

export default function Error(props) {
  const errorClass = classnames('login-error', {
    'login-error--enabled': props.errorMessage.length > 0,
    'login-error--disabled': props.errorMessage === ""
  })

  return (
    <span class={ errorClass }>
      {props.errorMessage}
    </span>
  )
}
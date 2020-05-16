import React from 'react'
import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const Mensaje = styled.p`
  background-color: whitesmoke;
  margin-top: .3rem;
  padding: .5rem;
  text-align: center;
  color: grey;
`
const MensajeTrue = styled.h3`
  background-color: whitesmoke;
  margin-top: .3rem;
  padding: 1rem;
  text-align: center;
  color: grey;
`




const Resultado = ({ cotizacion }) => {

  return (
      (cotizacion === 0)
      ? <Mensaje>Elige marca, año y tipo de seguro</Mensaje>
      :
      <TransitionGroup
        component="h3"
        className="resultado"
      >
        <CSSTransition
          classNames="resultado"
          key={cotizacion}
          timeout={{ enter: 500, exit: 500 }}
        >
         <div>
           <MensajeTrue>El total es: ${cotizacion}</MensajeTrue>
         </div>
        </CSSTransition>
      </TransitionGroup>
   )
}

Resultado.propTypes = {
  cotizacion: PropTypes.number.isRequired
}

export default Resultado;
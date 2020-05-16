import React from 'react';
import styled from '@emotion/styled'
import { primerMayuscula } from '../helper'
import PropTypes from 'prop-types'

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: whitesmoke;
  color: grey;
  margin-top: 1rem;
`
const Li = styled.li`
margin: 5px 0;
`






// sfc
const Resumen = ({ datos }) => {

  const { marca, year, plan } = datos

  if (marca === "" || year === "" || plan === "") {
    return null
  }

  return (
    <ContenedorResumen>
      <h2> Resumen de cotizacion </h2>
      <ul>
        <Li>Marca: { primerMayuscula(marca) }</Li>
        <Li>Plan: {primerMayuscula(plan)}</Li>
        <Li>Año: {year}</Li>
      </ul>
    </ContenedorResumen>
  )

}

Resumen.propTypes = {
  datos: PropTypes.object.isRequired
}


export default Resumen;
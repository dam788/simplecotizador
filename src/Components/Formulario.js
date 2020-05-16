import React, { useState } from 'react'
import styled from '@emotion/styled'
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper'
import PropTypes from 'prop-types'

// estilos
const Campo = styled.div`
  display: flex;
  margin: 1em;
  align-items: center;
`
const Label = styled.label`
  flex: 0 0 100px;
`
const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1em;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`
const InputRadio = styled.input`
  margin: 0 1em;
`

const Boton = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  letter-spacing: 1px;
  transition: background-color .3s ease;
  margin-top: 2rem;

  &:hover{
    cursor: pointer;
    background-color: #26C6DA;
  }
`
const Error = styled.div`
background-color: red;
color: white;
padding: 1rem;
width: 100%;
text-align: center;
`





const Formulario = ({guardarResumen, setCargando}) => {

  const [datos, setDatos] = useState({
    marca: '',
    year: '',
    plan: ''
  });

  const [error, setError] = useState(false);

  // extraer los valores del state
  const { marca, year, plan } = datos;

  // leer los datos del formulario y leerlos en el state
  const obtenerInformacion = e => {
    setDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {

    e.preventDefault();


    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      return  setError(true);
    }
    setError(false);

    // base de 2000
    let resultado = 2000

    // obtener la diferencia de años ....creamos un helper...
    const diferenciaYear = obtenerDiferenciaYear(year)

    // por cada año restar 3%
    resultado -= ((diferenciaYear * 3) * resultado) / 100

    //Aumentos si: Americano 15%,  Asiatico 5%, Europeo 30%
    resultado = calcularMarca(marca) * resultado

    // Aumenta si: Basico 20%, Completo 50%
    const incrementoPlan = obtenerPlan(plan)
    resultado = parseFloat( incrementoPlan * resultado ).toFixed(2) /* toFixed agrega los decimales */

    setCargando(true)

    setTimeout(() => {

      setCargando(false)
      guardarResumen({
        cotizacion: Number(resultado),
        datos
    })
    },1000)

  }



  return (
    <form
    onSubmit={handleSubmit}
    >

      { error ? <Error>Todos los campos son obligatorios</Error> : null }

      <Campo>
        <Label>Marca </Label>
        <Select
          name="marca"
          value={marca}
          onChange={obtenerInformacion}
        >
          <option value=""> -- Seleccione -- </option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año </Label>
        <Select
          name="year"
          value={year}
          onChange={obtenerInformacion}
        >
          <option value=""> -- Seleccione -- </option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        /> Basico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        /> Completo
      </Campo>
      <Boton type="submit">Cotizar</Boton>
    </form>
    );
}

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired
}

export default Formulario;
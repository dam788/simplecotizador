import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header'
import Formulario from './Components/Formulario'
import Resumen from './Components/Resumen'
import Resultado from './Components/Resultado'
import Spiner from './Components/Spiner'
import styled from '@emotion/styled'

// estilos en linea
const Contenedor = styled.div`
  position: relative;
  top: 6vh;
  max-width: 600px;
  margin: 0 auto;
`
const ContenedorFormulario = styled.div`
  background-color: white;
  padding: 3rem;
`




function App() {

  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  })

  const [cargando,setCargando] = useState(false)

  // extraer datos
  const { datos, cotizacion }= resumen

  return (
    <Contenedor>
      <Header
        titulo='Cotizador de seguros'
      />

      <ContenedorFormulario>
        <Formulario
          guardarResumen={guardarResumen}
          setCargando={setCargando}
        />
        <Resumen
        datos={datos}
        />
        {!cargando
          ? <Resultado
          cotizacion={cotizacion}
          />
          : null
        }
        {cargando ? <Spiner/> : null}
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;

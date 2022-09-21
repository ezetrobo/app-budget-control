import React, { Fragment } from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados
}) => {
  return (
    <div className='listado-gastos contenedor'>
        {filtro ? ( 
            <>
              <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
              {gastosFiltrados.map( item => (
                <Gasto 
                    key={item.id}
                    gasto={item}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
              ))}
            </>
          ) : (
            <>
              <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
              {gastos.map( item => (
                <Gasto 
                  key={item.id}
                  gasto={item}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))}
            </>
          )
        }
    </div>
  )
}

export default ListadoGastos
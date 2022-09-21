import { Fragment, useState, useEffect } from 'react'
import Filtros from './components/Filtros'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconNuevoGasto from './img/nuevo-gasto.svg'

const App = () => {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ){
      handleEditarGasto()
    }
  },[gastoEditar])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])


  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])


  const handleEditarGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }


  const guardarGasto = (data) => {

    if(gastoEditar.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id ===
      gastoEditar.id ? data : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      data.id = generarId()
      data.fecha = Date.now()
      setGastos([...gastos, data])
    }

    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500); 
  }


  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <Fragment>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </Fragment>
      )}
      {modal && 
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }
    </div>
  )
}
export default App

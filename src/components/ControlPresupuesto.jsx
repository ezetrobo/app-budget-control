import React from 'react'
import { useState,useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
const ControlPresupuesto = ({ 
    presupuesto,
    setPresupuesto,
    gastos,
    setGastos,
    setIsValidPresupuesto
}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)

      const totalDisponible = presupuesto - totalGastado

      const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)

      setGastado(totalGastado)
      setDisponible(totalDisponible)
      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
      }, 1000);
    }, [gastos])
    

    const formatCant = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultConfirm = confirm('¿Deseas reiniciar presupuesto y gastos?')

        if(resultConfirm) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }
 
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span> {formatCant(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {formatCant(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formatCant(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
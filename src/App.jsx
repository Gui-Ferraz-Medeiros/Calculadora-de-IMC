import './App.css'
import ImcCalc from './components/ImcCalc'
import ImcTable from './components/ImcTable'
import { data } from './data/data'
import { useEffect, useState } from 'react'

const getImcCategory = (imcValue) => {
  const numericValue = Number(imcValue)

  return (
    data.find(
      (item) => numericValue >= item.min && numericValue <= item.max,
    ) ?? data[data.length - 1]
  )
}

const formatDate = () =>
  new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

function App() {
  const [currentImc, setCurrentImc] = useState(null)
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem('imc-history')
    return storedHistory ? JSON.parse(storedHistory) : []
  })

  useEffect(() => {
    localStorage.setItem('imc-history', JSON.stringify(history))
  }, [history])

  const calcImc = (e, height, weight) => {
    e.preventDefault()

    if (!weight || !height) return

    const weightFloat = Number(weight.replace(',', '.'))
    const heightFloat = Number(height.replace(',', '.'))

    if (!weightFloat || !heightFloat || heightFloat === 0) return

    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1)
    const category = getImcCategory(imcResult)

    const record = {
      value: imcResult,
      classification: category.classification,
      info: category.info,
      obesity: category.obesity,
      infoClass: category.infoclass,
      date: formatDate(),
    }

    setCurrentImc(record)
    setHistory((previousHistory) => [record, ...previousHistory])
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Saúde & bem-estar</p>
          <h1>Calculadora de IMC</h1>
        </div>
      </header>

      <main className="dashboard">
        <ImcCalc calcImc={calcImc} />
        <ImcTable currentImc={currentImc} history={history} clearHistory={clearHistory} />
      </main>
    </div>
  )
}

export default App

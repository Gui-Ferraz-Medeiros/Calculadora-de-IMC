import './ImcTable.css'

const ImcTable = ({ currentImc, history, clearHistory }) => {
  const statusClass = currentImc ? `status ${currentImc.infoClass}` : 'status neutral'

  return (
    <aside className="result-panel">
      <div className="result-card">
        {currentImc ? (
          <>
            <span className="result-label">Seu IMC atual</span>
            <strong className={statusClass}>{currentImc.value}</strong>
            <p className={statusClass}>{currentImc.info}</p>
            <small>{currentImc.classification}</small>
          </>
        ) : (
          <>
            <span className="result-label">Aguardando cálculo</span>
            <strong className="status neutral">--</strong>
            <p>Insira seu peso e altura para calcular.</p>
          </>
        )}
      </div>

      <div className="history-card">
        <div className="history-header">
          <h3>Histórico de IMC</h3>
          {history.length > 0 && (
            <button type="button" className="clear-history" onClick={clearHistory}>
              Limpar
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={`${item.date}-${index}`} className="history-item">
                <div>
                  <span className="history-value">{item.value}</span>
                  <span className="history-date">{item.date}</span>
                </div>
                <span className={`history-badge ${item.infoClass}`}>{item.info}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-history">Nenhuma medição registrada ainda.</p>
        )}
      </div>
    </aside>
  )
}

export default ImcTable
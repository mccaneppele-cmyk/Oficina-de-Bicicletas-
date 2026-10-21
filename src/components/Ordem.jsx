function Ordem({ ordem, removeCliente, alternar, editar }) {
  return (
    <li className={ordem.ordemFinalizada ? "concluida" : ""}>
      <h3>{ordem.dsCliente}</h3>

      <span> {ordem.ordemFinalizada ? "Ordem de Serviço finalizada" : "Ordem de Serviço em andamento"}
      </span>

      <p>{ordem.dsServico}</p>

      <button onClick={() => removeCliente(ordem.id0rdem)}>
        Remover
      </button>

      <button onClick={() => alternar(ordem.id0rdem)}>
        {ordem.ordemFinalizada ? "Reabrir" : "Concluir"}
      </button>

      <button onClick={() => editar(ordem.id0rdem)}>
        Editar
      </button>
    </li>
  )
}

export default Ordem
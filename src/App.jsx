import Ordem from './components/Ordem'
import { useState } from 'react'
import './App.css'

function App() {
  const ordem_de_servico = [
    { id0rdem: crypto.randomUUID(), dsCliente: "Matheus", nuValor: 40, ordemFinalizada: true, dsServico: "Trocar pastilhas de freio",},
    { id0rdem: crypto.randomUUID(), dsCliente: "Guilherme", nuValor: 80, ordemFinalizada: true, dsServico: "Trocar Pneu",},
    { id0rdem: crypto.randomUUID(), dsCliente: "Lucas", nuValor: 50, ordemFinalizada: false, dsServico: "Trocar cambio",},
  ]

  const [clienteList, setClienteList] = useState(ordem_de_servico);

  const [erro, setErro] = useState("");
  const [dsCliente, setCliente] = useState("");
  const [dsServico, setServico] = useState("");

  const [idEditando, setIdEditando] = useState(undefined);

  const className = "erro", addOrdem = (evento) => {
    evento.preventDefault()
    if(dsCliente.trim()== "" || dsServico.trim() == "") {
      setErro("Preencha nome do cliente e serviço")
      return
    }



    if(idEditando) {
      const novaOrdem = clienteList.map((user) => user.id0rdem === idEditando ? { ...user, dsCliente, dsServico } : user)
      setClienteList(novaOrdem)
      setIdEditando(undefined)
      setCliente("")
      setServico("")
      return;
    }else {
      const novoCliente = { id0rdem: crypto.randomUUID(), dsCliente: dsCliente || "Nova Ordem", nuValor: 0, ordemFinalizada: false, dsServico: dsServico || "Trocar banco" }
      setClienteList([...clienteList, novoCliente])
      setCliente("")
      setServico("")
    }
  }

  const cancelEdit = (evento) => {
    evento.preventDefault();
    setIdEditando(undefined);
    setCliente("");
    setServico("");
  };

  const removeCliente = (id) => {
    if (!confirm("Tem certeza que deseja remover esta ordem de serviço?")) {
      return;
    }

    const newOrdem = clienteList.filter((ordem) => ordem.id0rdem !== id
    );

    setClienteList(newOrdem);
  };

  const alternar = (id) => {
    setClienteList(clienteList.map((ordem) => ordem.id0rdem === id ? { ...ordem, ordemFinalizada: !ordem.ordemFinalizada } : ordem))
  }

  const editar = (id) => {
    const cliente2 = clienteList.find(
      (ordem) => ordem.id0rdem === id
    );

    if (!cliente2) return;

    setCliente(cliente2.dsCliente);
    setServico(cliente2.dsServico);
    setIdEditando(id);
  };


  return (
    <>
      <div>
        <form>
      cliente <input value={dsCliente} onChange={(evento) => setCliente(evento.target.value)} />
      servico <input value={dsServico} onChange={(evento) => setServico(evento.target.value)} />
      <button onClick={cancelEdit}> {idEditando ? "Cancelar" : "Apagar"} </button>
      <button onClick={addOrdem}> {idEditando ? "Editar" : "Adicionar"} </button>
      {erro && <p>{erro}</p>}
      </form>
        <ul>
          {clienteList.map((ordem) => (
            <li key={ordem.id0rdem}>
            ordem={Ordem}
              <h3>{ordem.dsCliente}</h3>
              <span>{ordem.ordemFinalizada ? "Ordem de Serviço finalizada" : "Ordem de Serviço em andamento"}</span>
              <p>{ordem.dsServico}</p>
              <p>R$ {ordem.nuValor}</p>
              <button onClick={() => removeCliente(ordem.id0rdem)}>Remover</button>
              <button onClick={() => alternar(ordem.id0rdem)}>Alternar Ordem</button>
              <button onClick={() => editar(ordem.id0rdem)}>Editar</button>
            </li>
          ))}
        </ul>

        {clienteList.length === 0 && <p>Não há ordem de serviço</p>}
      </div>
    </>
  )
}

export default App
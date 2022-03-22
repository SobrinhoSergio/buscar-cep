import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./Styles.module.css";
import api from "./services/api";

function App() {
  
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("[ERROR]");
      setInput("");
    }
  }

  return (
    <main className={styles.main_container}>
      <div className={styles.container}>
        <h1 className={styles.title}>Buscador CEP</h1>
        <div className={styles.containerInput}>
          <input
            type="text"
            placeholder="Digite seu cep..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className={styles.buttonSearch} onClick={handleSearch}>
            <FiSearch size={25} color="#FFF" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <section className={styles.section}>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>
              {cep.localidade} - {cep.uf}
            </span>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;

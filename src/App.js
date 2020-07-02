import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api'

function App() {
  const [repos, setRepos] = useState([])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/renatoam",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    const repo = response.data

    setRepos([...repos, repo])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)

    setRepos(repos.filter(repo => repo.id !== id))
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      const repos = response.data
      setRepos(repos)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

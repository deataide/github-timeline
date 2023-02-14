import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './app.css';

interface IRepos {
  name: string;
  description?: string;
  created_at: string;
  html_url: string
}

export default function App() {
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [input, setInput] = useState('deataide');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(true)

  const fetchApi = () => {
    axios
      .get(`https://api.github.com/users/${input}/repos`)
      .then((res) => {
        setRepos(res.data);
      })
      .catch((err) => {
        alert('User does not exists')
      }).finally(()=>setIsLoading(false));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const generate = () => {
    setInput(input);
    fetchApi();
  };

  document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      setInput(input);
      fetchApi();

    }
  });



  return (
    <div>
      <header>
        <input
          type='text'
          name='input'
          id='input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />{' '}
        <button onClick={generate} className='button'>
          Generate
        </button>

      </header>

      <main>
        <div className='content'>
          <div className='timeline'>
            <ul>
          {isLoading && <span className='loading'>Loading</span>}
              {repos.map((repo) => (
                <li key={repo.created_at}>
                  <div>
                    <span>{repo.created_at}</span>
                    <time>{`Name: ${repo.name}`}</time>
                    {`Description: ${repo.description}`}
                    <a href={repo.html_url} target='_blank'>
                    <button >See on GitHub</button>

                    </a>

                  </div>
                
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

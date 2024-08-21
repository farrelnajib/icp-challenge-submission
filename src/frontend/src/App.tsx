import { useState } from 'react';

type IdentityResponse = {
  country: [Country]
}

type Country = {
  country_id: String,
  probability: number
}

function App() {
  const [greeting, setGreeting] = useState('');
  const [identity, setIdentity] = useState<IdentityResponse>();

  function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/greet?name=${name}`)
      .then(response => response.json()).then((json) => {
        setGreeting(json.greeting)
      });
  }

  function guessNationality(event: any) {
    event.preventDefault();
    const name = event.target.elements.guessname.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/guess-nationality`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name
      })
    })
      .then(response => response.json()).then((json) => {
        setIdentity(json as IdentityResponse);
      });
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>

      <br />
      <form action="#" onSubmit={guessNationality}>
        <label htmlFor="guessname">Enter your name again: &nbsp;</label>
        <input id="guessname" alt="Name" type="text" />
        <button type='submit'>Guess Nationality</button>
      </form>
      
      {identity && identity.country && identity.country.length > 0 && (
        <table border={1}>
          <thead>
            <tr>
              <td>Country</td>
              <td>Probability</td>
            </tr>
          </thead>
          <tbody>
              {identity.country.map(country => (
                <tr>
                  <td>{country.country_id}</td>
                  <td>{(country.probability * 100).toFixed(2)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </main >
  );
}

export default App;

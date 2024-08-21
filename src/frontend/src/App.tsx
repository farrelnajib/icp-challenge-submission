import { useState } from 'react';

type IdentityResponse = {
  results: [IdentityResult]
}

type IdentityResult = {
  name: {
    title: String,
    first: String,
    last: String,
  },
  gender: String,
  email: String,
  dob: {
    age: Number
  },
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

  function generateRandom(event: any) {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_CANISTER_URL}/generate-identity`, {
      method: "POST"
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
      <button onClick={generateRandom}>Generate New Identity</button>
      {identity && identity.results && identity.results.length > 0 && (
        <table border={1}>
          <tr>
            <td>Name</td>
            <td>{identity.results[0].name.title} {identity.results[0].name.first} {identity.results[0].name.last}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{identity.results[0].gender}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{identity.results[0].email}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{identity.results[0].dob.age.toString()}</td>
          </tr>
        </table>
      )}
    </main >
  );
}

export default App;

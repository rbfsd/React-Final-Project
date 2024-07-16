import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";
import App from "./App"

export default function Auth() {
  const [username, setUsername] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    fetch("/api/currentUser")
      .then(async (result) => {
        if (result.ok) {
          remult.user = await result.json();
          if (remult.user) {
            setSignedIn(true);
          }
        } else {
          console.error("Failed to fetch current user:", result.statusText);
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);

  async function doSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });

    if (result.ok) {
      remult.user = await result.json();
      setSignedIn(true);
      setUsername("");
    } else {
      alert(await result.json());
    }
  }

  async function signOut() {
    await fetch("/api/signOut", { method: "POST" });
    setSignedIn(false);
    remult.user = undefined;
  }

  if (!signedIn) {
    return (
      <>
        <h1>Todos</h1>
        <main>
          <form onSubmit={doSignIn}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nom d'utilisateur, essayez Steve ou Jane"
            />
            <button>Se connecter</button>
          </form>
        </main>
      </>
    );
  }

  return (
    <>
      <header>
        Bonjour {remult.user?.name}
        <button onClick={(_e) => signOut()}>Se déconnecter</button>
      </header> 
      <App/>
    </>
  );
}

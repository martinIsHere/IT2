<script>
  import { fade } from "svelte/transition";
  import questions from '$lib/data/themed_questions.json';
  import settings from '$lib/data/settings.json';

  let findExample = (theme) => {
    let q = null;
    for (var i = 0; i < questions.length; i++) {
      // indexOf vil returnere indeksen til elementet med verdien `theme`.
      // Den vil kun returnere -1 dersom den ikke finner et slikt element.
      // Vi ser derfor etter en verdi som ikke er -1
      if (questions[i].themes.indexOf(theme) !== -1) {
        q = questions[i];
        // avslutter løkke
        break;
      }
    }

    // dersom vi fant et eksempelspørsmål så returnerer vi det
    if (q !== null) {
      return q.text;
    } else {
      // ellers så gir vi error beskjed
      return "Ingen spørsmål";
    }
  }

</script>

<style>
  :global(.intro) {
  display: block;
  text-align: center;
  width: 1fr; 
  }
  .intro_banner {
    block-size: auto;
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #000000BD;
  }
  .centering_container {
    text-align: center;
  }

  .bekreft_knapp {
    padding: 2ch 4ch;
    margin: 4ch 4ch;
    text-align: center;
    background-color: #ffffff20;
    border: 1px solid #ffffff50;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .bekreft_knapp:hover {
    background-color: #ffffff40;
  }

  .button_container {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }

  .link1 {
    display: inline-block;
    font-size: 22pt;
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #00aaff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }

  .link1:visited {
    color: #bb33ff;
  }

  .enlarge_anim {
    transition: scale 0.4s;
  }

  .enlarge_anim:hover {
    scale:1.1;
  }

  table {
    width: 60%;
    margin: 0 auto;
    border-collapse: collapse;
    color: white;
  }

  th, td {
    border: 1px solid #ffffff40;
    padding: 0.5rem;
    text-align: left;
  }

  th {
    background-color: #ffffff20;
  }

</style>

<div class="intro_banner">
  <div in:fade={{duration:1000}} out:fade={{duration:0}}>
    <h1 class="intro" style="padding-top:60px;">Velkommen til en akademisk kunnskapsquiz!</h1>
    <div>
      <p style="padding-top:6ch;">Denne quizzen lar deg teste kunnskapen din gjennom et sett med spørsmål som varierer i tema og vanskelighetsgrad. Du kan tilpasse hvilke typer spørsmål du får, og svare i ditt eget tempo. Målet er å få så mange riktige svar som mulig og lære underveis. Det er også inkludert en god mengde 10 av 10 vanskelighetsgrad spørsmål med ekstra mange alternativ. Klarer du disse er du god!</p>
    </div>

    <div class="centering_container">
      <h2 class="intro">Her er noen eksempelspørsmål fra hvert tema:</h2>
      <table>
        <thead>
          <tr>
            <th>Tema</th>
            <th>Eksempel</th>
          </tr>
        </thead>
        <tbody>
          {#each settings.available_themes as theme (theme)}
            <tr>
              <td>{theme}</td>
              <td>
                {
                findExample(theme)
                }
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  <div class="button_container">
    <a class="bekreft_knapp" href="/quiz">QUIZZZ!</a>
  </div>
  </div>
</div>

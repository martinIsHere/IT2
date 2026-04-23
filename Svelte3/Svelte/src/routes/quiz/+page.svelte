<script lang="ts">
  import { fade } from "svelte/transition";
  import questions from '$lib/data/themed_questions.json';
  // fil med alle spørsmål
  /*
{
  "text": "Spørsmålet som vises til brukeren",
  "options": ["Svar 1", "Svar 2", "Svar 3"],
  "correct": 0,                                  -- indeks til korrekt svar i `options`
  "themes": ["tema1", "tema2"],
  "difficulty": 1
}
  */
  import settings from '$lib/data/settings.json';
  /*
    filter: liste over tema som er valgt som standard

    min_difficulty: laveste tillatte vanskelighetsgrad i filtrering

    max_difficulty: høyeste tillatte vanskelighetsgrad i filtrering

    available_themes: alle tema brukeren kan velge mellom i UI
  */

  // definerer verdier basert på standarder oppgitt i json fil
  let min_difficulty = settings.min_difficulty;
  let max_difficulty = settings.max_difficulty;
  let max_amount_questions = 10;

  const available_themes = settings.available_themes;
  let selected_themes = new Set(settings.filter);

  function toggle_theme(theme) {
    if (selected_themes.has(theme)) {
      selected_themes.delete(theme);
    } else {
      selected_themes.add(theme);
    }

    // tvinger Svelte til å oppdatere UI
    selected_themes = new Set(selected_themes);
  }

  let shuf_filt_questions = [];

  let current = -1;
  let score = 0;
  let finished = false;
  let answer_selected = false;

    // velg svar uten å gå videre
  function select_answer(index) {
    if (index === shuf_filt_questions[current].correct) score++;
    answer_selected = true;
  }

  // gå videre til neste spørsmål
  function confirm_answer() {
    const max_index = shuf_filt_questions.length - 1;
    if (current < max_index) {
      current++;
    } else {
      finished = true;
    }
    answer_selected = false;
  }

  // bestem farge basert på om spørsmålet er korrekt
  function get_color(question, index) {
    if (index == question.correct) return "#00FF00";
    return "#FF0000";
  }

  // sjekker om et spørsmål inneholder et tema. Kan også bruke indexOf
  function has_theme(themes, fTheme) {
    for (const theme of themes) {
      if (theme == fTheme) {
        return true;
      }
    }
    return false;
  }

  /*
    Denne funksjonen skal filtrere listen med spørsmål. 
  */
  function apply_filters(questions, filter) {
    // definerer en tom liste 
    // denne skal fylles med spørsmål etter filter
    let filtered_array = [];

    // først itererer funksjonen gjennom alle spørsmål
    for (const question of questions) {
      // for hvert tema i filteret
      for (const filter_theme of filter) {
        // sjekker vi om spørsmålet inneholder temaet
        if(has_theme(question.themes, filter_theme)) {
          // dersom spørsmålet har temaet, legges det til i listen.
          filtered_array.push(question);
          // for å unngå at spørsmål med flere matchende tema
          // skal legges til flere ganger, avslutter vi løkken.
          break;
        }
      }
    }
    console.log(filtered_array.length);

    // den filtrerte listen:
    return filtered_array;
  }

  /*
    Bruker Fisher-yates algoritme for å blande listen.
    https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    Den innebærer å gå baklengs gjennom listen en gang, og bytte 
    om to element.
  */
  function shuffle(array) {
    /*
      lager en kopi av data
      merk at `const copy = array;` ikke fungerer.
      I dette tilfellet hadde copy inneholdt referansen
      til `array`, **ikke** verdien.
    */
    const copy = [...array];

    // iterer baklengs fra slutt av listen med spørsmål
    for (let i = copy.length - 1; i > 0; i--) {
      // genererer tilfeldig indeks fra 0 til i
      const j = Math.floor(Math.random() * (i + 1));
      // bytter om på verdiene
      // kan også bruke en buffer variabel, men denne løsningen
      // unngår det.
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function filter_difficulty(questions, min_difficulty, max_difficulty) {
    // definerer en tom liste 
    // denne skal fylles med spørsmål etter filter
    let filtered_array = [];

    // først itererer funksjonen gjennom alle spørsmål
    for (const question of questions) {
      // sjekker om spørsmålets vanskelighetsgrad er innenfor grenser
      if (question.difficulty >= min_difficulty && question.difficulty <= max_difficulty) {
          filtered_array.push(question);
      }
    }

    // den filtrerte listen:
    return filtered_array;
  }

  // setter innstillinger og start quiz
  function start_quiz() {
    /*
      Utfører filtreringen basert på brukerens ønsker.
    */
    const filtered_questions = apply_filters(questions, Array.from(selected_themes));

    const filtered_questions2 = filter_difficulty(filtered_questions, min_difficulty, max_difficulty);

    const shuf_filt_questions_full = shuffle(filtered_questions2);

    shuf_filt_questions = shuf_filt_questions_full.slice(0, max_amount_questions);

    /*
      Her printer jeg listene til konsollen for hvert stadium 
      i prosessen.
      Listene blir aldri mutert for ryddighetens skyld. Siden 
      dataen er så liten så er ikke dette kostbart.
    */

    console.log("Filtrert etter tema: ");
    for (const question of filtered_questions) {
      console.log(question.text);
    }

    console.log("Filtrert etter vanskelighetsgrad: ");
    for (const question of filtered_questions2) {
      console.log(question.text);
    }

    console.log("Blandet: ");
    for (const question of shuf_filt_questions) {
      console.log(question.text);
    }

    // for at den skal starte
    current++;
  }

</script>

<style>
  .bekreft_knapp {
    padding: 2ch 4ch;
    margin: 2ch 4ch;
    font-size:15pt; 
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
  .bekreft_knapp_no_hover {
    padding: 2ch 4ch;
    margin: 2ch 4ch;
    font-size:15pt; 
    text-align: center;
    background-color: #ffffff20;
    border: 1px solid #ffffff50;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .theme-grid {
    display: grid;
    width: 100%;
    max-width: 900px;
    margin: 2rem auto;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }

  .theme-grid button {
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #ffffff40;
    background-color: #ffffff10;
    color: white;
    cursor: pointer;
    transition: 0.2s;
  }

  .theme-grid button:hover {
    background-color: #ffffff25;
  }

  .theme-grid button.selected {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  .settings-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 2rem auto;
    color: white;
  }

  input[type="range"] {
    width: 100%;
    accent-color: #4caf50;
  }
</style>


<!-- mørkt lag -->
<div style="z-index:0; position: fixed; min-width: 100vw;min-height: 100vh;left:0;top:0; background-color: #000000bd;"></div>
<!-- tomplass -->
<div style="min-height:25px;"></div>
{#if current<0}
  <!-- innstillinger for quiz -->
  <div style="z-index:1; position:relative; text-align: center;">
    <h2 style="font-weight:normal; padding: 10px; text-align: center;">Tema</h2>
  <!-- grid med alle tema. responsiv og kan klikkes for å endre valgte tema -->
    <div class="theme-grid">
      {#each available_themes as theme (theme)}
        <button
          class:selected={selected_themes.has(theme)}
          on:click={() => toggle_theme(theme)}
        >
          {theme}
        </button>
      {/each}
    </div>
  <div class="settings-panel">
  <!-- diverse andre verdier i form av slidere -->

    <h3>Vanskelighetsgrad</h3>

    <label>Min: {min_difficulty}</label>
    <input
      type="range"
      min="0"
      max="10"
      step="1"
      bind:value={min_difficulty}
    />

    <label>Max: {max_difficulty}</label>
    <input
      type="range"
      min="0"
      max="10"
      step="1"
      bind:value={max_difficulty}
    />

    <h3>Antall spørsmål</h3>

    <label>{max_amount_questions}</label>
    <input
      type="range"
      min="1"
      max="50"
      step="1"
      bind:value={max_amount_questions}
    />

  </div> <!-- start quiz knapp -->
    <button class="bekreft_knapp_no_hover" on:click={start_quiz}>Start quiz</button>
  </div>
{:else}
  <div style="z-index:1;position: relative; text-align: center;">
    <!-- Sjekker om den aktive listen med spørsmål er tom. I så fall
    kan vi ikke bruke `shuf_filt_questions[current]`, det vil gi error. -->
    {#if shuf_filt_questions.length === 0}
  <!-- dersom ingen spørsmål passer ønskene -->
        <h2>Ingen spørsmål funnet</h2>
        <button class="bekreft_knapp" on:click={()=>{current=-1; finished=false;}}>Ny quiz</button>
    {:else}
  <!-- spørsmål og svar -->
      {#if !finished}
        <h2 style="font-size: 50pt;">({current+1}/{shuf_filt_questions.length}) {shuf_filt_questions[current].text}</h2>
        {#if !answer_selected} <!-- holder på å velge svar -->
          {#each shuf_filt_questions[current].options as option, i (i)}
            <button class="bekreft_knapp" on:click={() => select_answer(i)}>{option}</button>
          {/each}
          <br><button class="bekreft_knapp" style="color:red; scale:0.8; margin-top:4em;" on:click={() => {finished = true;}}>GI OPP</button>
        {:else} <!-- har valgt, men ikke gått videre-->
          {#each shuf_filt_questions[current].options as option, i (i)}
            <button class="bekreft_knapp_no_hover" style="background-color: {get_color(shuf_filt_questions[current], i)};">{option}</button>
          {/each}
          <br><button class="bekreft_knapp" on:click={confirm_answer}>videre</button>
        {/if}
      {:else} <!-- har fullført quizen -->
        <div in:fade={{duration:1000}} out:fade={{duration:0}}>
          <h2>Ferdig!</h2>
          <p style="text-align: center;">Du fikk {score} av {shuf_filt_questions.length} <span style="color:#00FF00;font-weight:normal;">riktige</span>.</p>
          <button class="bekreft_knapp" on:click={()=>{current=-1; finished=false;}}>Ny quiz</button>
        </div>
      {/if}
    {/if}
  </div>
{/if}

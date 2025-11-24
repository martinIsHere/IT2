<script lang="ts">
  let questions = [ // array med spørsmål objekt
      { text: "Når ble internett opprinnelig utviklet?", // spørsmålet
      options: ["1960-tallet", "1970-tallet", "1980-tallet"], // svaralternativ
      correct: 0 // indeks i "options" array til korrekt svar
      },
      { text: "Hva het det første nettverket som regnes som starten på internett?", options: ["World Wide Web", "ARPANET", "TCP/IP"], correct: 1 },
      { text: "Hvem regnes som oppfinneren av World Wide Web?", options: ["Vint Cerf", "Tim Berners-Lee", "Bill Gates"], correct: 1 },
      { text: "Hva står HTTP for?", options: ["HyperText Transfer Protocol", "High Transmission Technology Protocol", "Hyperlink Transfer Process"], correct: 0 },
      { text: "Hva var hovedformålet med cookies da de ble introdusert?", options: ["Sporing av brukere", "Lagring av små informasjonsbiter som innstillinger og handlekurver", "Reklamevisning"], correct: 1 },
      { text: "Hvilket år ble GDPR innført i EU?", options: ["2016", "2018", "2020"], correct: 1 }
  ];

  let current = 0;
  let score = 0;
  let finished = false;
  let answer_selected = false;

  // velg svar uten å gå videre
  function select_answer(index) {
    if (index === questions[current].correct) score++;
    answer_selected = true;
  }

  // gå videre til neste spørsmål
  function confirm_answer() {
    const max_index = questions.length - 1;
    if (current < max_index) {
      current++;
    } else {
      finished = true;
    }
    answer_selected = false;
  }

  // bestem farge basert på om spørsmålet er korret
  function get_color(question, index) {
    if (index == question.correct) return "#00FF00";
    return "#FF0000";
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
    cursor: cursor;
    transition: background-color 0.3s;
  }
</style>

<!-- mørkt lag -->
<div style="z-index:0; position: fixed; min-width: 100vw;min-height: 100vh;left:0;top:0; background-color: #000000bd;"></div>
<!-- tomplass -->
<div style="min-height:25px;"></div>
<!-- spørsmål og svar -->
<div style="z-index:1;position: relative; text-align: center;">
  {#if !finished}
    <h2 style="font-size: 50pt;">{questions[current].text}</h2>
    {#if !answer_selected} <!-- holder på å velge svar -->
      {#each questions[current].options as option, i (i)}
        <button class="bekreft_knapp" on:click={() => select_answer(i)}>{option}</button>
      {/each}
    {:else} <!-- har valgt, men ikke gått videre-->
      {#each questions[current].options as option, i (i)}
        <button class="bekreft_knapp_no_hover" style="background-color: {get_color(questions[current], i)};">{option}</button>
      {/each}
      <br><button class="bekreft_knapp" on:click={confirm_answer}>videre</button>
    {/if}
  {:else} <!-- har fullført quizen -->
    <h2>Quiz ferdig!</h2>
    <p style="text-align: center;">Du fikk {score} av {questions.length} <span style="color:#00FF00;font-weight:normal;">riktige</span>.</p>
  {/if}
</div>

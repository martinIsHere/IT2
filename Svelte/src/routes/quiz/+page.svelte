

<script>
  // let questions = [
  //   { text: "Hva er hovedstaden i Norge?", options: ["Oslo", "Bergen", "Trondheim"], correct: 0 },
  //   { text: "Hvilket år ble Svelte lansert?", options: ["2016", "2018", "2020"], correct: 1 }
  // ];

  let questions = [
      { text: "Når ble internett opprinnelig utviklet?", options: ["1960-tallet", "1970-tallet", "1980-tallet"], correct: 0 },
      { text: "Hva het det første nettverket som regnes som starten på internett?", options: ["World Wide Web", "ARPANET", "TCP/IP"], correct: 1 },
      { text: "Hvem regnes som oppfinneren av World Wide Web?", options: ["Vint Cerf", "Tim Berners-Lee", "Bill Gates"], correct: 1 },
      { text: "Hva står HTTP for?", options: ["HyperText Transfer Protocol", "High Transmission Technology Protocol", "Hyperlink Transfer Process"], correct: 0 },
      { text: "Hva var hovedformålet med cookies da de ble introdusert?", options: ["Sporing av brukere", "Lagring av små informasjonsbiter som innstillinger og handlekurver", "Reklamevisning"], correct: 1 },
      { text: "Hvilket år ble GDPR innført i EU?", options: ["2016", "2018", "2020"], correct: 1 }
  ];

  let current = 0;
  let score = 0;
  let finished = false;

  function answer(index) {
    if (index === questions[current].correct) score++;
    if (current < questions.length - 1) {
      current++;
    } else {
      finished = true;
    }
  }
</script>

<style>
  .bekreft_knapp {
    padding: 2ch 4ch;
    margin: 4ch 4ch;
    text-align: center;
    background-color: #ffffff20; /* semi-transparent white */
    border: 1px solid #ffffff50;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .bekreft_knapp:hover {
    background-color: #ffffff40;
  }
</style>

<div style="z-index:0; position: fixed; min-width: 100vw;min-height: 100vh;left:0;top:0; background-color: #000000bd;"></div>
<div style="z-index:1;position: relative; text-align: center;">
  {#if !finished}
    <h2>{questions[current].text}</h2>
    {#each questions[current].options as option, i}
      <button class="bekreft_knapp" on:click={() => answer(i)}>{option}</button>
    {/each}
  {:else}
    <h2>Quiz ferdig!</h2>
    <p style="text-align: center;">Du fikk {score} av {questions.length} <span style="color:#00FF00;font-weight:normal;">riktige</span>.</p>
  {/if}
</div>

<script>
  import { fade } from "svelte/transition";
  let fornavn="";
  let etternavn="";
  let navn_er_bekreftet = false;
  function confirmName(){
    if (fornavn != "" && etternavn != "") {
      navn_er_bekreftet=true;
    }
  };
  function avbekreft_navn(){
    navn_er_bekreftet=false;
  }

  // Liste med årstall og korte beskrivelser
  // bruker svelte "each" for å korte ned html-koden og hindre repetisjon
    const internetHistory = [
      { year: 1969, event: "ARPANET blir lansert – starten på internett" },
      { year: 1983, event: "Overgang til TCP/IP – grunnlaget for moderne internett" },
      { year: 1989, event: "Tim Berners-Lee foreslår World Wide Web" },
      { year: 1991, event: "WWW blir offentlig tilgjengelig" },
      { year: 1993, event: "Mosaic – første populære nettleser" },
      { year: 1998, event: "Google blir grunnlagt" },
      { year: 2004, event: "Facebook lanseres – starten på sosiale medier-boomen" },
      { year: 2007, event: "iPhone lanseres – mobil internett tar av" },
      { year: 2010, event: "Cloud computing blir mainstream" },
      { year: 2020, event: "Internettbruk når over 4,5 milliarder mennesker" }
    ];
  
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

</style>

<div class="intro_banner">
    <h1 class="intro" style="padding-top:60px;">Velkommen!</h1>
  {#if !navn_er_bekreftet} <!-- ingen navn skriven enda -->
    <p class="intro" style="padding-bottom:10px;">Hva heter du?</p>
    <div class="intro">
      <label>Fornavn: <input class="enlarge_anim" bind:value={fornavn} /></label>
    </div><br>
    <div class="intro">
    <label>Etternavn: <input class="enlarge_anim" bind:value={etternavn} /></label><br>
    </div>
    <div class="centering_container">
    <button class="bekreft_knapp" on:click={confirmName}>Bekreft</button> <br>
    </div>
  {:else} <!-- ingen navn skriven enda -->
    <div in:fade={{duration:1000}} out:fade={{duration:0}}>
      <p class="intro" style="color:#99FF99;"><b>Hei {fornavn} {etternavn}</b>!</p>
      <div class="centering_container">
          <button class="bekreft_knapp" on:click={avbekreft_navn}>Angre</button><br>
      </div>
      <p style="padding-top:6ch;">Internettet har forandret verden på måter vi knapt kunne forestille oss. Fra de første eksperimentene med datanettverk til dagens digitale samfunn, er historien full av banebrytende øyeblikk, geniale ideer og mennesker som våget å tenke stort. Bli med på en reise gjennom tid, teknologi og kultur – og se hvordan internett ble selve nerven i vår moderne verden. Først, litt kjedelig fakta</p>
      <div style="margin-top: 50px; padding: auto auto; display: flex; justify-content: center; font-weight: normal;">
        <h2 style="font-weight:normal; padding: 10px;">Noen viktige årstall</h2>
        <ul>
          {#each internetHistory as item}
            <li>
              <span class="year">{item.year}</span>: {item.event}
            </li>
          {/each}
        </ul>
      </div>
      <div class="centering_container">
        <a style="text-align:center;" class="link1 enlarge_anim" href="/textboxes">Videre</a>
      </div>
    </div>
  {/if}
</div>

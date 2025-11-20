
<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let popup_is_hidden = true;

  let toggle_popup = () => {
    if (popup_is_hidden) {
      popup_is_hidden = false;
    } else {
      popup_is_hidden = true;
    }
  }

  setTimeout(toggle_popup, 2000);

  onMount(()=>{
  });
</script>

<style>

  .bare {
    margin: 0;
    padding: 0;
  }

  .absCenter {
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
  }

  .popup_size {
    /*
    width: 60vw;
    height: 60vh;
    */
    width: 90ch;
    height: 80ch;
    max-width: 70vw;
    max-height: 90vh;
  }

  .whiteBG {
    background-color: white;
  }

  .float {
    box-shadow: 0 4px 12px rgba(0,0,0,0.9);
    transition: box-shadow 0.2s;
  }

  .float:hover {
    box-shadow: 0 10px 18px rgba(80,80,80,0.9);
  }

  .noOverflow {
    overflow: hidden;
  }

  .button_confirm {
    padding: 8px 25px;
    margin: 8ch 0ch;
    text-align: center;
    background-color: #00000060; /* semi-transparent white */
    border: 1px solid #00000080;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    scale: 2;
    transition: background-color 0.3s;
  }
  .button_confirm:hover {
    background-color: #FF000040;
  }

  .noInherit {
    all: initial;
  }

  .center_static {
    padding: auto 0;
    text-align: center;
  }

  .linearBG {
    background: linear-gradient(to bottom, #00000000, #0000BB40, #00000000);
  }

  .scroll_box {
    overflow-y: auto;
  }
  
</style>

{#if !popup_is_hidden}
<div class="absCenter" style="z-index: 90002">
  <div transition:fly={{x: -10, y:10, duration:1000}} class="popup_size whiteBG bare float noOverflow scroll_box" style="z-index: 90001; border-radius: 1%;">
    <div class="noInherit" style="z-index:90000;">
        <div class="noOverflow" style="margin-bottom:8ch;">
          <h2 class="center_static linearBG">
            <u>Internettets historie og mulighetene det åpnet</u>
          </h2>
          <p class="center_static">
            Internett startet på slutten av 1960-tallet som ARPANET, et amerikansk forskningsprosjekt som skulle koble sammen datamaskiner over store avstander. På 1970- og tidlig 1980-tallet utviklet forskere TCP/IP, standarden som gjorde det mulig for ulike nettverk å kommunisere. Da TCP/IP ble tatt i bruk i 1983, regnes dette som starten på det moderne internettet.

            Et viktig gjennombrudd kom i 1989 da Tim Berners-Lee utviklet World Wide Web, med nettsider, hyperlenker og den første nettleseren. Dette gjorde internett tilgjengelig for vanlige brukere og endret det fra et forskningsverktøy til en global plattform.

            Etter hvert som internett vokste gjennom 1990- og 2000-tallet, åpnet det enorme muligheter: rask kommunikasjon via e-post og meldinger, tilgang til informasjon fra hvor som helst, netthandel og nettbank, sosiale medier, samarbeid på tvers av landegrenser, strømming av musikk og film, og nye teknologier som skytjenester og mobil internettbruk. I dag er internett en nøkkelressurs for utdanning, arbeid, forskning og hverdagsliv for milliarder av mennesker.
          </p>
        </div>
        <div class="center_static" >
          <button on:click={toggle_popup} class="button_confirm"> OK </button>
        </div>
    </div>
  </div>
</div>
{/if}

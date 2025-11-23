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
  
</script>

<style>
  :global(.intro) {
  display: block; /* or inline-block with a defined width */
  text-align: center;
  width: 1fr; 
  }
  .intro_banner {
    block-size: 850px;
    background-color: #000000BD;
  }
  .centering_container {
    text-align: center;
  }

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

  .link1 {
    display: inline-block;
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.6); /* dark transparent background */
    color: #00aaff; /* bright blue */
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }

  /* Hover: slightly darker blue text */
  .link1:hover {
    color: #0088cc; /* darker blue */
  }

  /* Visited: bright purple */
  .link1:visited {
    color: #bb33ff; /* bright purple */
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

  {#if !navn_er_bekreftet}
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
  {/if}
  {#if navn_er_bekreftet}
    <div in:fade={{duration:1000}} out:fade={{duration:0}}>
      <p class="intro" style="color:#99FF99;"><b>Hei {fornavn} {etternavn}</b>!</p>
      <div class="centering_container">
          <button class="bekreft_knapp" on:click={avbekreft_navn}>Angre</button><br>
      </div>
      <p style="padding-top:6ch;">Internettet har forandret verden på måter vi knapt kunne forestille oss. Fra de første eksperimentene med datanettverk til dagens digitale samfunn, er historien full av banebrytende øyeblikk, geniale ideer og mennesker som våget å tenke stort. Bli med på en reise gjennom tid, teknologi og kultur – og se hvordan internett ble selve nerven i vår moderne verden. <a class="link1" href="/textboxes">Videre</a></p>
    </div>
  {/if}
</div>

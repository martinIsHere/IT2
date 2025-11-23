<script>
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
    block-size: 450px;
    background-color: #000000BD;
  }
  .centering_container {
    text-align: center;
  }

  .bekreft_knapp {
    padding: 8px 25px;
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

<div class="intro_banner">
    <h1 class="intro" style="padding-top:60px;">Velkommen!</h1>
    <p class="intro" style="padding-bottom:10px;">Hva heter du?</p>

  {#if !navn_er_bekreftet}
    <label class="intro">Fornavn: <input bind:value={fornavn} /></label><br>
    <label class="intro">Etternavn: <input bind:value={etternavn} /></label><br>
    <div class="centering_container">
    <button class="bekreft_knapp" on:click={confirmName}>Bekreft</button> <br>
    </div>
  {/if}
  {#if navn_er_bekreftet}
    <p class="intro">Hei {fornavn} {etternavn}!</p>
    <div class="centering_container">
        <button class="bekreft_knapp" on:click={avbekreft_navn}>Angre</button><br>
    </div>
  {/if}
</div>

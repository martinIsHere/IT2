<script>
  let fornavn="";
  let etternavn="";
  let nameConfirmed = false;
  function confirmName(){
    if (fornavn != "" && etternavn != "") {
      nameConfirmed=true;
    }
  };
  function unconfirm(){
    nameConfirmed=false;
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
  .button_confirm {
    padding: 8px 25px;
    text-align: center;
    background-color: #ffffff20; /* semi-transparent white */
    border: 1px solid #ffffff50;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .button_confirm:hover {
    background-color: #ffffff40;
  }
</style>
<div class="intro_banner">
<h1 class="intro" style="padding-top:60px;">Velkommen!</h1>
<p class="intro" style="padding-bottom:10px;">Hva heter du?</p>
<!--<code class="intro">&lt;script&gt;</code><br/>-->
{#if !nameConfirmed}
<label class="intro">Fornavn: <input bind:value={fornavn} /></label><br>
<label class="intro">Etternavn: <input bind:value={etternavn} /></label><br>
<div class="centering_container">
<button class="button_confirm" on:click={confirmName}>Bekreft</button> <br>
</div>
{/if}
{#if nameConfirmed}
<p class="intro">Hei {fornavn} {etternavn}!</p>
<div class="centering_container">
    <button class="button_confirm" on:click={unconfirm}>Angre</button><br>
</div>
{/if}
</div>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<h1 class="intro">Velkommen!</h1>
<!-- flexbox --- https://www.youtube.com/watch?v=aEj6k-gi9-s  -->
<!-- How to (Toggle) CSS Classes with JavaScript --- https://www.youtube.com/watch?v=CiM_Ze-7Aso  -->
<!-- https://svelte.dev/playground/ed4fef4beceb4b0eb295d1f9fdf3bd62?version=5.43.4#H4sIAAAAAAAACoVSTY-bMBT8K673wK5EgGSzm8phI7XqoYceeys9GPuRWDE2sh9Nooj_XhmIUtL9ODJv3jzGM2dqeA2U0W_c7WsrgaDdbjXQmFZKg6fs15niqQmUAND4svClaRL_BzQGrOQeXsOFNQgGPWU098KpBjeFKVDVjXVIvraI1pDK2ZpESTp8jstR4GlAEmTJC4kO1mkZrQuTp1clk-_mm--gtY3JOTC7T3m6m28Kkw9q_bmfvaWweQVN7vGkoZ-zrbYl1_ellacHcg5QgSUX-62zrZEzYbV1jNxVCwBYrIf5Bcyyz8vqeQTRceMVKmsYuRUgWfLoA627vZlIyd1-Fp7_vfNz-Zgts5vzZSUWYrUedfN0cEVjinBEytC10MVvRDh58GmKt6NXg6xaI4LXsTP3488flJH2kEgr2hoMJr1Fobn3P5THZCRHV9PRQ2G6SbB5OVTDGia0EvuX87DV9XnlXltMAy0tL4H-E-e4-06Oq-dssZo-5GGnEEaotE6CY8RYM4VmjkvVekaWzXEcNFxKZbaMZMmTg_rSAzjirC9DZV3NSNs04AT3F7mPa_ChiUnv_jPxZhd-xxS50iEjyiquPXR_AYJjLr0EBAAA  -->
<!-- https://stackoverflow.com/questions/71760177/styling-the-body-element-in-svelte -->

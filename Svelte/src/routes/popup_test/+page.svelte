
<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';

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
    background: linear-gradient(to bottom, #00000000, #FF00FF40, #00000000);
  }

  .whiteBG {
    background-color: white;
  }

  .wavyBG {
    background: linear-gradient(to bottom, #FFAAAA, #AAFFAA, #AAAAFF);
  }

  .clean_border {
    border: 2px solid;
  }

  .scroll_box {
    overflow-y: auto;
  }
  
</style>

{#if !popup_is_hidden}
<div transition:fly={{duration:1000}} style="position: fixed; inset: 0; left: 0; top: 0; width: 100vw; height: 100dvh; background: radial-gradient(#000000FF, #00000000); z-index: 8999"></div>
<div class="absCenter" style="z-index: 9002">
  <div transition:fly={{x: -10, y:10, duration:100}} class="popup_size whiteBG bare float noOverflow scroll_box wavyBG" style="z-index: 90001; border-radius: 1%;">
    <div class="noInherit" style="z-index:9000;">
        <div class="noOverflow" style="margin-bottom:8ch;">
          <h2 class="center_static" style="color: #AAFFAA;">
            <u>Pop-up vinduer</u>
          </h2>
          <p class="center_static clean_border whiteBG">
            Pop-up-vinduer dukket opp på slutten av 1990-tallet som en metode for annonsering på nettet. De ble populære fordi de kunne vises utenfor selve nettsiden og dermed fange brukerens oppmerksomhet, men ble raskt upopulære på grunn av hvor forstyrrende de var. Dette førte til utviklingen av pop-up-blokkere og strengere nettleserregler. Cookies, derimot, ble introdusert av Netscape i 1994 som en løsning for å lagre små informasjonsbiter på brukerens maskin, slik at nettsteder kunne huske innstillinger, handlekurver og innloggingsstatus. Over tid ble cookies også brukt til sporing og målrettet reklame, noe som utløste debatter om personvern og førte til reguleringer som GDPR og strengere kontroll over tredjeparts-cookies.
          </p>
        </div>
        <div class="center_static" >
          <button on:click={toggle_popup} class="button_confirm"> OK </button>
        </div>
    </div>
  </div>
</div>
{/if}

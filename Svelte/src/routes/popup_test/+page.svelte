
<script>
let popup_is_hidden = false;

let toggle_popup = () => {
  if (popup_is_hidden) {
    popup_is_hidden = false;
  } else {
    popup_is_hidden = true;
  }
}
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
    width: 60ch;
    height: 60ch;
    max-width: 60vw;
    max-height: 90vh;
  }

  .whiteBG {
    background-color: white;
  }

  .float {
    box-shadow: 0 4px 12px rgba(0,0,0,0.9);
  }

  .noOverflow {
    overflow: hidden;
  }

  .button_confirm {
    padding: 8px 25px;
    text-align: center;
    background-color: #00000060; /* semi-transparent white */
    border: 1px solid #00000080;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .button_confirm:hover {
    background-color: #FF000040;
  }

  .noInherit {
    all: initial;
  }

  .center_static {
    margin: auto 0;
    text-align: center;
  }
</style>


{#if !popup_is_hidden}
<div class="absCenter popup_size whiteBG bare float noOverflow" style="z-index: 90000;">
  <div class="noInherit" style="z-index:90001;">
      <div class="noOverflow" style="margin-bottom:8ch;">
        <h1 class="center_static">
          <u>Piss and Shit</u>
        </h1>
        <p class="center_static">
          nevermind cuh
        </p>
      </div>
      <div class="center_static" >
        <button on:click={toggle_popup} class="button_confirm"> OK </button>
      </div>
  </div>
</div>
{/if}

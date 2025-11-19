
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
}

.whiteBG {
  background-color: white;
}

.float {
  box-shadow: 0 4px 12px rgba(0,0,0,0.9);
}

.noInherit {
  /*
  width: initial;
  height: initial;
  background-color: initial;
  box-shadow: initial;
  position: initial;
  left: initial;
  top: inital;
  transform: initial;
  margin: initial;
  padding: initial;
  */
  all: initial;
}

.center_static {
  margin: auto 0;
  text-align: center;
}
</style>


{#if !popup_is_hidden}
<div class="absCenter popup_size whiteBG bare float" style="z-index: 90000;">
  <div class="noInherit" style="z-index:90001;">
    <h1 class="center_static">
      <u>Piss and Shit</u>
    </h1>
    <p class="center_static">
      nevermind cuh
    </p>
      <div class="center_static" >
        <button on:click={toggle_popup}> OK </button>
      </div>
  </div>
</div>
{/if}

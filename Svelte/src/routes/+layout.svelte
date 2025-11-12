<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

  let BG_color = "#000000bf"
  let TXT_color = "#FFFFFF"
	let { children } = $props();
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
  :global(html), :global(body){
    width: 100%;
    min-height: 100%;
    background-color: #000000;
    margin: 0;
    padding: 0;
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: lighter;
    font-style: normal;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;
  }
  :global(body::-webkit-scrollbar) {
    display: none;
  }

  .content {
    background-color:red;
  }

  .gradient_wrapper {
    border: 1px solid;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: linear-gradient(to bottom right, #111188, #FF3366, #002200);
    background-repeat: no-repeat; /* prevents looping */
    margin: 0;
    padding: 0;
    z-index: -1;
  }

  .star_backdrop {
    background-image: url("$lib/assets/Stars.svg");
    margin: 0;
    padding: 0;
    color: #FFFFFF;
    min-height: 100vh;
    height: 100%;
    width:100%;
    z-index: 0;
  }

  .toolbar {
    background: linear-gradient(to right, #220000, #440000);
    background-color:#220000; 
    position:sticky;
    margin: 0px;
    padding: 20px 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    top:0px;
    left:0px;
    width:100vw;
    font-size: 14pt;
    z-index: 1000;
  }


  .toolbar_link {
    color: #FFFFFF;
    background-color: #b54a7280;
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 10px 10px;
    padding: 15px 25px;
    border-radius: 25px;
    text-decoration: none;
  }
  :global(h1){
    font-size: 62pt;
    font-weight: lighter;
  }
  :global(p){
    font-size: 24pt;
    margin: 1pt 10%;
  }
  :global(section){
    margin: 1pt 10%;
  }

</style>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="toolbar">
  <a class="toolbar_link" href="/">Hjem</a>
  <a class="toolbar_link" href="/textboxes">Tekstbokser</a>
  <a class="toolbar_link" href="/game">Spel</a>
  <a class="toolbar_link" href="/textboxes">Tekstbokser</a>
  <a class="toolbar_link" href="/textboxes">Tekstbokser</a>
  <a class="toolbar_link" href="/textboxes">Tekstbokser</a>
  <a class="toolbar_link" href="/textboxes">Tekstbokser</a>
</div>

<div class="content" style="margin:0;padding:0;">
  <div class="gradient_wrapper">
    <div class="star_backdrop">
      {@render children?.()}
    </div>
  </div>
</div>

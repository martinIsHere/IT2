<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import { onMount } from 'svelte';

  // standard farger
  const def_color = [0x0053FF, 0x53FF00, 0xFF0053];

  // sliderverdien
  let slider_value = $state(0);

  const max_color_value = 255;

  let reverse = (val) => {
    /*
      Når fargen overskrider 255 så går den tilbake:
          For høg verdi, vil retning skiftes mot null
          Antar at 255-(val%256) >= 0
      [INN] : 150 -> 200 -> 255 -> 311 -> 361
      [UT]  : 150 -> 200 -> 255 -> 200 -> 150
      
      Fjerner "hopp" og beholder fargevariasjon
    */
    if(val>max_color_value) {
      val = -(val%max_color_value) // reverserer toppen som ikke ligger i 255
             + Math.floor(val/max_color_value)*max_color_value; // fjerner en blokk med 255
    } 
    if (val < 0) {
      val = 0;
    }
    if (val > max_color_value) {
      val = reverse(val);
    }
    return val;
  }
  // gi korrekt farge ut ifra sliderverdi og standardfarger
  // strategi her er svært tilfeldig, men resultatet må være "smooth"
  // og fargevariasjonen passe stor. Det er også viktig at de tilgjengelege
  // valgene er "gode" og fargerike
  // her valgte jeg å oppnå så "forskjellige" farger som mulig per index.
  let get_color = (index) => {
    /*
    fargeformat:
      0x FF(rød) FF(grønn) FF(blå)
    hver FF tilsvarer 1 byte
    */
    let color_red_channel = def_color[index] & 0xFF0000; // henter relevante bytes
    color_red_channel >>= (8*2); // bitshift 2 bytes slik at den røde byten ligger lengst mot høyre
    color_red_channel += slider_value*2; // legger til slider_value
    color_red_channel = reverse(color_red_channel);
    let color_green_channel = def_color[index] & 0x00FF00;
    color_green_channel >>= (8*1);
    color_green_channel += slider_value;
    color_green_channel = reverse(color_green_channel);
    let color_blue_channel = def_color[index] & 0x0000FF;
    color_blue_channel += slider_value;
    color_blue_channel = reverse(color_blue_channel);
    const digitsPerChannel = 2;
    return "#" + color_red_channel.toString(16).padStart(digitsPerChannel, '0')
               + color_green_channel.toString(16).padStart(digitsPerChannel, '0')
               + color_blue_channel.toString(16).padStart(digitsPerChannel, '0');
  }
  let BG_color1 = $state(get_color(0));
  let BG_color2 = $state(get_color(1));
  let BG_color3 = $state(get_color(2));

  let update_BG_colors = () => {
    BG_color1 = (get_color(0));
    BG_color2 = (get_color(1));
    BG_color3 = (get_color(2));
  }

  onMount(()=>{
    slider_value=0;
  });
	let { children } = $props();
</script>

<style>
  /* font */
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
    background: linear-gradient(to bottom right, var(--bg-color1), var(--bg-color2), var(--bg-color3));
    background-repeat: no-repeat; /* prevents looping */
    margin: 0;
    padding: 0;
    z-index: -1;
  }

  .star_backdrop {
    /* Stjerner i et skalerbart format */
    background-image: url("$lib/assets/Stars.svg");
    background-repeat: repeat;
    margin: 0;
    padding: 0;
    color: #FFFFFF;
    min-height: 100vh;
    height: 100%;
    width:100%;
    z-index: 0;
    background-size: 500px;
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
    z-index: 100;
  }
  .slidercontainer {
    margin: auto auto;
  }
  .slider {
    transition: opacity .2s;
  }


  .toolbar_link {
    position: relative;
    color: #FFFFFF;
    background-color: #b54a7280;
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 10px 10px;
    padding: 15px 25px;
    border-radius: 25px;
    text-decoration: none;
    transition: background-color 0.3s;
    transition: scale 0.4s;
  }
  .toolbar_link:hover {
    background-color: #222222;
    scale: 1.1;
  }
  :global(h1){
    font-family: "Raleway", sans-serif;
    font-size: 62pt;
    font-weight: lighter;
  }
  :global(h2){
    font-family: "Raleway", sans-serif;
    font-size: 42pt;
    font-weight: lighter;
  }
  :global(h3) {
    font-family: "Raleway", sans-serif;
  }
  :global(p){
    font-size: 24pt;
    margin: 1pt 10%;
    text-align: justify;
  }
  .rainbow-text {
    font-size: 20px;
    margin: 0;
    font-weight: bold;
    background: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      blue,
      indigo,
      violet
    );
    -webkit-background-clip: text; /* Chrome/Safari */
    background-clip: text; /* Standard */
    color: transparent; /* Hide original text color */

    background-size: 800% auto;
    animation: rainbow 10s linear infinite; 
    /* Bruker "@keyframes rainbow": Backgrunnen beveger seg frem og tilbake for alltid.
       tar 10 sekunder per bevegelse(frem og tilbake) */
  }


  @keyframes rainbow {
    0% { background-position: 0% center; }
    50% { background-position: 100% center; }
    100% { background-position: 0% center; }
  }
</style>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="toolbar">
  <a class="toolbar_link" href="/">Hjem</a>
  <a class="toolbar_link" href="/textboxes">Kort gjennomgang</a>
  <a class="toolbar_link" href="/popup_and_sim">Simulering av planeter</a>
  <a class="toolbar_link" href="/quiz">Quiz</a>
  <div style="margin: auto auto;">
    <h3 class="rainbow-text">Bakgrunnsslider</h3>
    <div class="slidercontainer">
      <input 
        type="range" 
        min="0" 
        max="{max_color_value-1}"
        bind:value={slider_value}
        oninput={update_BG_colors}
        class="slider"
        id="bakgrunnsslider"> <!-- max-verdien tilsvarer Max forandring av original verdi, uten å repetere. -->
    </div>
  </div>
</div>

<div class="content" style="margin:0;padding:0;">
  <div class="gradient_wrapper" 
    style="--bg-color1: {BG_color1};--bg-color2: {BG_color2};--bg-color3: {BG_color3};">
    <div class="star_backdrop">
      {@render children?.()}
    </div>
  </div>
</div>

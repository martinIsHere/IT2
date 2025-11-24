<script>
	import src from '$lib/assets/img1.jpg';
	import src2 from '$lib/assets/img2.jpg';
	import src3 from '$lib/assets/img3.jpg';
	import src4 from '$lib/assets/img4.jpeg';
	import src5 from '$lib/assets/img5.jpg';
	import src6 from '$lib/assets/img6.jpg';
</script>

<style>
.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  box-sizing: border-box;
  overflow: hidden;  
}

.image_1 {
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color:white;
  padding: 5px;
  margin: 10px;
  width: 600px;
  border-radius: 800px; /* avrund helt uten å lage ellipse*/
  box-shadow: 2px 2px 50px 5px rgba(0,0,0,0.9);
}

.default_text_banner {
  position:relative;
  width: 100vw;
  padding: 10px;
}

.intro_banner2 {
  background: linear-gradient(to bottom, #00000000, #000000FF,#000000FF);
}

.block1{
  border: 2px solid;
  padding: 25px;
  margin: 10px;
  box-sizing: border-box;
  height: auto;
  width: 80%;
  min-width: 30ch;
  max-width: 75ch;
  background-color: #00000080;
  box-shadow: 0 10px 22px rgba(0,0,0,0.9);
}

.block2 {
  border: 2px solid;
  padding: 25px;
  box-sizing: border-box;
  height: auto;
  min-width: 30ch;
  max-width: 75ch;
  background-color: #00000080;
  box-shadow: 0 10px 22px rgba(0,0,0,0.9);
}

.heading1Div {
  content: "";
  display: flex;
  position: relative;
  justify-content: center;
}

.darken {
  background: radial-gradient(closest-side, #00000060, #00000000);
}
h1{
  position: relative;
  width:max-content;
}
/* regnbue-understreking */
h1::after{
  content: "";
  background: linear-gradient(to right, #00000000, #FF0000, #00BF00, #0000FF, #00000000);
  border-radius:100px;
  height: 4px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>

<div class="default_text_banner intro_banner2">
  <div class="heading1Div">
    <h1 class="intro darken">Opprinnelsen av internettet</h1>
  </div>
  <div class="container1">
    <p class="block1" style="font-weight:normal;">
      Internett har sine røtter tilbake til 1960-tallet, da ARPANET ble utviklet som det første nettverket som la grunnlaget for dagens internett. Senere, i 1991, introduserte Tim Berners-Lee World Wide Web, som gjorde nettet tilgjengelig for allmennheten. For kommunikasjon mellom nettlesere og servere ble protokollen HTTP (HyperText Transfer Protocol) etablert.
    </p>
    <img class="image_1" src={src} alt="A slightly creepy man against orange background"/>
  </div>

  <div class="heading1Div">
    <h1 class="intro darken">Kommunikasjon</h1>
  </div>
  <div class="container1">
    <img class="image_1" src={src} alt="A slightly creepy man against orange background"/>
    <p class="block1" style="font-weight:normal;">
    Internett har revolusjonert måten folk kommuniserer på. I dag kan vi sende meldinger, e-post og videochatter med mennesker over hele verden på sekunder. Avstanden mellom folk har minket, og mange holder kontakt med venner og familie gjennom sosiale medier.
    </p>
  </div>

  <div class="heading1Div">
    <h1 class="intro darken">Kunnskap og informasjon</h1>
  </div>
  <div class="container1">
    <p class="block1" style="font-weight:normal;">
      Tidligere måtte man til biblioteket for å finne informasjon, men nå ligger det meste bare noen tastetrykk unna. Internett gjør det mulig for alle å lære nye ting, men det har også ført til utfordringer med falske nyheter og feilinformasjon.
    </p>
    <img class="image_1" src={src2} alt="A slightly creepy man against orange background"/>
  </div>

  <div class="heading1Div">
    <h1 class="intro darken">Handel og økonomi</h1>
  </div>
  <div class="container1">
    <img class="image_1" src={src3} alt="A slightly creepy man against orange background"/>
    <p class="block1" style="font-weight:normal;">
      Netthandel har endret måten vi kjøper varer og tjenester på. Mange butikker har flyttet deler av driften sin til nettet, og nye bedrifter har oppstått som bare finnes digitalt. Samtidig har lokale butikker fått sterkere konkurranse.
    </p>
  </div>

  <div class="heading1Div">
    <h1 class="intro darken">Arbeidsliv</h1>
  </div>
  <div class="container1">
    <p class="block1" style="font-weight:normal;">
      Flere yrker krever nå digital kompetanse, og mange kan arbeide hjemmefra takket være internett. Dette har gitt større frihet for noen, men også gjort skillet mellom arbeid og fritid mindre tydelig.
    </p>
    <img class="image_1" src={src4} alt="A slightly creepy man against orange background"/>
  </div>

  <div class="heading1Div">
    <h1 class="intro darken">Utdanning</h1>
  </div>
  <div class="container1">
    <img class="image_1" src={src5} alt="A slightly creepy man against orange background"/>
    <p class="block1" style="font-weight:normal;">
      Nettkurs og digitale læringsplattformer har gjort utdanning mer tilgjengelig. Studenter kan følge forelesninger fra universiteter over hele verden, men det kan også være utfordrende å holde motivasjonen uten fysisk oppmøte.
    </p>
  </div>

  <div class="heading1Div">
    <h1 class="intro darken">Sosiale relasjoner</h1>
  </div>
  <div class="container1">
    <p class="block1" style="font-weight:normal;">
      Internett har skapt nye former for fellesskap, der folk møtes gjennom spill, forum og sosiale medier. Samtidig kan overdreven bruk føre til isolasjon og mindre ansikt-til-ansikt kontakt.
    </p>
    <img class="image_1" src={src6} alt="A slightly creepy man against orange background"/>
  </div>

  <div class="heading1Div">
    <h1 class="intro darken">Verktøy og moro</h1>
  </div>
  <div class="container1">
    <p class="block2" style="font-weight:normal;">
      Da internett ble allemannseie, åpnet det døren til en helt ny virkelighet. Plutselig hadde vi enkel tilgang til nyttige verktøy som gjorde hverdagen lettere, og samtidig uendelige muligheter for moro. Spill, simuleringer og kreative applikasjoner ble bare et klikk unna – og forvandlet nettet til et sted der læring, lek og teknologi møtes. <a href="/popup_and_sim">Videre</a>
    </p>
  </div>
  <!-- Ekstra plass under siste bit med tekst -->
  <div style="min-height:25ch;"></div>
</div>

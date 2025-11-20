<script>
	import src from '$lib/assets/smiling_man1.png';
	import src2 from '$lib/assets/smiling_man2.png';
	import src3 from '$lib/assets/smiling_man3.png';
	import src4 from '$lib/assets/smiling_man4.png';
	import src5 from '$lib/assets/smiling_man5.png';
	import src6 from '$lib/assets/smiling_man6.png';
</script>
<style>
.container1 {
  display: flex;
  justify-content: center; /* space between text & image */
  align-items: center;            /* vertically center */
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;  
}

.image_1 {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 300px;
  border-radius: 50%;
}

.default_text_banner {
  position:relative;
  width: 100vw;
  padding: 10px;
}

.intro_banner2 {
  background: linear-gradient(to bottom, #00000000, #000000FF,#000000FF);
}

.black_banner {
  position:relative;
  width: 100vw;
  padding: 10px;
  background-color: black;
}

.block1{
  border: 2px solid;
  padding: 25px;
  box-sizing: border-box;
  height: auto;
  width: 50%;
  min-width: 30ch;
  max-width: 75ch;
  background-color: #00000080;
}

.heading1Div {
  content: "";
  display: flex;
  position: relative;
  justify-content: center;
}

.darken {
  background: linear-gradient(to bottom, #00000000, #00000040, #00000000);
}
h1{
  position: relative;
  width:max-content;
}
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

<div>
  
</div>

<div class="default_text_banner intro_banner2">
  <div class="heading1Div">
    <h1 class="intro darken">Kommunikasjon</h1>
  </div>
  <div class="container1">
  <img class="image_1" src={src} alt="A slightly creepy man against orange background"/>
  <p class="block1" style="font-weight:normal;">
    Internettet har revolusjonert måten folk kommuniserer på. I dag kan vi sende meldingar, e-post og videochattar med menneske over heile verda på sekund. Avstanden mellom folk har minka, og mange held kontakt med vener og familie gjennom sosiale medium.
    </p>
  </div>
  <div class="heading1Div">
    <h1 class="intro darken">Kunnskap og informasjon</h1>
  </div>
  <div class="container1">
  <img class="image_1" src={src} alt="A slightly creepy man against orange background"/>
  <p class="block1" style="font-weight:normal;">
Tidlegare måtte ein til biblioteket for å finne informasjon, men no ligg det meste berre nokre tastetrykk unna. Internettet gjer det mogleg for alle å lære nye ting, men det har òg ført til utfordringar med falske nyheiter og feilinformasjon.
  </p>
  </div>
  <div class="heading1Div">
    <h1 class="intro darken">Handel og økonomi</h1>
  </div>
  <div class="container1">
  <img class="image_1" src={src2} alt="A slightly creepy man against orange background"/>
  <p class="block1" style="font-weight:normal;">
Netthandel har endra måten vi kjøper varer og tenester på. Mange butikkar har flytta delar av drifta si til nettet, og nye bedrifter har oppstått som berre finst digitalt. Samstundes har lokale butikkar fått sterkare konkurranse.
  </p>
  </div>
  <div class="heading1Div">
    <h1 class="intro darken">Arbeidsliv</h1>
  </div>
  <div class="container1">
  <img class="image_1" src={src4} alt="A slightly creepy man against orange background"/>
  <p class="block1" style="font-weight:normal;">
Fleire yrke krev no digital kompetanse, og mange kan arbeide heimanfrå takka vere internettet. Dette har gitt større fridom for nokre, men òg gjort skiljet mellom arbeid og fritid mindre tydeleg.
  </p>
  </div>
  <div class="heading1Div">
    <h1 class="intro darken">Utdanning</h1>
  </div>
  <div class="container1">
  <img class="image_1" src={src5} alt="A slightly creepy man against orange background"/>
  <p class="block1" style="font-weight:normal;">
Nettkurs og digitale læringsplattformar har gjort utdanning meir tilgjengeleg. Studentar kan følgje førelesingar frå universitet over heile verda, men det kan òg vere utfordrande å halde motivasjonen utan fysisk oppmøte.
  </p>
  </div>
  <div class="heading1Div">
    <h1 class="intro darken">Sosiale relasjonar</h1>
  </div>
  <div class="container1">
  <img class="image_1" src={src6} alt="A slightly creepy man against orange background"/>
  <p class="block1" style="font-weight:normal;">
      Internettet har skapt nye former for fellesskap, der folk møtast gjennom spel, forum og sosiale medium. Samstundes kan overdriven bruk føre til isolasjon og mindre ansikt-til-ansikt kontakt.
  </p>
  </div>
</div>

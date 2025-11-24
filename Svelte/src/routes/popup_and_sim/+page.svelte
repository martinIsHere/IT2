<script>
  import { onMount } from 'svelte';

  //--popup------------------------
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  // import { flip } from 'svelte/animate';

  let popup_is_hidden = true;
  let show_tooltip = true;
  let show_quiz_recommendation = false;

  let toggle_popup = () => { popup_is_hidden=!popup_is_hidden; }
  let toggle_tooltip = () => { show_tooltip=!show_tooltip; }
  let toggle_quiz_recommendation = () => { show_quiz_recommendation=!show_quiz_recommendation; }

  const popup_ventetid_sekund = 4;
  const quiz_rec_ventetid_sekund = 10;

  setTimeout(toggle_popup, popup_ventetid_sekund*1000);
  setTimeout(toggle_quiz_recommendation, quiz_rec_ventetid_sekund*1000);

  //--popup-----------------------

  //--simulering------------------
  const canvas_width=1600;
  const canvas_height=800;

  class Vector2 {
    constructor(_in_x=0.0,_in_y=0.0){
      this.x = _in_x;
      this.y = _in_y;
    }
    mult(a=1.0){
      let temp = new Vector2();
      temp.x = this.x*a;
      temp.y = this.y*a;
      return temp;
    }
    div(a=1.0){
      let temp = new Vector2();
      temp.x = this.x/a;
      temp.y = this.y/a;
      return temp;
    }
    add(v){
      let temp = new Vector2();
      temp.x = this.x+v.x;
      temp.y = this.y+v.y;
      return temp;
    }
    subt(v){
      let temp = new Vector2();
      temp.x = this.x-v.x;
      temp.y = this.y-v.y;
      return temp;
    }
    length(){
      return Math.sqrt(this.x**2+this.y**2);
    }
  };

  const scaling_factor = 150E9;
  const default_zoom_value = 6;
  let meters_per_screenwidth = scaling_factor*default_zoom_value;
  let k_meters_per_pixel = meters_per_screenwidth/canvas_width; // Fra 3.2, k i (3.1), zoom-faktoren
  let c_coordinate_at_origin = new Vector2(0.0,0.0); 
  function generate_scaled_c(){
    c_coordinate_at_origin.x = k_meters_per_pixel*canvas_width*0.5;
    c_coordinate_at_origin.y = k_meters_per_pixel*canvas_height*0.5;
  }
  generate_scaled_c();
  const GAMMA = 7E-11;
  const planet_radius_px = 20;

  class PhysObj {
    /*
    Et fysisk objekt som påfører og påføres gravitasjonskraft
    */
    gm = new Vector2(0.0,0.0);
    m = 10000;
    s = new Vector2(0.0,0.0);
    v = new Vector2(0.0,0.0);
    a = new Vector2(0.0,0.0);
    color = "red";
    constructor(m, s, v, a, c="red"){
      this.m=m;
      this.s=s;
      this.v=v;
      this.a=a;
      this.color=c;
    }

    func1 = (obj, index, array) => { // fysikk-stuff
      let vec=obj.s.subt(this.s);
      let length=vec.length();
      if (length!=0.0){
        let g_hat = vec.div(length);
        this.gm = this.gm.add(g_hat.mult(obj.m).div(length).div(length));
      }
    }

    update_acceleration(all_objects){
      /*
      Utfører metode for å kalkulere
      akselerasjon
      */
      this.gm.x=0.0;
      this.gm.y=0.0;
      all_objects.forEach(this.func1);
      this.a = this.gm.mult(GAMMA);
      return this;
    }

    update_velocity(time_passed=1.0){
      this.v=this.v.add(this.a.mult(time_passed));
      return this;
    }

    update_position(time_passed=1.0){
      this.s=this.s.add(this.v.mult(time_passed));
      return this;
    }
  }
  let objA = new PhysObj(1,
    new Vector2(50,50),
    new Vector2(0.0,0.0),
    new Vector2(0.0,0.0));
  let objB = new PhysObj(1000,
    new Vector2(100,50),
    new Vector2(0.0,0.0),
    new Vector2(0.0,0.0));
  let all_objects = [
    objA,
    objB
  ];


  // Terra
  let TerraObj = new PhysObj(5972E21, // mass
                 new Vector2(147E9,0), // s
                 new Vector2(0,30E3), // v
                 new Vector2(0,0), // a
                 "blue"
                 );
  // Sol
  let SolObj = new PhysObj(199E28, // m
                 new Vector2(0,0), // s
                 new Vector2(0,0), // v
                 new Vector2(0,0), // a
                 "yellow"
                 );
  // Mars
  let MarsObj = new PhysObj(64E22, // m
                 new Vector2(-228E9,0), // s
                 new Vector2(0,-24E3), // v
                 new Vector2(0,0), // a
                 "orange"
                 );
  // Mercury
  let MercuryObj = new PhysObj(33E22, // m
                 new Vector2(-60E9,0), // s
                 new Vector2(0,-47E3), // v
                 new Vector2(0,0), // a
                 "gray"
                  );

  let ALL_OBJECTS = [TerraObj, SolObj, MarsObj, MercuryObj];
  let dt=1/60;
  dt*=1E6;

  function add_physObj(obj){
    ALL_OBJECTS.push(obj);
  }

  function transform_window_to_plane(v){
    /*
    """
    finner koordinaten på planet ut i fra vinduskoordinat.
    """
    */
    return v.mult(k_meters_per_pixel).subt(c_coordinate_at_origin);
  }
  function transform_plane_to_window(v){
    /*
    """
    finner koordinaten i vinduet ut i fra koordinaten på planet.
    """
    */
    return v.add(c_coordinate_at_origin).div(k_meters_per_pixel);
  }

  let set_new_view_width = () => {}
  let meters_per_screenwidth_range = 6;

  onMount(()=>{
    // --- setup

    // Get the canvas element
    const canvas = document.getElementById("myCanvas");
    if (canvas == null) return;
    canvas.addEventListener("click", mouse_event_handler);
    const vektInput = document.getElementById("vekt");
    const fargeInput = document.getElementById("farge");

    // Get the 2D rendering context
    const canvas_context = canvas.getContext("2d");

    set_new_view_width = () => {
      k_meters_per_pixel = meters_per_screenwidth_range*scaling_factor/canvas_width;
      generate_scaled_c();
      console.log(k_meters_per_pixel);
    };

    function mouse_event_handler(event){
      if (vektInput == null) return;
      if (fargeInput == null) return;
      let mengdeSolmasser = vektInput.value;
      let farge = fargeInput.value;
      if(mengdeSolmasser > 0) {
        let temp_obj = new PhysObj(mengdeSolmasser*199E28,  // auto-håndterer feil inn-verdier
          transform_window_to_plane(new Vector2(event.offsetX, event.offsetY)),
          new Vector2(0,0),
          new Vector2(0,0),
          farge // auto-håndterer feil inn-verdier
          );
        add_physObj(temp_obj);
      }
    }

    function update_all_objects_attributes(){
      let updateAccelerationFunc = (_in_obj, index, array) => {
          _in_obj.update_acceleration(array);
      }
      ALL_OBJECTS.forEach(updateAccelerationFunc);

      let updateVelAndPosFunc = (_in_obj, index, array) => {
          _in_obj.update_velocity(dt);
          _in_obj.update_position(dt);
      }
      ALL_OBJECTS.forEach(updateVelAndPosFunc);
    }

    function update(){
      //move_blue_rect();
      update_all_objects_attributes();
    }

    function fillCircle(x, y, r, color){
      canvas_context.beginPath();
      canvas_context.arc(x, y, r, 0, 2 * Math.PI);
      canvas_context.fillStyle = color;
      canvas_context.fill();
    }

    function draw_circle_in_plane(
                           positionVec,
                           radius,
                           color,
                           ){
      /*
      Tegn en korrekt skalert sirkel.
      plane koordinater til vindu koordinater.
      */
      if (k_meters_per_pixel==0){
        k_meters_per_pixel = 0.01;
      }

      let posVec = transform_plane_to_window(positionVec);
      fillCircle(
        posVec.x, posVec.y,
        Math.floor(radius/k_meters_per_pixel),
        color
      );
    }
    function draw_obj_in_plane(obj){
      draw_circle_in_plane(obj.s, k_meters_per_pixel*planet_radius_px, obj.color);
    }

    function draw_all_objects(){
      function temp_func(obj){
        draw_obj_in_plane(obj);
      }
      ALL_OBJECTS.forEach(temp_func);
    }

    function draw(){
      // clears by setting whole vieable area to rgba(0,0,0,0)
      canvas_context.clearRect(0, 0, canvas_width, canvas_height);

      draw_all_objects();
    }

    function main_loop(){
      // debug

      update();
      draw();

      // next call
      requestAnimationFrame(main_loop);
    }
    requestAnimationFrame(main_loop);
  })
  //--simulering------------------
</script>

<style>

  .centering_container {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .radialGradientBG {
    background: radial-gradient(closest-side, #000000FF, #00000000);
  }
  .centering_element {
    text-align: center;
    display: inline;
    padding: 10ch;
  }

  .no_top_padding {
    padding-top:0;
  }

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

  .enlarge_anim {
    transition: scale 0.4s;
  }

  .enlarge_anim:hover {
    scale:1.1;
  }
  .noOverflow {
    overflow: hidden;
  }

  .button_confirm1 {
    padding: 8px 25px;
    margin: 8ch 0ch;
    text-align: center;
    background-color: #00000060;
    border: 1px solid #00000080;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    scale: 2;
    transition: background-color 0.3s;
  }
  .button_confirm1:hover {
    background-color: #FF000040;
  }

  .noInherit {
    all: initial;
  }

  .center_static {
    padding: auto 0;
    text-align: center;
  }

  .align_left_2padding {
    padding: 2ch;
    text-align: left;
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

  .flex_container {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>

<div class="flex_container">
  {#if show_tooltip}
  <div>
    <button 
        style="visibility: hidden;"
        on:click={toggle_tooltip}>
      <h3 
          transition:fly={{x: -10, y:10, duration:1000}} 
          class="whiteBG float enlarge_anim" 
          style="visibility: visible; black; padding: 2ch; cursor: pointer;">
          Fyll ut attributt-feltene, og venstreklikk for å legge til ny planet!
      </h3>
    </button>
  </div>
  {/if}
  {#if show_quiz_recommendation}
  <div>
    <button 
        style="visibility: hidden;"
        on:click={toggle_quiz_recommendation}>
      <h3 
          transition:fly={{x: -10, y:10, duration:1000}}
          class="whiteBG float enlarge_anim" 
          style="visibility: visible; black;padding: 2ch; cursor: pointer;">
          Prøv gjerne Quiz-en og finn ut hvor mye du har lært!
      </h3>
    </button>
  </div>
  {/if}
</div>

<h1
    style="
  display: block;
  text-align: center;
  color: #ffffff;
  background-color: #2c3e50;
  padding: 20px;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  border-top: white 2px solid;
  border-bottom: white 2px solid;
  "
  >En simulering av en liten del av solsystemet</h1>
<canvas id="myCanvas" width="{canvas_width}" height="{canvas_height}" style="margin-right: auto;
    margin-left: auto;
display: block; background: radial-gradient(circle closest-side, black, #00000000)"></canvas>
<div class="centering_container radialGradientBG">
  <div class="centering_element no_top_padding">
    <h3>Attributter til ny planet</h3>
    <label for="vekt" style="font-weight:normal;">Vekt (mengde solmasser):</label>
    <input type="text" value=0.01 class="float enlarge_anim" id="vekt" name="vekt"><br><br>
    <label for="farge" style="font-weight:normal;">Farge (F.eks. "purple" / "#FF00FF"):</label>
    <input type="text" value="red" class="float enlarge_anim" id="farge" name="farge"><br><br>
  </div>
  <div class="centering_element no_top_padding">
    <h3>Zoom</h3>
    <label for="meters_per_screenwidth" style="font-weight:normal;">Meter per bredde<br> (multiplisert med 150E9):<span style="color:red; font-weight: bold; background-color: #000000bd; padding: 2px;">{meters_per_screenwidth_range.toString().padStart(3, "0")}</span>&nbsp;</label> <br>
    <input type="range" min="1" max="100" class="float enlarge_anim" bind:value={meters_per_screenwidth_range} on:input={set_new_view_width}  id="meters_per_screenwidth_button" name="meters_per_screenwidth"><br><br>
  </div>
</div>

{#if !popup_is_hidden}
<div transition:fade={{duration:1000}} style="position: fixed; inset: 0; left: 0; top: 0; width: 100vw; height: 100dvh; background: radial-gradient(#000000FF, #00000080); z-index: 9000"></div>
<div class="absCenter" style="z-index: 9001">
  <div transition:fly={{x: -10, y:10, duration:1000}} class="popup_size whiteBG bare float noOverflow scroll_box wavyBG" style="z-index: 9002; border-radius: 1%;">
    <div class="noInherit" style="z-index:9003;">
      <div class="noOverflow" style="margin-bottom:8ch;">
        <h2 class="center_static" style="color: #AAFFAA; font-weight:normal;">
          <u>Pop-up vinduer</u>
        </h2>
        <p class="align_left_2padding clean_border whiteBG">
          Pop-up-vinduer dukket opp på slutten av 1990-tallet som en metode for annonsering på nettet. De ble populære fordi de kunne vises utenfor selve nettsiden og dermed fange brukerens oppmerksomhet, men ble raskt upopulære på grunn av hvor forstyrrende de var. Dette førte til utviklingen av pop-up-blokkere og strengere nettleserregler.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;Cookies, derimot, ble introdusert av Netscape i 1994 som en løsning for å lagre små informasjonsbiter på brukerens maskin, slik at nettsteder kunne huske innstillinger, handlekurver og innloggingsstatus. Over tid ble cookies også brukt til sporing og målrettet reklame, noe som utløste debatter om personvern og førte til reguleringer som GDPR og strengere kontroll over tredjeparts-cookies.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;I dag har popups fått en ny rolle: de brukes ofte til å be brukere om å akseptere cookies. Dette har blitt en normalisert del av nettopplevelsen, der de fleste forventer å møte et samtykkebanner når de besøker en ny side. Selv om formålet er å oppfylle lovkrav om informert samtykke, oppleves disse popupene ofte som en rutinehandling der brukeren klikker «Godta» uten å lese detaljene.
        </p>
      </div>
      <div class="center_static" >
        <button on:click={toggle_popup} class="button_confirm1"> OK </button>
      </div>
    </div>
  </div>
</div>
{/if}

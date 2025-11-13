
<script>
  import { onMount } from 'svelte';
  const canvas_width=800;
  const canvas_height=600;

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

  let meters_per_screenwidth = 150E9*2;
  let k_meters_per_pixel = meters_per_screenwidth/canvas_width; // Fra 3.2, k i (3.1), zoom-faktoren
  let k_increment = k_meters_per_pixel*0.05;
  let c_coordinate_at_origin = new Vector2(0,0); // Fra 3.2, c i (3.1), koordinaten på planet vist på pixel (0,0)
  let mouse_drag_start = new Vector2(-1,-1);
  let user_is_dragging = false;
  let object_size_pixels = 100;
  let mb1 = 0;
  let mb2 = 0;
  let mb3 = 0;
  let RUNNING = true;
  // const GAMMA = 7E-11;
  const GAMMA = 1.0;

  class PhysObj {
    /*
    Et fysisk objekt som påfører og påføres gravitasjonskraft
    */
    gm = new Vector2(0.0,0.0);
    m = 10000;
    s = new Vector2(0.0,0.0);
    v = new Vector2(0.0,0.0);
    a = new Vector2(0.0,0.0);
    c = "black";
    constructor(m, s, v, a, c="red"){
      this.m=m;
      this.s=s;
      this.v=v;
      this.a=a;
      this.color=c;
    }

    func1 = (obj, index, array) => {
      /*
      function used in "update_acceleration"
      affects this.gm
      */
      let vec=obj.s.subt(this.s);
      let length=vec.length();
      if (length!=0.0){
        let g_hat = vec.div(length);
        this.gm = this.gm.add(g_hat.mult(obj.m).div(length).div(length));
        console.log(vec.length());
      }
    }

    update_acceleration(all_objects){
      /*
      Utfører metode for å kalkulere
      akselerasjon fra seksjon 2.3
      */
      this.gm.x=0.0;
      this.gm.y=0.0;
      all_objects.forEach(this.func1);
      this.a = this.gm.mult(GAMMA);
      return this;
    }

    update_velocity(time_passed=1.0){
      this.v=this.v.add(this.a.mult(time_passed));
    }

    update_position(time_passed=1.0){
      this.s=this.s.add(this.v.mult(time_passed));
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
                 "rgb(0,0,255)"
                 );
  // Sol
  let SolObj = new PhysObj(199E28, // m
                 new Vector2(0,0), // s
                 new Vector2(0,0), // v
                 new Vector2(0,0), // a
                 "rgb(255,255,0)"
                 );
  // Mars
  let MarsObj = new PhysObj(64E22, // m
                 new Vector2(-228E9,0), // s
                 new Vector2(0,-24E3), // v
                 new Vector2(0,0), // a
                 "rgb(200,100,0)"
                 );
  // Mercury
  let MercuryObj = new PhysObj(33E22, // m
                 new Vector2(-60E9,0), // s
                 new Vector2(0,-47E3), // v
                 new Vector2(0,0), // a
                 "rgb(200,200,200)"
                  );

  let ALL_OBJECTS = [TerraObj, SolObj, MarsObj, MercuryObj];
  let dt=1/60;
  dt*=1E6;
  onMount(()=>{
    // --- setup

    // Get the canvas element
    const canvas = document.getElementById("myCanvas");
    const loggerHeading = document.getElementById("loggerHeading");
    loggerHeading.innerText=
      objA.update_acceleration(all_objects).a.length().toString();

    // Get the 2D rendering context
    const canvas_context = canvas.getContext("2d");

    let x = 0.0;

    // --- main-loop
    function move_blue_rect(){
      x+=1;
      if(x>canvas_width){
        x=-150;
      }
    }

    function update(){
      move_blue_rect();
    }

    function fillCircle(x, y, r, color){
      canvas_context.beginPath();
      canvas_context.arc(x, y, r, 0, 2 * Math.PI);
      canvas_context.fillStyle = color;
      canvas_context.fill();
    }

    function draw(){
      canvas_context.fillStyle = "black";
      canvas_context.fillRect(0, 0, 800, 600);
      canvas_context.fillStyle = "blue";
      canvas_context.fillRect(x, 100, 150, 150);
      canvas_context.fillStyle = "red";
      canvas_context.fillRect(x, 10, 150, 50);
      fillCircle(x+150*0.5, 400, 150*0.5, "#FFFF00");
    }

    function main_loop(
      timestamp // int
    ){
      // debug
      // loggerHeading.innerText=timestamp;

      update();
      draw();

      // next call
      requestAnimationFrame(main_loop);
    }
    requestAnimationFrame(main_loop);
  })
</script>
<canvas id="myCanvas" width="{canvas_width}" height="{canvas_height}" style="margin-right: auto;
    margin-left: auto;
    display: block;"></canvas>
<h1 id="loggerHeading" style="font-family: Arial, Helvetica, sans-serif;">&ltNAN&gt</h1>

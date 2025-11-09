
<script>
  import { onMount } from 'svelte';

  onMount(()=>{
    // Get the canvas element
    const canvas = document.getElementById("myCanvas");

    // Get the 2D rendering context
    const ctx = canvas.getContext("2d");

    // Draw a red rectangle
    ctx.fillStyle = "black"; // Set the fill color to red
    ctx.fillRect(0, 0, 800, 600); // Draw a filled rectangle at (10,10) with width 100 and height 50
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 100, 50);
  })
</script>
<canvas id="myCanvas" width="800" height="600" style="margin-right: auto;
    margin-left: auto;
    display: block;"></canvas>

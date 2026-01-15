<script>
  import {addNums as importedFuncAddNums} from "./gjenbruk/script.js";
  import {Pi as extPI, LysfartenVakum as extLysfart} from "./gjenbruk/konstanter.js";
  const radius = 1;
  const areal = extPI * radius ** 2;
  const lysfart2 = extLysfart / 1000;
  console.log(importedFuncAddNums(1, 1));

  const img1 = "https://next-media.elkjop.com/image/dv_web_D18000134018124/982641/apple-airpods-pro-gen-3-2025-helt-tradlose-hodetelefoner.jpg?w=256&q=75";
  const img2 = "https://next-media.elkjop.com/image/dv_web_D1800013464809/987719/garmin-venu-4-41mm-smartklokke-lunar-goldbone.jpg?w=256&q=75";
  const img3 = "https://next-media.elkjop.com/image/dv_web_D18000127412527/821529/meta-quest-3s-vr-briller-128-gb.jpg?w=256&q=75";
</script>

<h1>Oppgaver</h1>
<p>Radius er lik {radius}. Arealet er derfor lik {areal}.</p>
<p>Den importerte verdien for lysfarten: {extLysfart} m/s = {lysfart2} km/s</p>

<h1>2.04</h1>

<table class="styled-table">
  <tbody>
    <tr>
      <td><img src={img1} alt="buds"></td>
      <td><img src={img2} alt="klokke"></td>
      <td><img src={img3} alt="quest"></td>
    </tr>
    <tr>
      <td>Lydutstyr</td>
      <td>Håndjern</td>
      <td>Hjelm</td>
    </tr>
  </tbody>
</table>

<style>
  .styled-table {
    border-collapse: collapse;
    width: 100%;
    max-width: 500px;
    font-family: system-ui, sans-serif;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    outline-color: solid black;
  }

  td {
    padding: 0.75rem;
    text-align: left;
    background-color: white;
    outline-color: solid black;
  }

  tbody tr {
    border-top: 1px solid #e5e7eb;
    outline-color: solid black;
  }

  tbody tr:hover {
    background-color: #f3f4f6;
  }
</style>

<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

  let BG_color = "#222222"
  let TXT_color = "#FFFFFF"
	let { children } = $props();
</script>
<style>
.toolbar {
  background-color:#FF0000; 
  color: #FF0000;
  position:relative;
  top:0%;
  left:0%;
  font-size: 18pt;
}
</style>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="toolbar">
<a href="/">home</a>
<a href="/textboxes">textboxes</a>
</div>

<div style="background-color:{BG_color}; color:{TXT_color}">
{@render children?.()}
</div>

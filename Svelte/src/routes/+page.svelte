<script>
  let fornavn=""
  let etternavn=""
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<code>&lt;script&gt;</code><br/>
<label>Fornavn: <input bind:value={fornavn} /></label><br/>
<label>Etternavn: <input bind:value={etternavn} /></label><br/>
{#if fornavn!=""&&etternavn!=""}
<p>Ditt navn er {fornavn} {etternavn}.</p>
{/if}

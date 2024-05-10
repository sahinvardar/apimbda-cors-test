<script lang="ts">
  import { api, apiUrl } from "$lib/api.js";
  import { env } from "$env/dynamic/public";

  let getPromise = Promise.resolve("");
  let postPromise = Promise.resolve("");
  let putPromise = Promise.resolve("");
  let patchPromise = Promise.resolve("");
  let awsLambdaPatchPromise = Promise.resolve("");
  let fixedPatchPromise = Promise.resolve("");

  function get() {
    getPromise = api.testService.get({});
  }

  function post() {
    postPromise = api.testService.post({});
  }

  function put() {
    putPromise = api.testService.put({});
  }

  function patch() {
    patchPromise = api.testService.patch({});
  }

  async function awsLambdaPatch() {
    const response = await fetch(apiUrl, { method: "PATCH" });
    if (response.status !== 200) {
      throw new Error("Failed to fetch");
    }
    awsLambdaPatchPromise = response.text();
  }

  async function fixedPatch() {
    const response = await fetch(`${apiUrl}/test`, { method: "PATCH" });
    if (response.status !== 200) {
      throw new Error("Failed to fetch");
    }
    fixedPatchPromise = response.text();
  }
</script>

<h1>Apimda2 CORS Test</h1>

<div>
  <button on:click={get}> Get </button>
  {#await getPromise}
    <p>Loading...</p>
  {:then data}
    <p>{data}</p>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<div>
  <button on:click={post}> Post </button>
  {#await postPromise}
    <p>Loading...</p>
  {:then data}
    <p>{data}</p>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<div>
  <button on:click={put}> Put </button>
  {#await putPromise}
    <p>Loading...</p>
  {:then data}
    <p>{data}</p>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<div>
  <button on:click={patch}> Patch </button>
  {#await patchPromise}
    <p>Loading...</p>
  {:then data}
    <p>{data}</p>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<div>
  <button on:click={fixedPatch}> Fixed Patch </button>
  {#await fixedPatchPromise}
    <p>Loading...</p>
  {:then data}
    <p>{data}</p>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<div>
  <button on:click={awsLambdaPatch}> Lambda Patch </button>
  {#await awsLambdaPatchPromise}
    <p>Loading...</p>
  {:then data}
    <p>{data}</p>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getMatchingProducts, type Product } from "../backend";
  import ProductListItem from "./ProductListItem.svelte";

  let searchText: string;

  let searchPromise = getMatchingProducts("");

  function search() {
    searchPromise = getMatchingProducts(searchText);
  }

  const dispatch = createEventDispatcher();
  function addProduct(p: Product) {
    console.log("Dispatching", p);
    dispatch("addproduct", {
      value: p,
    });
  }
</script>

<h3>Wyszukaj produkty</h3>
<div class="container">
  <input
    type="text"
    bind:value={searchText}
    on:input={search}
    placeholder="Nazwa produktu"
  />
  {#await searchPromise}
    <p>...wyszukiwanie</p>
  {:then products}
    <ul class="list_with_buttons">
      {#each products as item}
        <li class="list_element_with_button">
          <ProductListItem value={item} />
          <button on:click={() => addProduct(item)}>Dodaj do listy</button>
        </li>
      {:else}
        <li>Brak wyników</li>
      {/each}
    </ul>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>

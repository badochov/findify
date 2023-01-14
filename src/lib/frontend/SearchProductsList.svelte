<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getMatchingProducts, type Product } from "../backend";
  import ProductListItem from "./ProductListItem.svelte";

  let products: Product[] = [];
  let searchText: string;

  let display = false;
  async function fetchData() {
    products = getMatchingProducts(searchText);
    // const response = await fetch(`https://api.example.com?q=${searchText}`);
    // const data = await response.json();
    // products = data.items;
  }

  function toggleDisplay() {
    fetchData();
    display = true;
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
  <input type="text" bind:value={searchText} placeholder="Nazwa produktu" />
  <button on:click={toggleDisplay}>Szukaj</button>
  {#if display}
    {#if products.length}
      <ul class="list_with_buttons" >
        {#each products as item}
          <li class="list_element_with_button">
            <ProductListItem value={item} />
            <button on:click={() => addProduct(item)}>Dodaj do listy</button>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No results</p>
    {/if}
  {:else}
    <p>-</p>
  {/if}
</div>

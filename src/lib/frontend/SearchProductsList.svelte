<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getMatchingProducts, type Product } from "../backend";
  import ProductListItem from "./ProductListItem.svelte";
  import VirtualList from "@sveltejs/svelte-virtual-list";

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
  <div style="height:50px; padding:5px;">
    <input
      type="text"
      bind:value={searchText}
      on:input={search}
      placeholder="Nazwa produktu"
      style="padding: 5px 0"
    />
  </div>
  {#await searchPromise}
    <p>...wyszukiwanie</p>
  {:then products}
    {#if products.length > 0}
      <div style="height:600px;">
        <VirtualList items={products} let:item>
          <p class="list_element_with_button">
            <ProductListItem value={item} />
            <button on:click={() => addProduct(item)}>Dodaj do listy</button>
          </p>
        </VirtualList>
      </div>
    {:else}
      <p>Brak wyników</p>
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>

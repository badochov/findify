<script lang="ts">
  import type { Product } from "../backend";
  import ProductListItem from "./ProductListItem.svelte";
  import SearchProductsList from "./SearchProductsList.svelte";
  import SearchStoresList from "./SearchStoresList.svelte";

  let shoppingList: Product[] = [];

  function addToMainList(event) {
    console.log("Received", event)
    shoppingList.push(event.detail.value);
    shoppingList = shoppingList
  }
  function removeFromShoppingList(i: number) {
    shoppingList.splice(i, 1);
    shoppingList = shoppingList
  }
</script>

<h3>Twoja lista zakupów</h3>
{#if shoppingList.length}
  <p>Obecne produkty na liście zakupów:</p>
  <ul>
    {#each shoppingList as item, i}
      <li>
        <ProductListItem value={item} />
        <button on:click={() => removeFromShoppingList(i)} >Usuń</button>
      </li>
    {/each}
  </ul>
{:else}
<p>Nie masz żadnych produktów na Twojej liście zakupów</p>
{/if}
<SearchStoresList products={shoppingList} />
<SearchProductsList on:addproduct={addToMainList} />
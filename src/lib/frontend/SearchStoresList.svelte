<script lang="ts">
  import {
    type Product,
    type Shop,
    type Location,
    search as backendSearch,
  } from "../backend";
  import StoreListItem from "./StoreListItem.svelte";

  // The list will be updated when parent component updates
  export let products: Product[];
  let distance: number;
  let location: Location = {
    latitude: 0,
    longitude: 0,
  };
  let locationError: string;

  let shopsPromise: Promise<Shop[]>;

  function searchStores() {
    shopsPromise = backendSearch(
      location,
      distance * 1000,
      products.map((p) => p.id)
    );
  }

  function get_location() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          location.latitude = position.coords.latitude;
          location.longitude = position.coords.longitude;
        },
        (error) => {
          locationError = "Błąd uzyskiwania lokalizacji";
        }
      );
    } else {
      alert("Geolocation not available");
      locationError = "Brak dostępnej lokalizacji";
    }
  }

  get_location();
</script>

<h3>Wyszukaj sklepów z Twoją listą zakupów w danej odległości</h3>
<div>
  {#if locationError}
    <p style="color: red">{locationError}</p>
  {:else}
    <input
      type="number"
      bind:value={distance}
      step="0.01"
      min="0"
      placeholder="Wprowadź odległość [km]"
    />
    <button on:click={searchStores}>Szukaj</button>
    {#if shopsPromise}
      {#await shopsPromise}
        <p>...wyszukiwanie</p>
      {:then shops}
        {#each shops as item}
          <StoreListItem value={item} />
        {:else}
          <p>Nie znaleziono sklepów</p>
        {/each}
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    {/if}
  {/if}
</div>

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
  let shops: Shop[];
  let distance: number;
  let location: Location = {
    latitude: 0,
    longitude: 0,
  };
  let locationError: string;

  let display = false;

  async function fetchStores() {
    shops = backendSearch(
      location,
      distance * 1000,
      products.map((p) => p.id)
    );
    console.log("Got shops from backend ", shops)
    // const response = await fetch(
    //   // backend api call
    // );
    // const data = await response.json();
    // shops = data.items;
  }

  function toggleDisplay() {
    display = true;
    fetchStores();
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
  <input
    type="number"
    bind:value={distance}
    step="0.01"
    min="0"
    placeholder="Wprowadź odległość [km]"
  />
  <button on:click={toggleDisplay}>Szukaj</button>
  {#if locationError}
    <p>{locationError}</p>
  {:else if display}
    {#if shops.length}
      {#each shops as item}
        <StoreListItem value={item} />
      {/each}
    {:else}
      <p>Nie znaleziono sklepów</p>
    {/if}
  {/if}
</div>

<script lang="ts">
  import type { Product } from "../backend/index";
  import defaultImg from "../../assets/products.png";
  export let value: Product;
</script>

<div style="display: flex;" class="container">
  {#if value.photoUrl && value.photoUrl.length > 0}
    <div
      style="height: 50px; width: 50px; display: flex; align-items: center; justify-content: center;"
    >
      <img src={value.photoUrl} height="50p" alt="Picture of {value.name}" />
    </div>
  {:else}
    <img src={defaultImg} height="50p" alt="Picture of {value.name}" />
  {/if}
  <div style="align-items: stretch; flex-grow: 1">
    <p style="text-align: center;">{value.name}</p>
  </div>
</div>

<style>
</style>

<script lang="ts">
  import type { Product } from "../backend/index";
  export let value: Product;
</script>

<div>
  <!-- <img src={value.photoUrl} /> -->
  <h5>{value.name}</h5>
</div>

<style>
</style>

<script lang="ts">
  import type { Shop } from "../backend/index";
  export let value: Shop;
</script>

<div style="display: flex;" class="container">
  <img src={value.photoUrl} height="50p" alt="Picture of {value.name}" />
  <script
    src="https://kit.fontawesome.com/a076d05399.js"
    crossorigin="anonymous"
  ></script>
  <div style="align-items: stretch; justify-content: center; height: 50px">
    <a href={value.googleMapsLink}>
      <i
        style="font-size:24px; text-align: center;"
        class="fas fa-location-arrow"
      />
    </a>
  </div>
  <div style="align-items: stretch; flex-grow: 1">
    <p style="text-align: center;">{value.name}</p>
  </div>
</div>

<style>
</style>

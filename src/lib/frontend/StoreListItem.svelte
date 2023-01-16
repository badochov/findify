<script lang="ts">
  import type { Shop } from "../backend/index";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
  export let value: Shop;
</script>

<div style="display: flex;" class="container">
  <div style="height: 50px; display: flex; align-items: center;">
    <img
      src={value.photoUrl}
      height="50p"
      width="50p"
      alt="Picture of {value.name}"
    />
  </div>
  <div style="align-items: stretch; flex-grow: 1">
    <p style="text-align: center;">{value.name}</p>
  </div>
  <div style="height: 50px; display: flex; align-items: center;">
    <a href={value.googleMapsLink} style="display:block">
      <Fa icon={faLocationArrow} size="lg" />
    </a>
  </div>
</div>

<style>
</style>

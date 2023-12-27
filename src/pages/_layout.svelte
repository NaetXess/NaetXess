<script>
  import { _ } from "svelte-i18n";

  export async function preload() {
    return waitLocale();
  }
</script>

<slot />

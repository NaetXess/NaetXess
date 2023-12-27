<script>
  import { onMount } from "svelte";
  import ThemeSwitcher from "../components/ThemeSwitcher.svelte";
  import Page from "../components/Page.svelte";
  import Row from "../components/Row.svelte";
  import Col from "../components/Col.svelte";
  import Logo from "../components/mainPage/Logo.svelte";
  import Snow from "../components/mainPage/Snow.svelte";

  let theme;
  onMount(() => {
    let myTheme = localStorage.getItem("theme");
    if (myTheme) {
      theme = myTheme;
    } else {
      theme = "light";
    }
  });
</script>

<Page>
  <div>
    <Row>
      <Col id="my-col" md="6" classes="position-relative overflow-hidden">
        <div
          class="d-flex justify-content-center align-items-center h-100 credentials"
        >
          <div class="text-center">
            <h1>NaetXess</h1>
            <h4>Mustafa Erdem ARSLAN</h4>

            <h6>Web Developer at Arniva Inc.</h6>
            <small>This site will be completed soon..</small>
          </div>
        </div>
        <Snow parent="my-col" />
      </Col>
      <Col classes="d-none d-md-block p-0" md="6">
        {#if theme}
          <Logo {theme} />
        {/if}
      </Col>
    </Row>
  </div>
  <div class="theme-switcher">
    <ThemeSwitcher
      on:themeChange={(e) => {
        theme = e.detail.value;
      }}
    />
  </div>
</Page>

<style>
  ::selection {
    background-color: red;
    color: white;
  }

  h1 {
    font-size: 70px;
    color: black;
    letter-spacing: -1px;
  }

  h4 {
    font-size: 25px;
    letter-spacing: -1px;
    color: black;
  }
  h6 {
    letter-spacing: -1px;
    color: black;
  }
  small {
    color: rgba(255, 0, 0, 0.404);
  }
  .credentials {
    z-index: 20 !important;
  }

  .theme-switcher {
    position: absolute;
    left: 50%;
    bottom: 1%;
    transform: translate(-50%, 0%);
  }
  :global(#my-col) {
    height: 100vh;
  }
</style>

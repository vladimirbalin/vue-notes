<template>
  <div class="wrapper">
    <h2>Greetings.</h2>
    <p>
      Please go to <a href="/login">login</a> page and use test credentials,
      or <a href="/register">register</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Greetings.vue"
}
</script>

<style scoped>
  .wrapper{
    font-family: Roboto, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }
  p{
    font-weight: 300;
  }
</style>
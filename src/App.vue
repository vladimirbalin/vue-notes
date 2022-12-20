<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html, body,
#app {
    min-height: 100vh;
    width: 100%;
}

@import url(https://fonts.bunny.net/css?family=abel:400|roboto:300,400);
#app {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    background-color: #ececec;
}

</style>

<script>
</script>

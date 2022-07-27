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

@import url('https://fonts.googleapis.com/css2?family=Edu+VIC+WA+NT+Beginner&family=Roboto:wght@300;400&display=swap');
#app {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    background-color: #ececec;
}

.navbar {
    height: 50px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    line-height: 50px;
    background-color: #1f5d6b;
    color: #fff;
    padding: 0 15px;
    text-align: center;
    transition: font-weight 0.3s;

    a {
        color: #fff;
    }

}
</style>

<script>
</script>

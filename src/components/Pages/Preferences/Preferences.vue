<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script>
    export default {
        name: 'Preferences',
        beforeCreate: function() {
            document.title = "Sistema de recomendación turístico grupal"
        },
    }
</script>

<style lang="scss" scoped>

    @import 'src/assets/css/global.scss';

</style>

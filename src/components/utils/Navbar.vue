<template>
    <b-navbar id="navbar" fixed="up" toggleable="lg" variant="faded" type="dark">
        <b-container>
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav>
                        <b-nav-item :to="{ name: 'Home'}"><span class="navbar-section">Buscar</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Preferences'}"><span class="navbar-section">Preferencias</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Historic'}"><span class="navbar-section">Historial</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Valorations'}"><span class="navbar-section">Valoraciones</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Login', query: { logout: true }}">Salir</b-nav-item></span></b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    export default {
        name: 'Navbar',
        computed: {
            section_focused() {
                return this.$store.state.section_focused;
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    #brand {
        cursor: pointer;
    }

    nav {
        background-color: $green;
        color: $green;
        margin: auto;
    }

    .navbar-section {
        font-size: 16px;
    }

</style>

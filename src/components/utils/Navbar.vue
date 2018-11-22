<template>
    <b-navbar id="navbar" fixed="up" toggleable="lg" variant="faded" type="dark">
        <b-container class="main-container">
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav>
                        <b-nav-item :to="{ name: 'Buscar'}"><span class="navbar-section">Buscar</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Preferencias'}"><span class="navbar-section">Preferencias</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Historial'}"><span class="navbar-section">Historial</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Valoraciones'}"><span class="navbar-section">Valoraciones</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Amigos'}"><span class="navbar-section">Amigos</span></b-nav-item>
                    </b-navbar-nav>
                    <b-nav-item-dropdown right id="userMenu">
                        <template slot="button-content">
                            <span class="username">{{ this.email }}</span>
                        </template>
                        <b-dropdown-item :to="{ name: 'Login', query: { logout: true }}">Log out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    export default {
        name: 'Navbar',
        computed: {
            email() {
                return this.$store.state.email;
            },
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

    .username {
        font-size: $medium;
    }

    .dropdown {
        .dropdown-menu {
            a {
                text-decoration: none;
                outline: none;
            }
            #profile-picture {
                border: 1px solid $white;
            }
        }
    }

    .navbar-section {
        font-size: 14px;
    }

</style>

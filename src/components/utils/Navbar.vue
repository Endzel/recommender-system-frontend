<template>
    <b-navbar id="navbar" fixed="up" toggleable="lg" variant="faded" type="dark">
        <btn v-if="is_staff" @click="goToAdmin" color="blue" class="btn-admin">Configurar motor</btn>
        <b-container class="navbar-section">
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>
            <b-collapse is-nav id="nav_collapse" class="navbar-section">
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav>
                        <b-nav-item :to="{ name: 'Home'}"><span>Buscar</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Preferences'}"><span>Preferencias</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Historic'}"><span>Historial</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Valorations'}"><span>Valoraciones</span></b-nav-item>
                        <b-nav-item :to="{ name: 'Login', query: { logout: true }}">Salir</b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    export default {
        name: 'Navbar',
        data: function () {
            return {
                user_staff: false
            }
        },
        computed: {
            section_focused() {
                return this.$store.state.section_focused;
            },
            is_staff() {
                this.user_staff = this.$store.state.is_staff
                return this.user_staff
            },
        },
        methods: {
            goToAdmin() {
                window.location.href = "http://localhost:8000/admin/"
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @use '@/assets/css/global.scss' as *;

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
        justify-content: center;
        .navbar-nav {
            justify-content: space-evenly;
            width: 100%;
            margin-left: 0px;
        }
    }

    .btn-admin {
        max-width: 200px;
        height: 80px;
        font-size: 16px;
    }

</style>

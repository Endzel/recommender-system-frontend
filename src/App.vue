<template>


    <div id="app-login" v-if="this.$store.state.logged_in !== true">

      <router-view/>

    </div>


    <div id="app" v-else-if="this.$store.state.logged_in === true" >

        <navbar id="navbar"/>

        <alert v-if="this.$store.state.alert.show" :message="this.$store.state.alert.message" :type="this.$store.state.alert.type" />

        <div class="view">

            <b-col class="main">
                <pic class="image-header" :fluid="true" :src="require('@/assets/images/header.jpg')"/>
                <b-container class="main-container break-margin-left break-margin-right">
                    <router-view class="main-container break-margin-left break-margin-right" />
                </b-container>
            </b-col>

        </div
        >
    </div>
</template>

<script>
    import Navbar from '@/components/utils/Navbar'

    export default {
        name: 'app',
        components: { 'navbar': Navbar },
        data () {
            return {

            }
        },
        methods : {
        },
        beforeCreate: function () {
            document.title = "Sistema de recomendación turístico grupal"
            if (!(this.$route.name === 'Login' && this.$route.query.logout) && this.$route.name !== 'Register') {
                this.$store.dispatch('searchInfos')
            }
        },
    }
</script>

<style lang="scss">
    @use '@/assets/css/global.scss' as *;

    html, body {
        font: $main-font;
        color: $black;
    }



    @media (min-width: 1100px) {
        .main-nav {
            max-width: 1850px;
        }
    }

    .image-header {
        max-height: 300px;
        width: 100%;
    }

    .main {
        width: 100vw;
        padding-right: 0;
        padding-left: 0;
    }

    .row.row-break-margin-bottom {
        margin-bottom: 0px !important;
    }
    .row.row-break-margin-top {
        margin-top: 0px !important;
    }

    .wrapper {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        width: 100%;
    }

    .field-group {
        min-width: 40%;
        align-items: center;
    }

    .btn {
        cursor: pointer;
    }

    a.button {
        box-shadow: none !important;
        padding-top: 15px;
    }

    .router-link-active {
        font: $main-font;
        color: $grey;
        line-height: 1.5;
        cursor: pointer;
        text-decoration: underline;
    }

    .router-link-active:hover {
        color: $blue;
    }

    .view {
        display: flex;
        flex-wrap: wrap;
        background-color: $white;
    }

    .feedback {
        font-weight: bold;
        color: $red;
    }

    .main-container {
        max-width: 100%;
        padding: 0px;
        min-height: 100vh;
    }

    .container {
        .row {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }

    .side {
        min-width: 180px;
        padding: 0px;
    }

    .page-root {
        text-align: center;
        padding: 70px;
        margin-left: 235px;
        overflow-x: hidden;
        @media (min-width: 320px) and (max-width: 767px) {
            padding: 20px;
            margin-left: 0px;
        }
    }

    .break {
        color: $white;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    // Breaks

    .break-margin {
        &-top {
            margin-top: 0px !important;
        }
        &-bottom {
            margin-bottom: 0px !important;
        }
        &-left {
            margin-left: 0px !important
        }
        &-right {
            margin-right: 0px !important
        }
        &-all {
            margin: 0px !important;
        }
    }

    .break-padding {
        padding: 0px !important;
        &-top {
            padding-top: 0px !important;
        }
        &-bottom {
            padding-bottom: 0px !important;
        }
        &-left {
            padding-left: 0px !important
        }
        &-right {
            padding-right: 0px !important
        }
        &-all {
            padding: 0px !important;
        }
    }

</style>

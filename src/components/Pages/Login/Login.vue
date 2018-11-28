<template>
    <div class="login d-flex align-items-center">
        <b-container>
            <b-row><b-col class="title">Bienvenido</b-col></b-row>
            <b-container id="login-form">
                <b-form-group :feedback="feedbacks.form" class="form-validation">
                    <b-row><b-col><b-form-input placeholder="alumno@ejemplo.com" v-model.trim="login_body.username" @keydown.enter.native="login" type="email"></b-form-input></b-col></b-row>
                    <b-row><b-col><b-form-input placeholder="••••••••" v-model.trim="login_body.password" type="password" @keydown.enter.native="login"></b-form-input></b-col></b-row>
                </b-form-group>
                <b-row>
                    <b-col>
                        <b-btn size="lg" color="purple" @click="login()">Acceder</b-btn>
                    </b-col>
                    <b-col>
                        <b-btn size="lg" color="purple" @click="toRegister()">Registrarse</b-btn>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                login_body: {},
                validate: true,
                feedbacks: {
                  form: null,
                },
            }
        },
        methods: {
            login() {
                this.apiPost('login/', this.login_body).then(response => {
                    this.$store.dispatch('login', response.data)
                }, error => {
                });
            },
            toRegister() {
                this.$router.push({ name: 'Register' })
            },
        },
        beforeCreate: function(state) {
            if (this.$route.query.logout !== undefined && this.$route.query.logout !== false && this.$store.state.logged_in) {
                this.$store.dispatch('logout');
            } else if (this.$store.state.logged_in) {
                this.$router.push({ name: 'Home' })
            } else {
                this.$store.dispatch('focusSection', "Login")
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .login {
        width: 100%;
        min-height: 100vh;
        background-color: $white;
        text-align: center;
        .title {
            text-align: center;
            margin-bottom: 40px;
        }
        #login-form {
            max-width: 400px;
        }
    }

    .hvr-grow-shadow {
        box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>

<template>
    <div class="login d-flex align-items-center">
        <b-container>
            <b-row><b-col class="title">Bienvenido</b-col></b-row>
            <b-container id="login-form">
                <b-form-group class="form-validation">
                    <b-row><b-col><input-field placeholder="alumno@ejemplo.com" v-model.trim="login_body.username" @keydown.enter.native="login" type="email"/></b-col></b-row>
                    <b-row><b-col><input-field placeholder="••••••••" v-model.trim="login_body.password" type="password" @keydown.enter.native="login"/></b-col></b-row>
                </b-form-group>
                <b-row v-show="this.feedback !== ''">
                    <b-col>
                        <p class="feedback-error">{{ this.feedback }}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <btn size="big" color="green" @click="login()">Acceder</btn>
                    </b-col>
                    <b-col>
                        <btn size="big" color="green" @click="toRegister()">Registrarse</btn>
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
                feedback: '',
            }
        },
        methods: {
            login() {
                this.apiPost('users/login', this.login_body).then(response => {
                    this.$store.dispatch('login', response.data)
                }, response => {
                    if (response.body !== undefined && response.body !== null) {
                        this.feedback = response.body.error;
                    } else {
                        this.feedback = 'Tus credenciales no son correctas!'
                    }
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
            margin-bottom: 10px;
        }
        #login-form {
            max-width: 400px;
        }
    }

</style>

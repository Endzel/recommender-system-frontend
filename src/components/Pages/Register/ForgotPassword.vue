<template>
    <div id="register" class="d-flex align-items-center register">
        <b-container>
            <b-row>
                <b-col>
                    <div id="title" class="title hvr-grow-shadow">
                        <span id="main">Le ayudaremos a recordar su contraseña...</span>
                    </div>
                </b-col>
            </b-row>
            <b-container id="register-form">
                <b-row>
                    <b-col>
                        <input-field placeholder="alumno@ejemplo.com" v-model="register_body.email" @keydown.enter.native="register"></input-field>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col>
                        <span class="feedback-error">{{ this.feedback }}</span>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <btn size="big" color="green" @click="register()">Recordar contraseña</btn>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>

    export default {
        name: 'ForgotPassword',
        data: function() {
            return {
                register_body: {},
                feedback: "",
            }
        },
        methods: {
            register() {
                if (this.register_body.email !== undefined) {
                    this.apiPost(this.$store.state.api.domain + 'users/forgot_password$', this.register_body).then(response => {
                        this.$store.dispatch('join', {email: this.register_body.email, password: this.register_body.password })
                        this.apiPost('users/login', {username: this.register_body.email, password: this.register_body.password }).then(response => {
                            this.$store.dispatch('setAlert', { show: true, type: 'info', message: 'Email enviado!'})
                            this.$store.dispatch('login', response.data)
                        }, response => {})
                    }, response => {
                        this.$store.dispatch('setAlert', { show: true, type: 'error', message: 'Ha habido un error :('})
                        this.feedback = response.body.error;
                    });
                } else {
                    this.feedback = "Escribe tu email, por favor"
                }
            }
        },
        beforeCreate: function() {
            if (this.$store.state.logged_in) {
                this.$router.push({ name: 'Home' })
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @use '@/assets/css/global.scss' as *;


    .register {
        width: 100%;
        min-height: 100vh;
        background-color: $white;
        text-align: center;
        #title {
            text-align: center;
            margin-bottom: 40px;
            #main {
                font-size: 50px;
            }
            #sub {
                color: $grey;
            }
        }
        #register-form {
            max-width: 400px;
        }
        .error {
            font-weight: bold;
            color: $red;
        }
    }

</style>

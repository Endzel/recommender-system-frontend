<template>
    <div id="register" class="d-flex align-items-center register">
        <b-container>
            <b-row>
                <b-col>
                    <div id="title" class="title hvr-grow-shadow">
                        <span id="main">Acceda al sistema</span>
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
                        <input-field placeholder="Nombre" v-model="register_body.first_name" @keydown.enter.native="register"></input-field>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <input-field placeholder="Apellido" v-model="register_body.last_name" @keydown.enter.native="register"></input-field>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col>
                        <input-field placeholder="••••••••" v-model="register_body.password" type="password" @keydown.enter.native="register"></input-field>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <input-field placeholder="••••••••" v-model="register_body.confirm_password" type="password" @keydown.enter.native="register"></input-field>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <span class="feedback-error">{{ this.feedback }}</span>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <btn size="big" color="green" @click="register()">Completar registro</btn>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>

    export default {
        name: 'Register',
        data: function() {
            return {
                register_body: {},
                feedback: "",
            }
        },
        methods: {
            register() {
                if (this.register_body.confirm_password !== undefined && this.register_body.confirm_password === this.register_body.password) {
                    this.apiPost(this.$store.state.api.domain + 'users/register', this.register_body).then(response => {
                        this.$store.dispatch('join', {email: this.register_body.email, password: this.register_body.password })
                        this.apiPost('users/login', {username: this.register_body.email, password: this.register_body.password }).then(response => {
                            this.$store.dispatch('login', response.data)
                        }, response => {})
                    }, response => {
                        this.feedback = response.body.error;
                    });
                } else {
                    this.feedback = "Las contraseñas no coinciden :("
                }
            }
        },
        beforeCreate: function() {
            if (this.$store.state.logged_in) {
                this.$router.push({ name: 'Home' })
            } else {
                this.$store.dispatch('focusSection', 'Register');
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import 'src/assets/css/global.scss';


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

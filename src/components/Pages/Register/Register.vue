<template>
    <div id="register" class="d-flex align-items-center">
        <b-container>
            <b-row>
                <b-col>
                    <div id="title" class="hvr-grow-shadow">
                        <span id="main">Sistema de recomendación turístico grupal</span>
                    </div>
                </b-col>
            </b-row>
            <b-container id="register-form">
                <b-row>
                    <b-col>
                        <b-form-input placeholder="your@example.com" v-model="register_body.email" @keydown.enter.native="register"></b-form-input>
                    </b-col>
                </b-row>
                <hr class="my-4">
                <b-row>
                    <b-col>
                        <b-form-input placeholder="Nombre" v-model="register_body.first_name" @keydown.enter.native="register"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-input placeholder="Apellido" v-model="register_body.last_name" @keydown.enter.native="register"></b-form-input>
                    </b-col>
                </b-row>
                <hr class="my-4">
                <b-row>
                    <b-col>
                        <b-form-input placeholder="••••••••" v-model="register_body.password" type="password" @keydown.enter.native="register"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-input placeholder="••••••••" v-model="register_body.confirm_password" type="password" @keydown.enter.native="register"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-btn size="lg" variant="primary" class="button primary-button" @click="register()">Regístrate</b-btn>
                    </b-col>
                    <b-col>
                        <span class="error">{{ this.feedback }}</span>
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
                    this.apiPost('register/', this.register_body).then(response => {
                        this.$store.dispatch('login', response.data)
                    }, error => {
                    });
                    this.apiPost(this.$store.state.api.domain + '/register', this.register_body, {headers: headers}).then(response => {
                        this.$store.dispatch('join', {email: this.register_body.email, password: this.register_body.password })
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


    .login {
        width: 100%;
        min-height: 100vh;
        background-color: $white;
        text-align: center;
        #title {
            text-align: center;
            margin-bottom: 40px;
            #main {
                font-size: 50px;
                color: $red;
            }
            #sub {
                color: $grey;
            }
        }
        .error {
            font-weight: bold;
            color: $red;
        }
    }

    .hvr-grow-shadow {
        box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>

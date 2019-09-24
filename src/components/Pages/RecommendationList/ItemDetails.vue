<template>
    <b-container>
        <b-row class="header-infos mt-3">
            <b-col v-if="data.image !== undefined && data.image !== null"><pic id="image" fluid :type="'background_image'" :src="data.image"/></b-col>
            <b-col v-else><pic id="background-image" :type="'background_image'" fluid :src="require('@/assets/images/default-item.jpg')"/></b-col>
            <b-col cols="6">
                <tag class="title" :value="data.name"/>
                <div class="justify-content-center text-center">
                    <b-row>
                        <span class="middle-infos">Lugar: {{ data.city.name }}, {{ data.city.country }}</span>
                    </b-row>
                    <b-row>
                        <span class="middle-infos">Precio: {{ data.price }}</span>
                    </b-row>
                    <b-row>
                        <span class="middle-infos">Página web: <a class="link" :href="data.weblink">{{data.weblink}}</a></span>
                    </b-row>
                </div>
            </b-col>
            <b-col><iframe v-if="data.gps_point !== undefined && data.gps_points !== null" :src="data.gps_point" width="400" height="380" frameborder="0" style="border:0;" allowfullscreen=""></iframe></b-col>
        </b-row>
        <b-row class="details-body mt-5">
            <b-col><span>{{ data.description }}</span></b-col>
        </b-row>
        <b-row class="details-body mt-5">
            <b-col><valoration-card v-if="ready" color="yellow" :initialValue="valoration" title="Valoración:" @update="setValoration"></valoration-card></b-col>
            <b-col cols="2" class="justify-content-center align-items-center text-center"><span class="align-items-center mt-4" style="display:inline-flex;">Write your review here:</span></b-col>
            <b-col><text-area-field v-if="ready" :initialValue="comment" @update="updateComment"></text-area-field></span></b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'ItemDetails',
        data () {
            return {
                data: {
                    city: {}
                },
                comment: "",
                valoration: 0,
                ready: false
            }
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
            updateComment(value) {
                this.comment = value
            },
            setValoration(value) {
                let params = {}
                params['score'] = value
                params['item'] = this.$route.params.id
                params['comment'] = this.comment
                params['user'] = this.$store.state.user
                if (this.isEmpty(this.data.valoration)) {
                    this.apiPost('valorations', params).then(response => {
                        this.data.valoration = response.data
                        this.$store.dispatch('setAlert', { show: true, type: 'success', message: 'Valoración creada correctamente 😊'})
                    }, response => {
                        this.$store.dispatch('setAlert', { show: true, type: 'error', message: 'No fue posible guardar tu valoración 😥'})
                    });
                } else {
                    this.apiPatch('valorations/' + this.data.valoration.id, params).then(response => {
                        this.data.valoration = response.data
                        this.$store.dispatch('setAlert', { show: true, type: 'success', message: 'Valoración guardada correctamente 😊'})
                    }, response => {
                        this.$store.dispatch('setAlert', { show: true, type: 'error', message: 'No fue posible guardar tu valoración 😥'})
                    });
                }
            },
        },
        created: function () {
            this.apiGet('items/' + this.$route.params.id).then(response => {
                this.data = response.data
                if (!this.isEmpty(this.data.valoration)){
                    this.comment = this.data.valoration.comment
                    this.valoration = this.data.valoration.score
                }
                this.ready = true
            }, response => {});
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .header-infos {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        transition: background .3s ease, color .3s ease;
        #image{
            max-width: 100%;
            height: 380px;
        }
        .title {
            min-width: 100%;
            font-size: 38px;
        }
        .middle-infos {
            font-size: 20px;
            margin-top: 7%;
            margin-left: 15%;
        }
    }

    .details-body {
        width: 90%;
        margin-left: 5%;
    }

</style>

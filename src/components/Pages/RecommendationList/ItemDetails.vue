<template>
    <b-container>
        <b-row class="header-infos">
            <b-col><pic id="image" v-if="data.image !== undefined && data.image !== null" fluid :type="'background_image'" :src="data.image"/></b-col>
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
        <b-row>
            <b-col><span class="description">{{ data.description }}</span></b-col>
            <!-- <b-col><card color="yellow" title="Valoración:" @update="setValoration"></card></b-col> -->
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'ItemDetails',
        data () {
            return {
                data: null
            }
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
        },
        created: function () {
            this.apiGet('items/' + this.$route.params.id).then(response => {
                this.data = response.data
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
            margin-top: 7%;
            margin-left: 30%;
        }
    }

    .description {
        width: 80%;
        margin-left: 5%;
        margin-right: 5%;
    }

</style>

<template>
    <b-container>
        <router-link :to="{ path: '/items/' + data.id}">
            <b-row class="card">
                <pic id="background-image" v-if="data.image !== undefined && data.image !== null" fluid :type="'background_image'" :src="data.image"/>
                <pic v-else id="background-image" :type="'background_image'" fluid :src="require('@/assets/images/default-item.jpg')"/>
                <div class="foreground">
                    <b-row cols="6">
                        <b-col>
                            <span class="title">{{ data.name }}</span>
                        </b-col>
                        <b-col>
                            <tag class="float-right right-info" :value="data.price + ' €'" color="yellow"/>
                        </b-col>
                    </b-row>
                    <b-row cols="6">
                        <b-col>
                            <a class="float-right link" :href="data.weblink">{{data.weblink}}</a>
                        </b-col>
                    </b-row>
                </div>
            </b-row>
        </router-link>
    </b-container>
</template>

<script>
    export default {
        name: 'ItemCard',
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {

            }
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .card {
        border-radius: 5px;
        height: 150px;
        width: 100%;
        min-width: 500px;
        transition: background .3s ease, color .3s ease;
        #background-image{
            max-width:100%;
            max-height:100%;
            object-fit: cover;
            opacity: 0.35;
        }
        .foreground {
            position: absolute;
            width: 100%;
            height: 100%;
            .title {
                margin: 20px;
            }
            .right-info {
                width: 100%;
                margin: 20px
            }
            .link {
                margin: 20px;
            }
        }
    }

</style>

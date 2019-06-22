import axios from 'axios';

export default {
    data() {
        return {
            requestHandler: axios.create({
                baseURL: this.$store.state.api.domain,
                headers: {
                     'Authorization': 'Token ' + this.$store.state.api.token,
                     'X-CSRFToken': this.$store.state.api.csrftoken || "",
                     'Content-Type': 'application/json',
                     'Accept': 'application/json'
                }
            })
        }
    },
    methods: {
        async apiGet(url, fields) {
            return await this.requestHandler.get(url)
        },
        async apiDel(url) {
            return await this.requestHandler.delete(url)
        },
        async apiPatch(url, data) {
            return await this.requestHandler.patch(url, data)
        },
        async apiPost(url, data) {
            return await this.requestHandler.post(url, data)
        },
    }
}

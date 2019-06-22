export default {
    methods: {
        isEmpty(obj) {
            if (obj == undefined) return true;
            if (obj == null) return true;
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;
            if (typeof obj !== "object") return true;
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        },
        humanize(str) {
            if (str !== undefined && str !== '') {
                var frags = str.split('_');
                for (var i = 0; i < frags.length; i++) {
                    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
                }
                return frags.join(' ');
            }
            return str;
        },
        getCityChoices() {
            this.apiGet('cities/choices').then(response => {
                return response.data;
            }, error => {
                return []
            });
        },
        getUserChoices() {
            this.apiGet('users/choices').then(response => {
                return response.data;
            }, error => {
                return []
            });
        },
        getContextChoices() {
            this.apiGet('context_segments/choices').then(response => {
                return response.data;
            }, error => {
                return []
            });
        },
    }
}

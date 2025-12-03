import requests from './requests.js'
import utils from './utils.js'

export default {
    install(app) {
        app.mixin(requests);
        app.mixin(utils);
    }
}

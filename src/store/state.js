export default {
    id: null,
    user: null,
    is_staff: false,
    section_focused: null,
    api: {
        domain: process.env.API,
        token: null,
        csrftoken: null,
    },
    logged_in: null,
    expiry: {
        cookie: 30, // 30 days
        local_storage: 60 * 60 * 1000 * 24 * 30, // 30 days
    },
    cache_data: {},
}

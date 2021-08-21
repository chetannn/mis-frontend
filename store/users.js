export const state = () => ({
    list: [],
    errors: {},
    modelData: {
        name: 'Rabin',
        email: 'rabin@gmail.com',
        password: 'password'
    },
    pagination: {},
    total: 0,
    loading: false,
    links: {}
})

export const mutations = {
    SET_USERS(state, users) {
        state.list = users
    },
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
    SET_TOTAL(state, total) {
        state.total = total
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_LINKS(state, links) {
        state.links = links
    }
}

export const actions = {
    async getAll({ state, commit }) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$axios.get('/api/v1/users')
            commit('SET_USERS', response.data.data)
            commit('SET_TOTAL', response.data.total)
            commit('SET_LINKS', response.data.links)

        }
        catch (e) {
            console.log(e)
        }
        commit('SET_LOADING', false)

    },
    async store({ state, commit }) {
        try {
            //TODO: Set loading to true
            await this.$axios.get('/sanctum/csrf-cookie')
            const response = await this.$axios.post('/api/v1/users', state.modelData)
        }
        catch (e) {
            //TODO: Set loading to false
            if (e.response.status === 422) {
                commit('SET_ERRORS', e.response.data.errors)
            }
            console.log('here')
        }
    }
}
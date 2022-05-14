export default {
    state: {
        clientName: "",
        items: [
        
        ],
        previewPage: false,
        documentsPage: true,
        infoPage: false,
        clientNameView: true,
        addItemsView: false,
        // file is quote or invoice
        file: 'INVOICE'
    },

    getters: {
        getInfo(state) {
            return state.info;
        },

        getFileName(state){
            return state.file
        },

        getClientNameView(state){
            return state.clientNameView
        },

        getAddItemsView(state){
            return state.addItemsView
        },

        getClientName(state){
            return state.clientName
        },

        getTotal(state){
            let total = 0 

            for (let i = 0; i < state.items.length; i++) {
                var price = state.items[i].quantity * state.items[i].price
                total = total + price
            }

            return total
        },

        getInfoPage(state) {
            return state.infoPage;
        },

        getDocumentsPage(state) {
            return state.documentsPage;
        },

        getPreviewPage(state) {
            return state.previewPage;
        },

        getItems(state){
            return state.items
        }
    },

    mutations: {
        SET_INFO_STATE(state, infostate) {
            state.clientName = infostate
        },

        SET_FILE_STATE(state, filestate) {
            state.file = filestate
        },

        SET_CLIENT_NAME_VIEW(state, namestate){
            state.clientNameView = namestate
        },

        SET_ADD_ITEMS_VIEW(state, namestate){
            state.addItemsView = namestate
        },

        SET_INFO_PAGE_STATE(state, infostate) {
            state.infoPage = infostate
        },

        SET_DOCUMENTS_PAGE_STATE(state, docsstate) {
            state.documentsPage = docsstate
        },

        SET_PREVIEW_STATE(state, previewstate) {
            state.previewPage = previewstate
        },

        ADD_ITEM_STATE(state, item) {
            state.items.push(item)
        },

        ITEM_STATE(state, item) {
            state.items = item
        },

        DELETE_ITEM_STATE(state, item) {
            for (let i = 0; i < state.items.length; i++) {
                if(state.items[i].description == item){
                    state.items.splice(i, 1)
                }
            }
        },

        FLUSH_ITEMS(state){
            state.items = []
        }
    },

    actions: {
        changeInfoState({ commit }, state) {
            commit('SET_INFO_STATE', state)
        },

        changeFileState({ commit }, state) {
            commit('SET_FILE_STATE', state)
        },

        changeClientNameView({ commit }, state){
            commit('SET_CLIENT_NAME_VIEW', state)
        },

        changeAddItemsView({ commit }, state){
            commit('SET_ADD_ITEMS_VIEW', state)
        },

        changeInfoPageState({ commit }, state) {
            commit('SET_INFO_PAGE_STATE', state)
        },

        changeDocumentsPageState({ commit }, state) {
            commit('SET_DOCUMENTS_PAGE_STATE', state)
        },

        changePreviewState({ commit }, state) {
            commit('SET_PREVIEW_STATE', state)
        },

        changeItemState({ commit }, state) {
            // add a single item
            commit('ADD_ITEM_STATE', state)
        },

        ItemState({ commit }, state) {
            // add a single item
            commit('ITEM_STATE', state)
        },

        deleteItemState({ commit }, state) {
            commit('DELETE_ITEM_STATE', state)
        },

        removeAllItems({ commit }){
            commit("FLUSH_ITEMS")
        }
    }
}
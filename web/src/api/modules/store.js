export default function (instance) {
    return {
        addStore: (data) => instance.post("stores", data),
    getStores: () => instance.get("stores"),
    getStor: (id) => instance.get(`stores/${id}`)}
}

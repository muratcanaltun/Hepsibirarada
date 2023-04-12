export default function(instance) {
    return {
        addProduct: (data) => instance.post("products", data),
        getProducts: () => instance.get("products")
    }
}

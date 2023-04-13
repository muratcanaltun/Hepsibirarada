export default function (instance) {
    return {
        addCustomer: (data) => instance.post("customers", data),
        getCustomers: () => instance.get("customers"),
        getCustomer: (id) => instance.get(`customers/${id}`)
    }
}

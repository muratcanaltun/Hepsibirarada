export default function (instance) {
    return (data) => instance.post("products", data);
}

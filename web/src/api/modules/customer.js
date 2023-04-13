export default function (instance) {
    return (data) => instance.post("customers", data);
}

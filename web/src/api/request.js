import product from "./modules/product";
import mainInstance from "./instances/mainInstance";
import store from "./modules/store";

export default {
    product: product(mainInstance),
    store: store(mainInstance)
}

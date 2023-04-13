import product from "./modules/product";
import mainInstance from "./instances/mainInstance";
import store from "./modules/store";
import customer from "./modules/customer";

export default {
    product: product(mainInstance),
    store: store(mainInstance),
    customer: customer(mainInstance)
}

import product from "./modules/product";
import mainInstance from "./instances/mainInstance";

export default {
    product: product(mainInstance)
}

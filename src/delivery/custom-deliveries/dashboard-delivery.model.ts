import { Delivery } from "../delivery.model";

export class DashboardDelivery extends Delivery {

    override get gratuity() {
        return 0.1 * this.orderCost;
    }
}
import { DashboardDelivery } from "./custom-deliveries/dashboard-delivery.model";
import { McDonaldsDelivery } from "./custom-deliveries/mcdonalds-delivery.model";
import { Delivery } from "./delivery.model";

export class DeliveryFactory {
    // all variations should be added to this factory
    static createDelivery(contractInfo, data) {
        // rule with more precedence should be first
        if (contractInfo.orderSource.prefix === 'DASHBOARD') {
            return new DashboardDelivery(contractInfo, data);
        }

        // rule with less precedence should be after
        if (contractInfo.brand.id === 'MCD') {
            return new McDonaldsDelivery(contractInfo, data);
        }

        // default
        return new Delivery(contractInfo, data);
    }
}
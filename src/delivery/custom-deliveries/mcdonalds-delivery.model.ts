import { Delivery } from "../delivery.model";

export class McDonaldsDelivery extends Delivery {

    // custom job name specific for this brand
    override get jobName(): string {
        return `MCD_${this.externalId}`;
    }
}
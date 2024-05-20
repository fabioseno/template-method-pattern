export interface Brand {
    id: string;
    name: string;
}

export interface OrderSource {
    prefix: string;
    name: string;
}

export interface Partner {
    id: string;
    name: string;
}

// simplified version of the original model
export class ContractInfo {

    readonly brand: Brand;

    readonly orderSource: OrderSource;

    readonly partner?: Partner;

    constructor(data: {
        brand: Brand;
        orderSource: OrderSource;
        partner?: Partner;
    }) {
        if (data) Object.assign(this, data);
    }

}
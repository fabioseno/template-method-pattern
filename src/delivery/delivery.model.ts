import { ContractInfo } from "./contractInfo.model";

export interface Contact {
    firstName: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    secondaryPhoneNumber?: string;
}

export class Address {
    street1: string;
    street2?: string;
    street3?: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
}

export class RestaurantInformation {
    locationName: string;
    uniqueNumber?: string;
}

export class PickupInformation {
    pickupAddress: Address | string;
    pickupContact: Contact;
    pickupTime?: Date;
    restaurantInformation: RestaurantInformation
}

export class DropoffInformation {
    dropoffAddress: Address | string;
    dropoffContact: Contact;
    dropoffTime?: Date;
}

interface DeliveryStatus {
    QUOTE: 'QUOTE';
    UNASSIGNED: 'UNASSIGNED';
    ASSIGNED: 'ASSIGNED';
    AT_PICKUP: 'AT_PICKUP';
    DEPARTED_PICKUP: 'DEPARTED_PICKUP';
    AT_DROPOFF: 'AT_DROPOFF';
    DELIVERED: 'DELIVERED';
    CANCELLED: 'CANCELLED';
    CANCELLED_BILLABLE: 'CANCELLED_BILLABLE';
}

export class Delivery {

    public readonly contractInfo: ContractInfo;

    public readonly externalId: string;

    public readonly orderCost: number;

    private _gratuity: number;

    public get gratuity() {
        return this._gratuity;
    }

    get jobName() {
        return `${this.contractInfo.orderSource.prefix}_${this.externalId}`;
    }

    public readonly pickupInformation: PickupInformation;

    public readonly dropoffInformation: DropoffInformation;

    constructor(contractInfo: ContractInfo, data?: Partial<Delivery>) {
        // having basic validations in the model guarantees that all the validations are applied no matter the integration.
        this.validateRequired(data);
        this.validateTimes(data.pickupInformation.pickupTime, data.dropoffInformation.dropoffTime);

        this.contractInfo = contractInfo;
        this.externalId = data.externalId;
        this.orderCost = data.orderCost;
        this._gratuity = data.gratuity;
        this.pickupInformation = data.pickupInformation;
        this.dropoffInformation = data.dropoffInformation;
    }

    private validateRequired(data) {
        if (!data.externalId) throw new Error('externalId is required');
        if (!data.orderCost) throw new Error('orderCost is required');
        if (!data.pickupInformation) throw new Error('pickupInformation is required');
        if (!data.dropoffInformation) throw new Error('dropoffInformation is required');
        if (!data.pickupInformation.pickupTime && !data.dropoffInformation.dropoffTime) throw new Error('pickupTime or dropoffTime is required');
    }

    private validateTimes(pickupTime: Date, dropoffTime: Date) {
        if (pickupTime > dropoffTime) throw new Error('pickupTime must be before dropoffTime');
    }

    protected getDifferenceHours(date1: Date, date2: Date) {
        return Math.abs(date1.getTime() - date2.getTime()) / 1000 / 60 / 60;
    }

    canAcceptDelivery() {
        return this.getDifferenceHours(this.pickupInformation.pickupTime, new Date()) > 3;
    }

    setRestaurantLocation(data: any) { // defined the type properly 
        this.pickupInformation.pickupAddress = data.address;
        this.pickupInformation.restaurantInformation = data.restaurantInformation;
    }
}
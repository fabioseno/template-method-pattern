import { Injectable } from '@nestjs/common';
import { ContractInfo } from './delivery/contractInfo.model';
import { DeliveryFactory } from './delivery/delivery.factory';

@Injectable()
export class AppService {

  createDelivery(contractInfo: ContractInfo, rawData: any) {
    // create delivery skeleton

    const delivery = DeliveryFactory.createDelivery(contractInfo, rawData);

    // call maps service
    //const restaurantLocation = restaurantLocationService.findOrCreateRestaurantLocation(delivery.pickupInformation.pickupAddress);
    //delivery.setRestaurantLocation(restaurantLocation);


    // store in the database
  }


  defaultRules() {
    const contractInfo = new ContractInfo({
      brand: {
        id: '123',
        name: 'Any brand'
      },
      orderSource: {
        prefix: 'ANY_SOURCE',
        name: 'Any order source'
      }
    });

    const delivery = DeliveryFactory.createDelivery(contractInfo, {
      externalId: '111',
      orderCost: 10000,
      gratuity: 1000,
      pickupInformation: {
        pickupAddress: 'Any address',
        pickupContact: { firstName: 'Any contact' },
        pickupTime: this.addHours(new Date(), 2)
      },
      dropoffInformation: {
        dropoffAddress: 'Any dropoff address',
        dropoffContact: { firstName: 'Any contact' },
        dropoffTime: this.addHours(new Date(), 2)
      }
    });

    console.log(`\nDEFAULT DELIVERY: USE DEFAULT RULES`);
    console.log(`- shouldn't accept deliveries within 3 hours to PU`);
    console.log(`canAcceptDelivery: ${delivery.canAcceptDelivery()}`);
    console.log(`jobName: ${delivery.jobName}`);
    console.log(`full gratuity: ${delivery.gratuity}`);
  }

  mcDonaldsRules() {
    const contractInfo = new ContractInfo({
      brand: {
        id: 'MCD',
        name: 'McDonalds'
      },
      orderSource: {
        prefix: 'ORDER_PREFIX',
        name: 'Any order source'
      }
    });

    const delivery = DeliveryFactory.createDelivery(contractInfo, {
      externalId: '111',
      orderCost: 10000,
      gratuity: 2000,
      pickupInformation: {
        pickupAddress: 'Any address',
        pickupContact: { firstName: 'Any contact' },
        pickupTime: this.addMinutes(new Date(), 40)
      },
      dropoffInformation: {
        dropoffAddress: 'Any dropoff address',
        dropoffContact: { firstName: 'Any contact' },
        dropoffTime: this.addHours(new Date(), 2)
      }
    });

    console.log(`\nMCDONALDS DELIVERY: USE MCDONALDS RULES`);
    console.log(`- shouldn't accept deliveries within 1 hour to PU`);
    console.log(`CUSTOM RULE => canAcceptDelivery: ${delivery.canAcceptDelivery()}`);
    console.log(`CUSTOM NAME => jobName: ${delivery.jobName}`);
    console.log(`DEFAULT GRATUITY (FULL) => gratuity: ${delivery.gratuity}`);
  }

  dashboardRules() {
    const contractInfo = new ContractInfo({
      brand: {
        id: 'ANY',
        name: 'ANY'
      },
      orderSource: {
        prefix: 'DASHBOARD',
        name: 'Dashboard'
      }
    });

    const delivery = DeliveryFactory.createDelivery(contractInfo, {
      externalId: '111',
      orderCost: 10000,
      pickupInformation: {
        pickupAddress: 'Any address',
        pickupContact: { firstName: 'Any contact' },
        pickupTime: this.addHours(new Date(), 4)
      },
      dropoffInformation: {
        dropoffAddress: 'Any dropoff address',
        dropoffContact: { firstName: 'Any contact' },
        dropoffTime: this.addHours(new Date(), 5)
      }
    });

    console.log(`\nDASHBOARD DELIVERY: USE DASHBOARD RULES`);
    console.log(`- shouldn't consider 10% gratuity over order cost`);
    console.log(`DEFAULT PU TIME RULE => canAcceptDelivery: ${delivery.canAcceptDelivery()}`);
    console.log(`DEFAULT JOB NAME => jobName: ${delivery.jobName}`);
    console.log(`10% gratuity => gratuity: ${delivery.gratuity}`);
  }

  private addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  private addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60 * 1000);
  }
}

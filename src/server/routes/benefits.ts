import { Router, routePrefix, route, HttpMethods } from 'anux-exchange';
import { IBenefit } from '../../shared/models';
import { getDb } from '../database';

interface IBenefitsRecord {
  _id: string;
  benefits: IBenefit[];
}

@routePrefix('/benefits')
export class Benefits extends Router {

  //#region Properties

  private get collection() { return getDb().collection('benefits'); }

  //#endregion

  //#region Methods

  @route(HttpMethods.Get, '/')
  public async get(currentProfileId: string) {
    const benefitsRecord = await this.getOrCreateBenefitsRecord(currentProfileId);
    return this.list(benefitsRecord.benefits);
  }

  private async getOrCreateBenefitsRecord(id: string): Promise<IBenefitsRecord> {
    let benefitsRecord = await this.collection.findOne<IBenefitsRecord>({ _id: id });
    if (!benefitsRecord) {
      benefitsRecord = {
        _id: id,
        benefits: [],
      };
      await this.writeBenefitsRecord(benefitsRecord);
    }
    return benefitsRecord;
  }

  private async writeBenefitsRecord(benefitsRecord: IBenefitsRecord) {
    await this.collection.insertOne(benefitsRecord);
  }

  //#endregion

}

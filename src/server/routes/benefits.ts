import { Router, routePrefix, route, HttpMethods, fromBody } from 'anux-exchange';
import { IBenefit } from '../../shared/models';
import { getDb } from '../database';

interface IBenefitsRecord {
  _id: string;
  benefits: IBenefit[];
}

interface IBenefitsPostRequest {
  currentProfileId: string;
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

  @route(HttpMethods.Post, '/')
  public async post(@fromBody { currentProfileId, benefits }: IBenefitsPostRequest) {
    const benefitsRecord = await this.getOrCreateBenefitsRecord(currentProfileId);
    benefitsRecord.benefits = benefits;
    await this.writeBenefitsRecord(benefitsRecord);
    return this.ok();
  }

  private async getOrCreateBenefitsRecord(id: string): Promise<IBenefitsRecord> {
    let benefitsRecord = await this.collection.findOne<IBenefitsRecord>({ _id: id });
    console.log(benefitsRecord);
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
    await this.collection.updateOne({ _id: benefitsRecord._id }, { $set: benefitsRecord }, { upsert: true });
  }

  //#endregion

}

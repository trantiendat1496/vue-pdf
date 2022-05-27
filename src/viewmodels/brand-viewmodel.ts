import { BrandCodeMasterModel, mockBrandCodeMasters } from '@/models/brand-code-master-model'
import { observable } from 'mobx'
export class BrandViewModel {
  @observable newsList: BrandCodeMasterModel[] = mockBrandCodeMasters
  constructor() {
    //
  }
}

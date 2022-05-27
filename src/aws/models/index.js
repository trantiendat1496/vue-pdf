// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Report, Portfolio, EsgScore, EsgTemplate, News, Governance, NriEvalMaster, EvalMaster, IndustryCodeMaster, BrandCodeMaster, Cg25rc, Cg31, Cg41, Cg51, Cg12, Cg211, Cg11, Cg21, Cg22d2, Cg22d1, Cg24ex, Position, Brand, Score, Correspond } = initSchema(schema);

export {
  Report,
  Portfolio,
  EsgScore,
  EsgTemplate,
  News,
  Governance,
  NriEvalMaster,
  EvalMaster,
  IndustryCodeMaster,
  BrandCodeMaster,
  Cg25rc,
  Cg31,
  Cg41,
  Cg51,
  Cg12,
  Cg211,
  Cg11,
  Cg21,
  Cg22d2,
  Cg22d1,
  Cg24ex,
  Position,
  Brand,
  Score,
  Correspond
};
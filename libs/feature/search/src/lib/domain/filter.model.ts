import { Geometry } from 'geojson'
import { FieldName } from './search.model'

type NumericComparisonOperator = '<' | '>' | '<=' | '>=' | '=' | '!='
type ComparisonOperator = NumericComparisonOperator

type Comparison = [ComparisonOperator, FieldName, string | number]
type AndOperation = ['and', ...FieldFilter[]]
type OrOperation = ['or', ...FieldFilter[]]
type NotOperation = ['not', FieldFilter]
type InOperation = ['in', FieldName, ...(string[] | number[])]
type LikeOperation = ['like', FieldName, string]
type IntersectOperation = ['intersect', FieldName, Geometry]

export type FieldFilter =
  | Comparison
  | AndOperation
  | OrOperation
  | NotOperation
  | InOperation
  | LikeOperation
  | IntersectOperation

const filters: FieldFilter = [
  'and',
  ['=', 'template', 'n'],
  ['=', 'any', 'scot'],
  ['=', 'format', 'application/pdf'],
  ['not', ['in', 'resourceType', 'service', 'map']],
]

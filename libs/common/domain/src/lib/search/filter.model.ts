import { FieldName } from './search.model'

type FieldFilterByValues = Record<string, boolean>
type FieldFilterByExpression = string | number
export type FieldFilter = FieldFilterByExpression | FieldFilterByValues
export type FieldFilters = Record<FieldName, FieldFilter>

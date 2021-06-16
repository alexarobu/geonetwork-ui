/**
 * GeoNetwork 4.0.3 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.0.3
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

export interface SettingApiModel {
  name?: string
  value?: string
  dataType?: SettingApiModel.DataTypeEnum
  position?: number
  internal?: boolean
  internal_JpaWorkaround?: string
}
export namespace SettingApiModel {
  export type DataTypeEnum = 'STRING' | 'INT' | 'BOOLEAN' | 'JSON'
  export const DataTypeEnum = {
    String: 'STRING' as DataTypeEnum,
    Int: 'INT' as DataTypeEnum,
    Boolean: 'BOOLEAN' as DataTypeEnum,
    Json: 'JSON' as DataTypeEnum,
  }
}

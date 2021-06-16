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
import { InfoReportApiModel } from './infoReport.api.model'
import { ReplaceReportApiModel } from './replaceReport.api.model'
import { ReportApiModel } from './report.api.model'

export interface MetadataReplacementProcessingReportApiModel {
  errors?: Array<ReportApiModel>
  infos?: Array<InfoReportApiModel>
  uuid?: string
  totalRecords?: number
  metadata?: Set<number>
  metadataErrors?: { [key: string]: Array<ReportApiModel> }
  metadataInfos?: { [key: string]: Array<InfoReportApiModel> }
  processId?: string
  metadataChanges?: { [key: string]: ReplaceReportApiModel }
  numberOfRecordsChanged?: number
  numberOfRecordsNotChanged?: number
  noProcessFoundCount?: number
  numberOfRecordNotFound?: number
  numberOfRecordsNotEditable?: number
  numberOfRecords?: number
  numberOfNullRecords?: number
  numberOfRecordsProcessed?: number
  numberOfRecordsWithErrors?: number
  running?: boolean
  startIsoDateTime?: string
  endIsoDateTime?: string
  ellapsedTimeInSeconds?: number
  totalTimeInSeconds?: number
  type?: string
}

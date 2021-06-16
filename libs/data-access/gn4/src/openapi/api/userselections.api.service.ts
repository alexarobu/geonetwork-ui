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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
} from '@angular/common/http'
import { CustomHttpParameterCodec } from '../encoder'
import { Observable } from 'rxjs'

import { SelectionApiModel } from '../model/models'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable({
  providedIn: 'root',
})
export class UserselectionsApiService {
  protected basePath = 'https://apps.titellus.net/geonetwork/srv/api'
  public defaultHeaders = new HttpHeaders()
  public configuration = new Configuration()
  public encoder: HttpParameterCodec

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath
      }
      this.configuration.basePath = basePath
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec()
  }

  private addToHttpParams(
    httpParams: HttpParams,
    value: any,
    key?: string
  ): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value)
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key)
    }
    return httpParams
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value?: any,
    key?: string
  ): HttpParams {
    if (value == null) {
      return httpParams
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        ;(value as any[]).forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        )
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            (value as Date).toISOString().substr(0, 10)
          )
        } else {
          throw Error('key may not be null if value is Date')
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        )
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value)
    } else {
      throw Error('key may not be null if value is not object or array')
    }
    return httpParams
  }

  /**
   * Add items to a user selection set
   * @param selectionIdentifier Selection identifier
   * @param userIdentifier User identifier
   * @param uuid One or more record UUIDs.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addToUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<string>
  public addToUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<string>>
  public addToUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<string>>
  public addToUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (selectionIdentifier === null || selectionIdentifier === undefined) {
      throw new Error(
        'Required parameter selectionIdentifier was null or undefined when calling addToUserSelection.'
      )
    }
    if (userIdentifier === null || userIdentifier === undefined) {
      throw new Error(
        'Required parameter userIdentifier was null or undefined when calling addToUserSelection.'
      )
    }

    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (uuid) {
      uuid.forEach((element) => {
        queryParameters = this.addToHttpParams(
          queryParameters,
          <any>element,
          'uuid'
        )
      })
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.put<string>(
      `${this.configuration.basePath}/userselections/${encodeURIComponent(
        String(selectionIdentifier)
      )}/${encodeURIComponent(String(userIdentifier))}`,
      null,
      {
        params: queryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Add a user selection set
   * @param selectionApiModel
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createPersistentSelectionType(
    selectionApiModel: SelectionApiModel,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<string>
  public createPersistentSelectionType(
    selectionApiModel: SelectionApiModel,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<string>>
  public createPersistentSelectionType(
    selectionApiModel: SelectionApiModel,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<string>>
  public createPersistentSelectionType(
    selectionApiModel: SelectionApiModel,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (selectionApiModel === null || selectionApiModel === undefined) {
      throw new Error(
        'Required parameter selectionApiModel was null or undefined when calling createPersistentSelectionType.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes)
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.put<string>(
      `${this.configuration.basePath}/userselections`,
      selectionApiModel,
      {
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Remove items to a user selection set
   * @param selectionIdentifier Selection identifier
   * @param userIdentifier User identifier
   * @param uuid One or more record UUIDs. If null, remove all.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteFromUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<string>
  public deleteFromUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<string>>
  public deleteFromUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<string>>
  public deleteFromUserSelection(
    selectionIdentifier: number,
    userIdentifier: number,
    uuid?: Array<string>,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (selectionIdentifier === null || selectionIdentifier === undefined) {
      throw new Error(
        'Required parameter selectionIdentifier was null or undefined when calling deleteFromUserSelection.'
      )
    }
    if (userIdentifier === null || userIdentifier === undefined) {
      throw new Error(
        'Required parameter userIdentifier was null or undefined when calling deleteFromUserSelection.'
      )
    }

    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (uuid) {
      uuid.forEach((element) => {
        queryParameters = this.addToHttpParams(
          queryParameters,
          <any>element,
          'uuid'
        )
      })
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.delete<string>(
      `${this.configuration.basePath}/userselections/${encodeURIComponent(
        String(selectionIdentifier)
      )}/${encodeURIComponent(String(userIdentifier))}`,
      {
        params: queryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Get list of user selection sets
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getSelectionList(
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<Array<SelectionApiModel>>
  public getSelectionList(
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<Array<SelectionApiModel>>>
  public getSelectionList(
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<Array<SelectionApiModel>>>
  public getSelectionList(
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.get<Array<SelectionApiModel>>(
      `${this.configuration.basePath}/userselections`,
      {
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Get record in a user selection set
   * @param selectionIdentifier Selection identifier
   * @param userIdentifier User identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getSelectionRecords(
    selectionIdentifier: number,
    userIdentifier: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<Array<string>>
  public getSelectionRecords(
    selectionIdentifier: number,
    userIdentifier: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<Array<string>>>
  public getSelectionRecords(
    selectionIdentifier: number,
    userIdentifier: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<Array<string>>>
  public getSelectionRecords(
    selectionIdentifier: number,
    userIdentifier: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (selectionIdentifier === null || selectionIdentifier === undefined) {
      throw new Error(
        'Required parameter selectionIdentifier was null or undefined when calling getSelectionRecords.'
      )
    }
    if (userIdentifier === null || userIdentifier === undefined) {
      throw new Error(
        'Required parameter userIdentifier was null or undefined when calling getSelectionRecords.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.get<Array<string>>(
      `${this.configuration.basePath}/userselections/${encodeURIComponent(
        String(selectionIdentifier)
      )}/${encodeURIComponent(String(userIdentifier))}`,
      {
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }
}

import { HttpClient } from '@angular/common/http'
import { ToolsApiService } from '@geonetwork-ui/data-access/gn4'
import { TranslateCompiler, TranslateLoader } from '@ngx-translate/core'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { Gn4TranslateLoader } from './gn4.translate.loader'
import { FileTranslateLoader } from './file.translate.loader'

export const DEFAULT_LANG = 'en'

export const LANG_3_TO_2_MAPPER = {
  eng: 'en',
  dut: 'nl',
  fre: 'fr',
  ger: 'de',
  kor: 'ko',
  spa: 'es',
  cze: 'cs',
  cat: 'ca',
  fin: 'fi',
  ice: 'is',
  ita: 'it',
  por: 'pt',
  rus: 'ru',
  chi: 'zh',
  slo: 'sk',
}

export const LANG_2_TO_3_MAPPER = Object.entries(LANG_3_TO_2_MAPPER).reduce(
  (mapperObject, langEntry) => {
    return { ...mapperObject, [langEntry[1]]: langEntry[0] }
  },
  {}
)

export function HttpLoaderFactory(http: HttpClient) {
  return new FileTranslateLoader(http, './assets/i18n/')
}
//Deprecated, but currently still used in datafeeder
export function getLangFromBrowser() {
  return navigator.language.substr(0, 2)
}
export const TRANSLATE_DEFAULT_CONFIG = {
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    defaultLanguage: DEFAULT_LANG,
    deps: [HttpClient],
  },
}

export const TRANSLATE_GEONETWORK_CONFIG = {
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
  loader: {
    provide: TranslateLoader,
    useClass: Gn4TranslateLoader,
    deps: [ToolsApiService],
  },
}

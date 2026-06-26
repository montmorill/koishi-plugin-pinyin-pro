/* eslint-disable ts/no-unsafe-declaration-merging */
import type { Context } from 'koishi'
import { Service } from 'koishi'
import pinyinPro from 'pinyin-pro'

declare module 'koishi' {
  interface Context {
    'pinyin-pro': PinyinProService
  }
}

class PinyinProService extends Service {
  name = 'pinyin-pro'

  constructor(ctx: Context) {
    super(ctx, 'pinyin-pro')
  }
}

Object.assign(PinyinProService.prototype, pinyinPro)

interface PinyinProService {
  getInitialAndFinal: typeof pinyinPro.getInitialAndFinal
  getFinalParts: typeof pinyinPro.getFinalParts
  getNumOfTone: typeof pinyinPro.getNumOfTone
  pinyin: typeof pinyinPro.pinyin
  customPinyin: typeof pinyinPro.customPinyin
  clearCustomDict: typeof pinyinPro.clearCustomDict
  addDict: typeof pinyinPro.addDict
  removeDict: typeof pinyinPro.removeDict
  match: typeof pinyinPro.match
  html: typeof pinyinPro.html
  polyphonic: typeof pinyinPro.polyphonic
  convert: typeof pinyinPro.convert
  segment: typeof pinyinPro.segment
  OutputFormat: typeof pinyinPro.OutputFormat
  addTraditionalDict: typeof pinyinPro.addTraditionalDict
  getTraditionalDict: typeof pinyinPro.getTraditionalDict
}

export default PinyinProService

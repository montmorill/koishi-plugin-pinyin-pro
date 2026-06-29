import type { Context } from 'koishi'
import { Service } from 'koishi'
import pinyinPro from 'pinyin-pro'

declare module 'koishi' {
  interface Context {
    'pinyin-pro': PinyinProService
  }
}

export default class PinyinProService extends Service {
  name = 'pinyin-pro'

  constructor(ctx: Context) {
    super(ctx, 'pinyin-pro')
  }

  getInitialAndFinal: typeof pinyinPro.getInitialAndFinal = pinyinPro.getInitialAndFinal
  getFinalParts = pinyinPro.getFinalParts
  getNumOfTone = pinyinPro.getNumOfTone
  pinyin = pinyinPro.pinyin
  customPinyin = pinyinPro.customPinyin
  clearCustomDict = pinyinPro.clearCustomDict
  addDict = pinyinPro.addDict
  removeDict = pinyinPro.removeDict
  match: typeof pinyinPro.match = pinyinPro.match
  html: typeof pinyinPro.html = pinyinPro.html
  polyphonic = pinyinPro.polyphonic
  convert = pinyinPro.convert
  segment = pinyinPro.segment
  OutputFormat = pinyinPro.OutputFormat
  addTraditionalDict = pinyinPro.addTraditionalDict
  getTraditionalDict = pinyinPro.getTraditionalDict
}

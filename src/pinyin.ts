import type { Context } from 'koishi'
import type { Pinyin, PinyinConvertOptions } from 'koishi-plugin-pinyin'
import type { Buffer } from 'node:buffer'
import { Service } from 'koishi'
import { PINYIN_STYLE } from 'koishi-plugin-pinyin'
import { pinyin } from 'pinyin-pro'

const styleMap: Record<
  NonNullable<PinyinConvertOptions['style']>,
  Partial<Parameters<typeof pinyin>[1]>
> = {
  [PINYIN_STYLE.Plain]: { toneType: 'none' },
  [PINYIN_STYLE.WithTone]: { toneType: 'symbol' },
  [PINYIN_STYLE.WithToneNum]: { toneType: 'num' }, // TODO: support this
  [PINYIN_STYLE.WithToneNumEnd]: { toneType: 'num' },
  [PINYIN_STYLE.FirstLetter]: { pattern: 'first' },
}

export default class PinyinService extends Service implements Omit<Pinyin, 'getNativeBinding'> {
  constructor(ctx: Context) {
    super(ctx, 'pinyin')
  }

  async start(): Promise<void> {}
  async asyncPinyin(input: string | Buffer, opt?: PinyinConvertOptions | null) {
    return this.pinyin(input, opt)
  }

  pinyin<T extends PinyinConvertOptions>(
    input: string | Buffer,
    opt?: T | null,
  ): T extends { heteronym: true } ? string[][] : string[] {
    const word = typeof input === 'string' ? input : input.toString()
    const array = pinyin(word, {
      type: 'all',
      ...styleMap[opt?.style || PINYIN_STYLE.Plain],
      segmentit: opt?.segment ? 2 : 1,
    })
    if (opt?.heteronym)
      return array.map(data => data.pinyin) as any
    return array.map(data => data.polyphonic) as any
  }

  compare(inputA: string, inputB: string) {
    const aPinyin = pinyin(inputA, { toneType: 'num', separator: '' })
    const bPinyin = pinyin(inputB, { toneType: 'num', separator: '' })
    return aPinyin.localeCompare(bPinyin)
  }
}

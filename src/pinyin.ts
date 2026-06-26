import type { Context } from 'koishi'
import type { Pinyin, PinyinConvertOptions } from 'koishi-plugin-pinyin'
import type { Buffer } from 'node:buffer'
import { Schema, Service } from 'koishi'
import { PINYIN_STYLE } from 'koishi-plugin-pinyin'
import { pinyin } from 'pinyin-pro'

const segmentStrategies = ['reverse-max-match', 'max-probability', 'min-tokenization']
function strategyToEnum(strategy: typeof segmentStrategies[number]) {
  return segmentStrategies.indexOf(strategy) + 1
}

export interface Config {
  segmentit: {
    enabled: typeof segmentStrategies[number]
    disabled: typeof segmentStrategies[number]
  }
}

export const Config: Schema<Config> = Schema.object({
  segmentit: Schema.object({
    enabled: Schema.union(segmentStrategies).default('max-probability').description('启用 segment 参数时使用的分词算法。'),
    disabled: Schema.union(segmentStrategies).default('reverse-max-match').description('禁用 segment 参数时使用的分词算法。'),
  }).description('分词算法'),
})

const styleMap: Record<
  NonNullable<PinyinConvertOptions['style']>,
  Partial<Parameters<typeof pinyin>[1]>
> = {
  0: { toneType: 'none' },
  1: { toneType: 'symbol' },
  2: { toneType: 'num' }, // TODO: support PINYIN_STYLE.WithToneNum
  3: { toneType: 'num' },
  4: { pattern: 'first' },
}

export default class PinyinService extends Service<Config>
  implements Omit<Pinyin, 'getNativeBinding' | 'config'> {
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
      segmentit: opt?.segment
        ? strategyToEnum(this.config.segmentit.enabled)
        : strategyToEnum(this.config.segmentit.disabled),
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

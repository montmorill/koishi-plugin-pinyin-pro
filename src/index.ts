import type { Context } from 'koishi'
import type { Config } from './pinyin'
import PinyinService from './pinyin'
import PinyinProService from './pinyin-pro'

export { Config } from './pinyin'

export const name = 'pinyin-pro'
export {} from './pinyin-pro'
export { OutputFormat } from 'pinyin-pro'

export function apply(ctx: Context, config: Config) {
  ctx.plugin(PinyinService, config)
  ctx.plugin(PinyinProService)
}

import type { Context } from 'koishi'
import PinyinService from './pinyin'
import PinyinProService from './pinyin-pro'

export const name = 'pinyin-pro'
export { Config } from './pinyin'

export function apply(ctx: Context) {
  ctx.plugin(PinyinProService)
  ctx.plugin(PinyinService)
}

import type { Context } from 'koishi'
import PinyinService from './pinyin'
import PinyinProService from './pinyin-pro'

export const name = 'pinyin-pro'
export { Config } from './pinyin'

declare module 'koishi' {
  interface Context {
    'pinyin-pro': PinyinProService
  }
}

export function apply(ctx: Context) {
  ctx.plugin(PinyinService)
  ctx.plugin(PinyinProService)
}

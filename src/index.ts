import { Context, Service } from 'koishi'
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

export default Object.assign(PinyinProService.prototype, pinyinPro)

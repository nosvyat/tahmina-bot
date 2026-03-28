const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const WEB_APP_URL = 'https://example.com' // потом заменим

bot.start((ctx) => {
  ctx.reply(
    `💫 Добро пожаловать во Вселенную Тахмины

Это пространство создано только для тебя ✨
Здесь тебя ждут сюрпризы и немного магии 💖`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('💫 Открыть Вселенную', WEB_APP_URL)],
      [Markup.button.callback('🎁 Сюрприз', 'surprise')],
      [Markup.button.callback('💌 Письмо', 'letter')],
    ])
  )
})

bot.action('surprise', (ctx) => {
  ctx.editMessageText(
    `🎁 Сюрприз

С днём рождения, Тахмина 💫
Пусть этот день будет наполнен счастьем и теплом ✨`,
    Markup.inlineKeyboard([
      [Markup.button.callback('⬅️ Назад', 'back')]
    ])
  )
})

bot.action('letter', (ctx) => {
  ctx.editMessageText(
    `💌 Письмо для тебя

Ты особенная 💫  
Пусть всё, о чём ты мечтаешь, обязательно сбудется ✨`,
    Markup.inlineKeyboard([
      [Markup.button.callback('⬅️ Назад', 'back')]
    ])
  )
})

bot.action('back', (ctx) => {
  ctx.editMessageText(
    `💫 Добро пожаловать во Вселенную Тахмины

Выбери, с чего хочешь начать ✨`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('💫 Открыть Вселенную', WEB_APP_URL)],
      [Markup.button.callback('🎁 Сюрприз', 'surprise')],
      [Markup.button.callback('💌 Письмо', 'letter')],
    ])
  )
})

bot.launch()
console.log('Бот запущен 🚀')

const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const WEB_APP_URL = 'https://tahmina-app-production.up.railway.app';
const SURPRISE_URL = 'https://ruletka-tahmina-production.up.railway.app';

function getMainKeyboard() {
  return Markup.keyboard([
    [Markup.button.webApp('💫 Открыть Вселенную', WEB_APP_URL)],
    [Markup.button.webApp('🎁 Открыть сюрприз', SURPRISE_URL)],
    ['💌 Письмо'],
  ]).resize();
}

bot.start(async (ctx) => {
  await ctx.reply(
    `💫 Добро пожаловать во Вселенную Тахмины

Это пространство создано только для тебя ✨
Здесь тебя ждут сюрпризы и немного магии 💖

Нажми «Открыть Вселенную», чтобы перейти в мини-приложение.`,
    getMainKeyboard()
  );
});

bot.hears('💌 Письмо', async (ctx) => {
  await ctx.reply(
    `💌 Письмо для тебя

Ты особенная 💫
Пусть всё, о чём ты мечтаешь, обязательно сбудется.
Пусть рядом будут тепло, забота и любовь ✨`,
    Markup.inlineKeyboard([
      [Markup.button.callback('⬅️ Назад', 'back_to_main')],
    ])
  );
});

bot.action('back_to_main', async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.reply(
    `💫 Добро пожаловать во Вселенную Тахмины

Выбери, с чего хочешь начать ✨`,
    getMainKeyboard()
  );
});

bot.launch();
console.log('Бот запущен 🚀');

// Корректное завершение
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

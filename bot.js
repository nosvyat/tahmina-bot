const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const WEB_APP_URL = 'https://tahmina-app-production.up.railway.app';
const SURPRISE_URL = 'https://ruletka-tahmina-production.up.railway.app';

// Храним последнее сообщение бота для каждого чата
const lastBotMessages = new Map();

function getMainKeyboard() {
  return Markup.keyboard([
    [Markup.button.webApp('💫 Что тебя радует?', WEB_APP_URL)],
    [Markup.button.webApp('🎁 Открыть сюрприз', SURPRISE_URL)],
  ]).resize();
}

// Удалить предыдущее сообщение бота в чате
async function deleteLastBotMessage(ctx) {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const lastMessageId = lastBotMessages.get(chatId);
  if (!lastMessageId) return;

  try {
    await ctx.telegram.deleteMessage(chatId, lastMessageId);
  } catch (error) {
    // Если сообщение уже удалено или удалить нельзя — просто игнорируем
    console.log('Не удалось удалить предыдущее сообщение:', error.description || error.message);
  }
}

// Отправить новое сообщение и сохранить его ID
async function sendSingleMessage(ctx, text, extra = {}) {
  await deleteLastBotMessage(ctx);

  const sentMessage = await ctx.reply(text, extra);

  if (ctx.chat?.id && sentMessage?.message_id) {
    lastBotMessages.set(ctx.chat.id, sentMessage.message_id);
  }

  return sentMessage;
}

bot.start(async (ctx) => {
  // По желанию: удаляем сообщение пользователя "/start"
  try {
    await ctx.deleteMessage();
  } catch (error) {
    console.log('Не удалось удалить сообщение пользователя:', error.description || error.message);
  }

  await sendSingleMessage(
    ctx,
    `💫 Добро пожаловать во Вселенную Тахмины

Это пространство создано только для тебя ✨
Здесь тебя ждут сюрпризы и немного магии 💖

Нажми кнопку ниже, чтобы открыть свою Вселенную.`,
    getMainKeyboard()
  );
});

// Если хочешь, можно добавить обработку текста,
// чтобы бот не спамил и всегда заменял прошлое сообщение
bot.on('text', async (ctx, next) => {
  // Игнорируем /start, потому что он уже обработан выше
  if (ctx.message.text === '/start') return;

  // Если вдруг пользователь пишет руками что-то лишнее,
  // можно просто удалить его сообщение
  try {
    await ctx.deleteMessage();
  } catch (error) {
    console.log('Не удалось удалить сообщение пользователя:', error.description || error.message);
  }

  return next();
});

bot.launch();
console.log('Бот запущен 🚀');

// Корректное завершение
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

import Chat from './chat';
let Chats = [];

export const Bot = (body) => {
  const { message: { from: { id } } } = body;
  const isAlreadyTalking = Chats.length > 0 ? Chats.findIndex(chat => chat.userId === id) : -1;
  if (isAlreadyTalking > -1) {
    Chats[isAlreadyTalking].talk();
    return {}
  }
  const NewChat = new Chat(body);
  Chats = [...Chats, NewChat];
  return {}
}
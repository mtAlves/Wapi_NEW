import injectStore from './Store'
import base64ToFile from './utils/base64_to_file'

export default () => {
  if (!window.Store) injectStore()

  if (!window.WAPI) {
    window.WAPI = {
      getAllChats: function () {
        const chats = window.Store.Chat.models
        if (chats.length)
          chats.map(function (chat) {
            chat.sendMessage = chat.sendMessage
              ? chat.sendMessage
              : function () {
                  return window.Store.sendMessage.apply(this, arguments)
                }
          })
        return chats
      },

      getAllChatsWithUnread: () =>
        window.WAPI.getAllChats().filter((chat) => chat.unreadCount > 0),

      getChatByName: (chatName) =>
        window.WAPI.getAllChats().find(
          (chat) => chat.formattedTitle === chatName || chat.name === chatName
        ),

      getChatById: (chatId) =>
        window.WAPI.getAllChats().find(
          (chat) => chat.id._serialized === chatId
        ),

      getGroupChats: () =>
        window.WAPI.getAllChats().filter((chat) => chat.isGroup),

      getGroupParticipantIDs: (groupId) =>
        window.Store.GroupMetadata.models
          .find((group) => group.id._serialized === groupId)
          .participants.map((group) => group.id._serialized),

      getCommonGroups: (contactId) =>
        window.Store.GroupMetadata.models.filter((group) =>
          group.participants.models.find(
            (participant) => participant.id._serialized === contactId
          )
        ),

      getUnreadMessages: () =>
        window.Store.Msg.models.filter(
          (msg) => msg.isNewMsg && !msg.isSentByMe && msg.from.user !== 'status'
        ),

      getMessage: (messageId) =>
        window.Store.Msg.models.find(
          (message) => message.id._serialized === messageId
        ),

      getProfilePicFromId: (contactId) =>
        window.Store.ProfilePicThumb.models.find(
          (profile) => profile.id._serialized === contactId
        ),

      getMe: () => window.Store.Conn.me,

      getContactByName: (contactName: string) =>
        window.Store.Contact.models.find(
          (contact) =>
            contact.name === contactName ||
            contact.formattedName === contactName
        ),

      getContactById: (contactId: string) =>
        window.Store.Contact.models.find(
          (contact) => contact.id._serialized === contactId
        ),

      getMyContacts: () =>
        window.Store.Contact.models.filter((contact) => contact.isMyContact),

      getContactsBlocked: () =>
        window.Store.Contact.models.filter(
          (contact) => contact.isContactBlocked
        ),

      getBroadcasts: () =>
        window.Store.Contact.models.filter((contact) => contact.isBroadcast),

      createGroup: (groupName, contactsId) =>
        window.Store.WapQuery.createGroup(groupName, contactsId),

      replyMessage: (messageId, text) => {
        const message = window.WAPI.getMessage(messageId)
        if (message) {
          const chat = window.WAPI.getChatById(message.chat.id._serialized)
          if (chat) {
            const params = {
              linkPreview: null,
              mentionedJidList: null,
              quotedMsg: message,
              quotedMsgAdminGroupJid: null,
            }
            chat.sendMessage(text, params, message)

            return true
          }
        }
        return false
      },

      sendVCardMessage: (sendToContactId, vCardContactId) => {
        const chat = window.WAPI.getChatById(sendToContactId)
        const contact = window.WAPI.getContactById(vCardContactId)

        if (!chat || !contact) return false

        chat.sendContact(contact)
        return true
      },

      sendTextMessage: (contactId, text) => {
        const chat = window.WAPI.getChatById(contactId)
        if (chat) {
          chat.sendMessage(text)
          return true
        }
        return false
      },

      sendTextMessageWithThumb: (contactId, thumbConfig) => {
        const chat = window.WAPI.getChatById(contactId)
        if (chat) {
          const linkPreview = {
            canonicalUrl: thumbConfig.url,
            description: thumbConfig.description,
            matchedText: thumbConfig.url,
            title: thumbConfig.title,
            thumbnail: thumbConfig.thumbnail,
          }
          chat.sendMessage(thumbConfig.text, {
            linkPreview,
            mentionedJidList: [],
            quotedMsg: null,
            quotedMsgAdminGroupJid: null,
          })
          return true
        }
        return false
      },

      sendMediaMessage: async (contactId, mediaConfig) => {
        const chat = window.WAPI.getChatById(contactId)
        if (!chat) return false

        try {
          const file = base64ToFile(mediaConfig.base64Media, {
            name: mediaConfig.fileName,
            type: mediaConfig.mimeType,
          })
          const mediaCollection = new window.Store.MediaCollection(chat)

          await mediaCollection.processAttachments([{ file }], 1, chat, 1)
          const media = mediaCollection.models[0]
          media.sendToChat(chat, { caption: mediaConfig.caption })

          return true
        } catch (err) {
          console.log(err)
          return false
        }
      },

      newMessageListener: (fn) => window.Store.Msg.on('add', fn),
    }
  }
}

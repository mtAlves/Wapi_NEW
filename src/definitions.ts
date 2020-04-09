import injectWAPI from './Wapi'

declare global {
  interface Window {
    Store: any
    webpackJsonp: any
    WAPI: {
      getAllChats: () => Chat[]
      getAllChatsWithUnread: () => Chat[]
      getChatByName: (chatName: string) => Chat | undefined
      getChatById: (chatId: string) => Chat | undefined
      getGroupChats: () => Chat[]
      getGroupParticipantIDs: (groupId: string) => string[]
      getCommonGroups: (contactId: string) => Group[]
      getUnreadMessages: () => Message[]
      getMessage: (messageId: string) => Message | undefined
      getProfilePicFromId: (contactId: string) => string
      getMe: () => Id
      getContactByName: (contactName: string) => Contact | undefined
      getContactById: (contactId: string) => Contact | undefined
      getMyContacts: () => Contact[]
      getContactsBlocked: () => Contact[]
      getBroadcasts: () => Contact[]
      createGroup: (groupName: string, contactsId: string[]) => boolean
      replyMessage: (messageId: string, message: string) => boolean
      sendVCardMessage: (
        sendToContactId: string,
        vCardContactId: string
      ) => boolean
      sendTextMessage: (contactId: string, text: string) => boolean
      sendTextMessageWithThumb: (
        contactId: string,
        thumbConfig: ThumbnailConfig
      ) => boolean
      sendMediaMessage: (
        contactId: string,
        mediaConfig: MediaConfig
      ) => Promise<boolean>
      newMessageListener: (fn: (message: Message) => any) => void
    }
  }
}

interface ThumbnailConfig {
  url: string
  title: string
  thumbnail: string
  description: string
  text: string
}

interface MediaConfig {
  fileName: string
  mimeType: string
  base64Media: string
  caption?: string
}

interface Contact {
  businessCatalog: any
  businessProfile: any
  commonGroups: any
  displayName: string
  formattedName: string
  formattedShortName: string
  formattedShortNameWithNonBreakingSpaces: string
  formattedUser: string
  header: string
  id: Id
  isBroadcast: boolean
  isBusiness: boolean
  isContactBlocked: boolean
  isEnterprise: boolean
  isGroup: boolean
  isMe: boolean
  isMyContact: boolean
  isPSA: boolean
  isState: boolean
  isUser: boolean
  isWAContact: boolean
  labels: any[]
  liveLocations: any
  locale: any
  mentionName: string
  name: string
  notifyName: string
  pendingAction: number
  profilePicThumb: {
    eurl: string
    id: Id
    img: string
    imgFull: string
    raw: any
    tag: string
  }
  promises: Object
  pushname: 'Emily Bueno'
  searchName: string
  searchVerifiedName: null
  sectionHeader: any
  shortName: string
  showBusinessCheckmark: false
  showBusinessVname: false
  stale: any
  status: any
  statusMute: boolean
  type: string
  userhash: string
  userid: string
  verificationBinary: any
  verificationString: any
  verifiedLevel: any
  verifiedName: any
  _notifyName: any
}

interface Chat {
  ackedProps: any
  active: boolean
  archive: any
  attributes: any
  canSend: boolean
  canUnread: boolean
  changeNumberNewJid: any
  changeNumberOldJid: any
  colors: any
  composeAttachMediaContents: any
  composeContents: any
  composeQuotedMsg: any
  composeQuotedMsgRemoteJid: any
  contact: Contact
  createdLocally: boolean
  disableUnreadAnchor: any
  docCount: number
  ephemeralDuration: any
  ephemeralSettingTimestamp: any
  formattedTitle: 'Negona'
  ftsCache: Object
  groupMetadata?: GroupMetadata
  hasUnread: boolean
  id: Id
  isAnnounceGrpRestrict: any
  isBroadcast: boolean
  isGroup: boolean
  isPSA: boolean
  isReadOnly: any
  isState: boolean
  isUser: boolean
  kind: string
  labels: any
  lastReceivedKey?: ReceivedKey
  linkCount: number
  liveLocation: any
  liveLocationQueried: boolean
  markedUnread: boolean
  mediaCount: number
  modifyTag: any
  msgChunks: any
  msgUnsyncedButtonReplyMsgs: any
  msgsChanged: number
  msgsLength: number
  mute: any
  muteExpiration: number
  name?: string
  notSpam: boolean
  optimisticUnreadCount: number
  pausedTimerId: any
  pendingAction: number
  pendingMsgs: any
  pendingSeenCount: number
  pin: any
  presence: any
  presenceResendTimerId: any
  previewMessage: any
  productCount: number
  promises: any
  quotedMsgAdminGroupJid: any
  recording: boolean
  shouldAppearInList: boolean
  shouldShowUnreadDivider: boolean
  shouldShowUnreadInTitle: boolean
  showChangeNumberNotification: boolean
  squelch: any
  stale: any
  t: number
  trusted: boolean
  typing: boolean
  unreadCount: number
  unreadMsgAnchor: any
  vcardDismissed: boolean
  sendMessage: (text: string, params?: any, message?: Message) => any
  sendContact: (contact: Contact) => any
}

interface ProfilePicThumb {
  eurl: string | null
  eurlStale: boolean
  fallbackType: string
  id: Id
  img?: string
  imgFull?: string
  isState: boolean
  pendingPic: any
  raw: any
  stale: boolean
  tag: string | null
}

interface Group {
  participants: {
    models: {
      contact: Contact
      id: Id
    }[]
  }
  announce: any
  attributes: any
  creation: number
  desc: any
  descId: any
  descOwner: any
  descTime: any
  ephemeralDuration: any
  groupInviteCodePromise: any
  groupInviteLink: null
  id: Id
  inviteCode: any
  isState: true
  noFrequentlyForwarded: any
  owner: Id
  restrict: any
  revokeGroupInvitePromise: any
  revokeGroupV4AddInvitePromise: any
  size: any
  stale: false
  trusted: true
}

interface GroupMetadata {
  announce: any
  creation: number
  desc?: string
  descId?: string
  descOwner?: Id
  descTime?: number
  ephemeralDuration: any
  id: Id
  noFrequentlyForwarded: any
  owner: {
    server: string
    user: string
    _serialized: string
  }
  participants: GroupParticipant[]
  pendingParticipants: any[]
  restrict: boolean
  size: any
}

interface GroupParticipant {
  id: Id
  isAdmin: boolean
  isSuperAdmin: boolean
}

interface ReceivedKey {
  fromMe: boolean
  id: string
  remote: Id
  _serialized: string
}

interface Presence {
  chatstates: any[]
  id: Id
}

interface Id {
  server: string
  user: string
  _serialized: string
}

interface NewChatId {
  fromMe: true
  id: string
  remote: string
  _serialized: string
}

interface Message {
  accuracy: any
  ack: number
  author: Id
  backgroundColor: any
  body: string
  broadcast: boolean
  businessOwnerJid: any
  buttons: any
  canonicalUrl: any
  caption: any
  chat: Chat
  chatId: Id
  clearMedia: any
  clientUrl?: string
  comment: any
  content: string
  currencyCode: any
  degrees: any
  description: any
  devicesAdded: any
  devicesRemoved: any
  directPath?: string
  doNotPlayInline: undefined
  duration?: string
  ephemeralDuration: any
  ephemeralSettingTimestamp: any
  ephemeralStartTimestamp?: number
  filehash?: string
  filename?: string
  finalAccuracy: any
  finalDegrees: any
  finalLat: any
  finalLng: any
  finalSpeed: any
  finalThumbnail: any
  finalTimeOffset: any
  firstFrameLength: any
  firstFrameSidecar: any
  font: any
  footer: any
  forwardingScore: number
  from: Id
  gifAttribution?: number
  height?: number
  historySyncMetaData: any
  id: {
    fromMe: boolean
    id: string
    remote: Id
    _serialized: string
  }
  interactiveAnnotations: any[]
  invis: boolean
  inviteCode: any
  inviteCodeExp: any
  inviteGrp: any
  inviteGrpJpegThum: any
  inviteGrpName: any
  isAnimated: any
  isForwarded: boolean
  isGif?: boolean
  isGroupMsg: boolean
  isLink: any
  isLive: any
  isMMS: boolean
  isMedia: boolean
  isNewMsg: any
  isNotification: false
  isPSA: false
  labels: []
  lat?: number
  lng?: number
  loc?: string
  matchedText: any
  mediaData: {} | MediaData
  mediaKey?: string
  mediaKeyTimestamp?: number
  mentionedJidList: any[]
  mimetype?: string
  multicast: any
  notifyName?: string
  pageCount?: number
  paymentAmount1000: any
  paymentCurrency: any
  paymentExpiryTimestamp: any
  paymentMessageReceiverJid: any
  paymentNoteMsg: any
  paymentRequestMessageKey: any
  paymentStatus: any
  paymentTransactionTimestamp: any
  priceAmount1000: any
  productId: any
  productImageCount: any
  protocolMessageKey: any
  quotedMsg?: { type: string; body: string }
  quotedMsgObj?: Message
  quotedParticipant?: Id
  quotedRemoteJid: undefined
  quotedStanzaID?: string
  recipients: any
  recvFresh?: boolean
  retailerId: undefined
  richPreviewType?: number
  selectedId: any
  selectedIndex: any
  self: string
  sender: Id
  sequence: any
  shareDuration: any
  size?: number
  speed: any
  star: boolean
  streamable: any
  streamingSidecar: any
  subtype: any
  t: number
  templateParams: any
  textColor: any
  thumbnail: any
  timestamp: number
  title: any
  to: Id
  type: string
  uploadhash?: string
  url: any
  urlNumber: any
  urlText: any
  vcardList: any
  width?: number
}

interface MediaData {
  animatedAsNewMsg: boolean
  animationDuration: number
  aspectRatio: number
  directPath: any
  documentPreview: any
  duration?: string
  durationFloat?: number
  filehash: string
  filename?: string
  firstFrameLength: any
  firstFrameSidecar: any
  fullHeight: number
  fullWidth: number
  gifAttribution?: number
  isAnimated?: boolean
  isGif?: boolean
  mediaBlob: null | MediaBlob
  mediaKey: any
  mediaKeyTimestamp: any
  mediaStage: string
  mimetype: string
  mmsUrl: any
  pageCount?: number
  preview?: MediaBlob
  renderableUrl?: string
  rgbaBuffer: any
  rgbaHeight: any
  rgbaWidth: any
  sidecar?: ArrayBuffer
  size: number
  subtype: any
  type: string
  uploadHash: any
  _listeningToSwSupport: boolean
  _swStreamingSupported: boolean
}

interface MediaBlob {
  released: boolean
  _b64: any
  _blob: Blob
  _inAutoreleasePool: boolean
  _mimetype: string
  _released: any
  _retainCount: number
  _url: string
}

interface NumberStatus {
  canReceiveMessage: boolean
  id: Id
  isBusiness: boolean
  status: number
}

interface CreateGroup {
  _value: {
    gid: Id
    participants: {
      [contactId: string]: {
        code: string
      }
    }[]
    status: number
  }
}

export = injectWAPI

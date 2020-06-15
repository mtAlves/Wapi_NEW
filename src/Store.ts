const getStore = (modules) => {
  let foundCount = 0
  const neededObjects = [
    {
      id: 'Store',
      conditions: (module) =>
        module.default && module.default.Chat && module.default.Msg
          ? module.default
          : null,
      foundedModule: null,
    },
    {
      id: 'MediaCollection',
      conditions: (module) =>
        module.default &&
        module.default.prototype &&
        module.default.prototype.processAttachments
          ? module.default
          : null,
      foundedModule: null,
    },
    {
      id: 'MediaProcess',
      conditions: (module) => (module.BLOB ? module : null),
      foundedModule: null,
    },
    {
      id: 'Wap',
      conditions: (module) => (module.createGroup ? module : null),
      foundedModule: null,
    },
    {
      id: 'ServiceWorker',
      conditions: (module) =>
        module.default && module.default.killServiceWorker ? module : null,
      foundedModule: null,
    },
    {
      id: 'State',
      conditions: (module) => (module.STATE && module.STREAM ? module : null),
      foundedModule: null,
    },
    {
      id: 'WapDelete',
      conditions: (module) =>
        module.sendConversationDelete &&
        module.sendConversationDelete.length === 2
          ? module
          : null,
      foundedModule: null,
    },
    {
      id: 'Conn',
      conditions: (module) =>
        module.default && module.default.ref && module.default.refTTL
          ? module.default
          : null,
      foundedModule: null,
    },
    {
      id: 'WapQuery',
      conditions: (module) =>
        module.queryExist
          ? module
          : module.default && module.default.queryExist
          ? module.default
          : null,
      foundedModule: null,
    },
    {
      id: 'CryptoLib',
      conditions: (module) => (module.decryptE2EMedia ? module : null),
      foundedModule: null,
    },
    {
      id: 'OpenChat',
      conditions: (module) =>
        module.default &&
        module.default.prototype &&
        module.default.prototype.openChat
          ? module.default
          : null,
      foundedModule: null,
    },
    {
      id: 'UserConstructor',
      conditions: (module) =>
        module.default &&
        module.default.prototype &&
        module.default.prototype.isServer &&
        module.default.prototype.isUser
          ? module.default
          : null,
      foundedModule: null,
    },
    {
      id: 'SendTextMsgToChat',
      conditions: (module) =>
        module.sendTextMsgToChat ? module.sendTextMsgToChat : null,
      foundedModule: null,
    },
    {
      id: 'SendSeen',
      conditions: (module) => (module.sendSeen ? module.sendSeen : null),
      foundedModule: null,
    },
    {
      id: 'sendDelete',
      conditions: (module) => (module.sendDelete ? module.sendDelete : null),
      foundedModule: null,
    },
  ]
  for (const idx in modules) {
    if (typeof modules[idx] === 'object' && modules[idx] !== null) {
      const first = <any>Object.values(modules[idx])[0]
      if (typeof first === 'object' && first.exports) {
        for (const idx2 in modules[idx]) {
          const module = modules(idx2)
          if (!module) {
            continue
          }
          neededObjects.forEach((needObj) => {
            if (!needObj.conditions || needObj.foundedModule) return
            const neededModule = needObj.conditions(module)
            if (neededModule !== null) {
              foundCount++
              needObj.foundedModule = neededModule
            }
          })
          if (foundCount === neededObjects.length) {
            break
          }
        }

        const neededStore = neededObjects.find(
          (needObj) => needObj.id === 'Store'
        )
        if (neededStore) {
          window.Store = neededStore.foundedModule
            ? neededStore.foundedModule
            : {}
          neededObjects.splice(neededObjects.indexOf(neededStore), 1)
          neededObjects.forEach((needObj) => {
            if (needObj.foundedModule) {
              window.Store[needObj.id] = needObj.foundedModule
            }
          })
        }

        window.Store.sendMessage = function (e) {
          return window.Store.SendTextMsgToChat(this, ...arguments)
        }
        return window.Store
      }
    }
  }
}

export default () => {
  // webpackJsonp([], { 'parasite': (x, y, z) => getStore(z) }, ['parasite']);
  /*
        Code update thanks to
        topkek,bobaoapae, TinsWeb, KopeK, Bruno, Bento
        compatibility for old versions thanks felippeefreire
        */
  if (typeof window.webpackJsonp === 'function') {
    window.webpackJsonp([], { parasite: (x, y, z) => getStore(z) }, [
      'parasite',
    ])
  } else {
    window.webpackJsonp.push([
      ['parasite'],
      {
        parasite: function (o, e, t) {
          getStore(t)
        },
      },
      [['parasite']],
    ])
  }
}

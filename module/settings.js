/* global game */

export const registerModuleSettings = async function () {
  game.settings.register('dcc-core-book', 'registerCriticalHits', {
    name: 'DCC.CoreBook.Settings.RegisterCriticalHits',
    hint: 'DCC.CoreBook.Settings.RegisterCriticalHitsHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean
  })

  game.settings.register('dcc-core-book', 'registerFumbleTable', {
    name: 'DCC.CoreBook.Settings.RegisterFumbleTable',
    hint: 'DCC.CoreBook.Settings.RegisterFumbleTableHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean
  })

  game.settings.register('dcc-core-book', 'registerDisapproval', {
    name: 'DCC.CoreBook.Settings.RegisterDisapproval',
    hint: 'DCC.CoreBook.Settings.RegisterDisapprovalHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean
  })

  game.settings.register('dcc-core-book', 'registerMercurialMagicTable', {
    name: 'DCC.CoreBook.Settings.RegisterMercurialMagicTable',
    hint: 'DCC.CoreBook.Settings.RegisterMercurialMagicTableHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean
  })

  game.settings.register('dcc-core-book', 'showWelcomeDialog', {
    name: 'DCC.CoreBook.Settings.ShowWelcomeDialog',
    hint: 'DCC.CoreBook.Settings.ShowWelcomeDialogHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean
  })
}

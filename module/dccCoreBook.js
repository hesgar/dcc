/* global game, Hooks, TextEditor, Handlebars */

import { registerModuleSettings } from './settings.js'
import WelcomeDialog from './welcomeDialog.js'
import ContentImporter from './contentImporter.js'

Hooks.once('ready', async function () {
  // Register module settings
  await registerModuleSettings()

  // Handlebars helper to enrich HTML
  await Handlebars.registerHelper('dccCoreBookLocalizeAndEnrich', function (object) {
    return TextEditor.enrichHTML(game.i18n.localize(object))
  })

  // Load indexes for all of our packs so links work correctly
  for (const pack of game.packs.entries) {
    if (pack.metadata.package === 'dcc-core-book') {
      await pack.getIndex()
      console.log(`Loaded index for ${pack.metadata.name}.`)
    }
  }

  // Show welcome dialog if enabled
  if (game.user.isGM && game.settings.get('dcc-core-book', 'showWelcomeDialog')) {
    new WelcomeDialog({
      importContentHook: _importContent
    }).render(true)
  }
})

Hooks.once('dcc.ready', async function () {
  // Register our packs if enabled
  if (game.settings.get('dcc-core-book', 'registerCriticalHits')) {
    Hooks.callAll('dcc.registerCriticalHitsPack', 'dcc-core-book.dcc-core-crits-and-fumbles')
  }

  if (game.settings.get('dcc-core-book', 'registerFumbleTable')) {
    Hooks.callAll('dcc.setFumbleTable', 'dcc-core-book.dcc-core-crits-and-fumbles.Table 4-2: Fumbles')
  }

  if (game.settings.get('dcc-core-book', 'registerDisapproval')) {
    Hooks.callAll('dcc.registerDisapprovalPack', 'dcc-core-book.dcc-core-disapproval')
  }

  if (game.settings.get('dcc-core-book', 'registerMercurialMagicTable')) {
    Hooks.callAll('dcc.setMercurialMagicTable', 'dcc-core-book.dcc-core-tables.Table 5-2: Mercurial Magic')
  }
})

async function _importContent () {
  // Create and render a content importer with our content and default settings
  new ContentImporter({
    content: {
      Actors: {
        'dcc-core-book.dcc-core-creatures': true,
        'dcc-core-book.dcc-core-men-and-magicians': true
      },
      Items: {
        'dcc-core-book.dcc-core-armor': true,
        'dcc-core-book.dcc-core-ammunition': true,
        'dcc-core-book.dcc-core-equipment': true,
        'dcc-core-book.dcc-core-mounts': true,
        'dcc-core-book.dcc-core-weapons': true,
        'dcc-core-book.dcc-core-spells-cleric-1': true,
        'dcc-core-book.dcc-core-spells-cleric-2': false,
        'dcc-core-book.dcc-core-spells-cleric-3': false,
        'dcc-core-book.dcc-core-spells-cleric-4': false,
        'dcc-core-book.dcc-core-spells-cleric-5': false,
        'dcc-core-book.dcc-core-spells-wizard-1': true,
        'dcc-core-book.dcc-core-spells-wizard-2': false,
        'dcc-core-book.dcc-core-spells-wizard-3': false,
        'dcc-core-book.dcc-core-spells-wizard-4': false,
        'dcc-core-book.dcc-core-spells-wizard-5': false,
        'dcc-core-book.dcc-core-spells-patron': false
      },
      Journals: {
        'dcc.dcc-userguide': true,
        'dcc-core-book.dcc-core-journals': true,
        'dcc-core-book.dcc-core-text': true,
        'dcc-core-book.dcc-core-creatures-journals': false,
        'dcc-core-book.dcc-core-men-and-magicians-journals': false
      }
    }
  }).render(true)
}

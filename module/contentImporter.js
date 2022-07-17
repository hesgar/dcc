/* global expandObject, flattenObject, FormApplication, game */

class ContentImporter extends FormApplication {
  constructor (options = {}) {
    super()
    this._content = options.content
  }

  static get defaultOptions () {
    const options = super.defaultOptions
    options.id = 'core-book-content-importer'
    options.width = 600
    options.height = 800
    options.template = 'modules/dcc-core-book/templates/dialog-content-importer.html'
    return options
  }

  /**
   * Title
   * @type {String}
   */
  get title () {
    return game.i18n.localize('DCC.CoreBook.ContentImporter.Title')
  }

  /* -------------------------------------------- */

  /**
   * Construct and return the data object used to render the HTML template for this form application.
   * @return {Object}
   */
  getData () {
    const data = {}

    data.importEntities = []
    for (const entity in this._content) {
      const items = []
      for (const item in this._content[entity]) {
        items.push({
          name: item,
          locString: `DCC.CoreBook.ContentImporter.Packs.${item}`,
          value: this._content[entity][item]
        })
      }
      data.importEntities.push({
        locString: `DCC.CoreBook.ContentImporter.Entities.${entity}`,
        entity,
        items
      })
    }

    return data
  }

  /** @override */
  activateListeners (html) {
    super.activateListeners(html)

    html.find('button.check-all').click(this._onSelectContent.bind(this, html, true))
    html.find('button.uncheck-all').click(this._onSelectContent.bind(this, html, false))
  }

  async _onSelectContent (html, state) {
    html.find('input.content-selector').each((index, element) => {
      element.checked = state
    })
  }

  /**
   * This method is called upon form submission after form data is validated
   * @param event {Event}       The initial triggering submission event
   * @param formData {Object}   The object of validated form data with which to update the object
   * @private
   */
  async _updateObject (event, formData) {
    event.preventDefault()

    const data = expandObject(formData)
    for (const entity in this._content) {
      const entityItems = flattenObject(data[entity])
      for (const item in entityItems) {
        if (entityItems[item]) {
          console.log(`Importing ${item}.`)
          try {
            const pack = await game.packs.get(item)
            if (pack) {
              pack.importAll()
            }
          } catch (err) {
            console.error(`Exception while importing ${item}:\n${err}`)
          }
        }
      }
    }
  }
}

export default ContentImporter

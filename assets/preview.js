document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('app')
  try {
    const res = await fetch('templates/index.json')
    const data = await res.json()
    const order = data.order || Object.keys(data.sections)
    for (const id of order) {
      const section = data.sections[id]
      const type = section.type
      const htmlRes = await fetch(`sections/${type}.liquid`)
      let html = await htmlRes.text()
      // Only render the HTML section, strip Shopify schema from preview
      const split = html.split('{% schema %')
      html = split[0]
      const el = document.createElement('div')
      el.innerHTML = html
      container.appendChild(el)
    }
  } catch (e) {
    container.textContent = 'Failed to load preview.'
  }
})

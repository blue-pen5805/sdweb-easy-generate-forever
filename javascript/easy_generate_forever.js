onUiLoaded(() => {
  // --- javascript/contextMenu.js
  const generateOnRepeat = function (genbuttonid, interruptbuttonid) {
    let genbutton = gradioApp().querySelector(genbuttonid);
    let interruptbutton = gradioApp().querySelector(interruptbuttonid);
    if (!interruptbutton.offsetParent) {
      genbutton.click();
    }
    clearInterval(window.generateOnRepeatInterval)
    window.generateOnRepeatInterval = setInterval(function () {
      if (!interruptbutton.offsetParent) {
        genbutton.click();
      }
    },500)
  }
  const cancelGenerateForever = function () {
    clearInterval(window.generateOnRepeatInterval)
  }
  // ---

  const buildButtons = () => {
    const generateButton = gradioApp().getElementById('txt2img_generate')

    const generateForeverButton = generateButton.cloneNode()
    generateForeverButton.innerText = 'Generate Forever'
    generateForeverButton.id = ''
    generateForeverButton.classList.remove('lg', 'primary')
    generateForeverButton.classList.add('sm', 'secondary')

    const cancelGenerateForeverButton = generateForeverButton.cloneNode()
    cancelGenerateForeverButton.innerText = 'Cancel Forever'

    return [generateForeverButton, cancelGenerateForeverButton]
  }

  const [generateForeverButton, cancelGenerateForeverButton] = buildButtons()

  const indicator = document.createElement('span')
  indicator.innerHTML = '♾️'

  generateForeverButton.addEventListener('click', () => {
    generateOnRepeat('#txt2img_generate', '#txt2img_interrupt');
    indicator.classList.add('forever')
  })
  cancelGenerateForeverButton.addEventListener('click', () => {
    cancelGenerateForever()
    indicator.classList.remove('forever')
  })

  const buttons = document.createElement('div')
  buttons.classList.add('easy_generate_forever_container', 'buttons')
  buttons.appendChild(generateForeverButton)
  buttons.appendChild(cancelGenerateForeverButton)

  const container = document.createElement('div')
  container.classList.add('easy_generate_forever_container')
  container.appendChild(indicator)
  container.appendChild(buttons)

  gradioApp().getElementById('txt2img_generate_box').after(container)
})

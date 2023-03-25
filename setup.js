import { $ } from './utils/dom'

require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.27.0/min/vs' } })

require(['vs/editor/editor.main'], () => {
  const editor = monaco.editor.create($('#editor'), {
    value: '',
    theme: 'vs-dark',
    wordWrap: 'on',
    language: 'javascript',
    automaticLayout: true,
    wrappingIndent: 'same'
  })

  const output = $('#output')

  console.log = function (message) {
    output.innerHTML += message + '<br>'
  }
  console.error = console.warn = console.info = console.debug = console.trace = console.log;

  const executeCode = () => {
    output.innerHTML = ''

    try {
      const code = editor.getValue()
      const result = eval(code)
      if (result !== undefined) {
        const lines = result.toString().split(/\r?\n/)
        output.innerHTML = lines.join('<br>') + '<br>'
      }
    } catch (e) {
      const lines = e.toString().split(/\r?\n/)
      output.innerHTML = lines.join('<br>') + '<br>'
    }
  }

  editor.addAction({
    id: 'execute',
    label: 'Ejecutar código',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
    run: executeCode
  })

  editor.getModel().onDidChangeContent(executeCode)
})
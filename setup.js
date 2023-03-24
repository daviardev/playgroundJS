require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.27.0/min/vs' }})

require(['vs/editor/editor.main'], () => {
  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: '',
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
    wordWrap: 'on',
    wrappingIndent: 'indent'
  })

  const output = document.getElementById('output')

  function executeCode() {
    output.innerHTML = ''
    try {
      const code = editor.getValue()
      const result = eval(code)
      if (result !== undefined) {
        const lines = result.toString().split(/\r?\n/)
        output.innerHTML = lines.join('<br>')
      }
    } catch (e) {
      const lines = e.toString().split(/\r?\n/)
      output.innerHTML = lines.join('<br>')
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

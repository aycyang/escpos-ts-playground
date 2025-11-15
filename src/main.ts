import * as escpos from 'escpos-ts'

window.onload = () => {
  const inputTextarea = document.getElementById('input')
  const outputDiv = document.getElementById('output')
  const cmds = [
    new escpos.InitializePrinter(),
    new escpos.SelectJustification(escpos.Justification.Center),
  ]
  const rows = cmds.map(cmd => tr(td(formatHex(cmd.serialize())), td(cmd.toString())))
  const table = document.createElement('table')
  for (const row of rows) {
    table.appendChild(row)
  }
  outputDiv.appendChild(table)
}

function tr(...args) {
  const el = document.createElement('tr')
  for (const child of args) {
    el.appendChild(child)
  }
  return el
}

function td(s: string) {
  const el = document.createElement('td')
  el.innerHTML = s
  return el
}

function formatHex(buf: any): string {
  const chunks: string[] = []
  for (let i = 0; i < buf.length; i++) {
    chunks.push(buf.subarray(i, i+1).toString('hex'))
    if (chunks.length > 16) {
      chunks.pop()
      chunks.push('...')
      break
    }
  }
  return chunks.join(' ')
}

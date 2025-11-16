import { Buffer } from 'buffer'
import * as escpos from 'escpos-ts'

window.onload = () => {
  const inputTextarea: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement
  inputTextarea.addEventListener('input', event => {
    const buf = parseHex(inputTextarea.value)
    let cmds = []
    try {
      cmds = escpos.parse(buf)
      displayCmds(cmds)
      displayError('')
    } catch (e) {
      displayCmds([])
      displayError(e)
    }
  })
}

function displayError(error) {
  const errorDiv = document.getElementById('error')
  clear(errorDiv)
  errorDiv.innerHTML = error
}

function displayCmds(cmds) {
  const outputDiv = document.getElementById('output')
  clear(outputDiv)
  const rows = cmds.map(cmd => tr(td(formatHex(cmd.serialize())), td(cmd.toString())))
  let table = document.createElement('table')
  for (const row of rows) {
    table.appendChild(row)
  }
  outputDiv.appendChild(table)
}

function parseHex(hex: string): Buffer {
  hex = hex.replace(/[ \t\r\n]/g, '')
  const buf = Buffer.from(hex, 'hex')
  return buf
}

function clear(element: HTMLElement) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild)
  }
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
    if (chunks.length > 5) {
      chunks.pop()
      chunks.push('...')
      break
    }
  }
  return chunks.join(' ')
}

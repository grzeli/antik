import { Product } from './../interfaces/Product/Product'

export const prepareAndDownloadFile = (data: Product) => {
  if (!data || !Object.values(data).length) {
    return
  }

  const blob = new Blob([JSON.stringify(data)], { type: 'text/json' })
  const link = document.createElement('a')

  link.download = (data.title as string) + '.json'
  link.href = window.URL.createObjectURL(blob)
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':')

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  link.dispatchEvent(evt)
  link.remove()
}

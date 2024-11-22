import {Id} from '../../lib/cmp'
import {Panel} from './panel'
import {readFileSync} from 'fs'
import {parseSvg, Tag} from './parse-svg'

export class Asset {
  constructor(
    readonly id: Id,
    readonly width: number,
    readonly height: number,
    readonly panels: Panel[],
  ) {}
}

export function assetFromPath(filePath: string, id: Id): Asset {
  const text = readFileSync(filePath, {encoding: 'utf8'})
  const svg = parseSvg(text)
  if (!svg) {
    throw `Failed to parse asset "${filePath}"`
  }
  if (svg.name !== 'svg') {
    throw `Expected first element in asset to be <svg>`
  }

  let width = 0
  let height = 0
  for (const attr of svg.attr) {
    if (attr.name === 'width') {
      width = +attr.value
    } else if (attr.name === 'height') {
      height = +attr.value
    }
  }

  for (const el of svg.children) {
    //
  }

  // TODO: Panels

  return new Asset(id, width, height, [])
}

function makePanelFromTag(tag: Tag) {
  switch (tag.name) {
    case 'path':
      break
    case 'rect':
      let x, y, width, height, fill, transform
      for (const attr of tag.attr) {
        switch (attr.name) {
          case 'x':
            x = +attr.value
            break
          case 'y':
            y = +attr.value
            break
          case 'width':
            width = +attr.value
            break
          case 'height':
            height = +attr.value
            break
          case 'fill':
            fill = attr.value
            break
          case 'transform':
            transform = attr.value
            break
        }
      }
      break
  }
}

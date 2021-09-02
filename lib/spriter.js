import Spriter from 'svg-sprite'
import fs from 'fs/promises'
import path from 'path'

const spriter = new Spriter({
  mode: {
    symbol: true
  }
})

export const generate = async (filePaths, svgDir, outDir) => {
  const P = filePaths.map(async (filePath) => {
    const absoluteFilePath = path.join(svgDir, filePath)
    const content = await fs.readFile(absoluteFilePath, 'utf-8')
    spriter.add(absoluteFilePath, null, content)
  })

  await Promise.all(P)
  spriter.compile((error, result, data) => {
    if (error) {
      console.error(error)
    }

    const file = result.symbol.sprite
    fs.writeFile(path.join(outDir, 'sprite.svg'), file.contents)
  })
}
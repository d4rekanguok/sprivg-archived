import fs from 'fs/promises'
import path from 'path'
import bodyParser from 'body-parser'
import { globby } from 'globby'
import polka from 'polka'
import serve from 'sirv'
import { reduce } from './lib/reduce-select.js'
import { generate } from './lib/spriter.js'


const getAssetPath = (svgDir, fsPath) => {
  return '/' + path.relative(svgDir, fsPath)
}

const main = async () => {
  const svgDir = path.join(process.cwd(), './svg')
  const appDir = path.join(process.cwd(), './app')
  const outDir = path.join(process.cwd(), './out')
  const sprivgSelected = path.join(process.cwd(), './sprivg.selected.json')
  try {
    const exists = await fs.access(sprivgSelected)
  } catch(err) {
    fs.writeFile(sprivgSelected, `[]`)
  }

  polka()
    .use(bodyParser.json())
    .use(serve(svgDir))
    .use(serve(appDir))
    .use(serve(outDir))
    .get('/api/select', async (req, res) => {
      const selected = await fs.readFile(sprivgSelected, 'utf-8')

      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(selected)
    })
    .post('/api/select', async (req, res) => {
      const actions = req.body
      const result = await fs.readFile(sprivgSelected, 'utf-8')
      let data = JSON.parse(result)
      data = reduce(data, actions)
      await fs.writeFile(sprivgSelected, JSON.stringify(data))

      await generate(data, svgDir, outDir)
      res.end()
    })
    .get('/api/svg', async (req, res) => {
      const paths = await globby([path.join(svgDir, '/**/*.svg')])
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(paths.map(item => getAssetPath(svgDir, item)).sort()))
    })
    .listen(1234)
}

main()
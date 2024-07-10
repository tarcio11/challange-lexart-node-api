import { addAlias } from 'module-alias'
import { resolve } from 'path'

addAlias('@', resolve(process.env.NODE_ENV ? 'src' : 'dist/src'))
addAlias('@/tests', resolve(process.env.NODE_ENV ? 'src' : 'dist/tests'))
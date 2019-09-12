import { logProps } from './properties'
import { logQuery } from './queries'
import { getGlobal } from './tools'

getGlobal().logProps = logProps
getGlobal().logQuery = logQuery

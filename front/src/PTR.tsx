import { useEffect } from 'react'
import * as PullToRefresh from 'pulltorefreshjs'
import * as ReactDOMServer from 'react-dom/server'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const PTR: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        window.location.reload()
      },
      iconArrow: ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faSyncAlt} />
      ),
      iconRefreshing: ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faSyncAlt} spin={true} />
      ),
    })
    return () => {
      PullToRefresh.destroyAll()
    }
  })

  return <>{children}</>
}

export default PTR

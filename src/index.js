import Markdown from './markdown';
import './styles/base.scss'
import './styles/prism.css'

let components = {}

export default (cs, md) => {
  components = {...cs, ...components}
  return class Doc extends Markdown {
    document() {
      return md;
    }
  }
}

export const getComponent = () => components

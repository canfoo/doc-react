import React from 'react';
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'

import toolipMd from './docs/tooltip.md'
import docReact from '../src'
// import docReact from '../dist'
import './app.css'

const Doc = docReact({ Tooltip }, toolipMd)


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <Doc />
      </div>
    )
  }
}

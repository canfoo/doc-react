import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import { transform } from 'babel-standalone'
import { getComponent } from '../index'

import Editor from '../editor'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.playerId = `${parseInt(Math.random() * 1e9).toString(36)}`
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
    this.description = marked(this.document[1])
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/)
    this.componentName = 'Demo'
    if (/class(.*)extends/.test(this.source[2])) {
      this.componentName = this.source[2].match(/class(.*)extends/)[1].trim()
    }

    // console.log('this.source', this.source)

    this.state = {
      showBlock: false
    }
  }

  componentDidMount() {
    this.renderSource(this.source[2])
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  renderSource(value) {
    const args = ['context', 'React', 'ReactDOM', 'Component']
    const argv = [this, React, ReactDOM, Component]
    const Element = getComponent()
    for (const key in Element) {
      args.push(key)
      argv.push(Element[key])
    }
    const code = transform(`
      ${value}

      ReactDOM.render(<${this.componentName} {...context.props} />, document.getElementById('${this.playerId}'))
    `, {
      presets: ["es2015", 'react'],
      plugins: ["transform-es2015-modules-umd"]
    }).code
    args.push(code)

    new Function(...args).apply(null, argv)
    this.source[2] = value
  }

  render() {
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} />
        <div className="meta">
          {
            this.description && (
              <div className="description">
                <div
                  ref="description"
                  dangerouslySetInnerHTML={{ __html: this.description }}
                />
              </div>
            )
          }
          {
            this.state.showBlock && (
              <Editor
                value={this.source[2]}
                onChange={code => this.renderSource(code)}
              />
            )
          }
        </div>
        <div className="demo-block-control" onClick={this.blockControl.bind(this)}>
          {
            this.state.showBlock ? (
              <span>
                {/* <i className="el-icon-caret-top" />隐藏代码 */}
                <img className="block-icon" src={require('../assests/cc-close-square.png')} alt="open" />
              </span>
            ) : (
              <span>
                {/* <i className="el-icon-caret-bottom" />显示代码 */}
                <img className="block-icon" src={require('../assests/open.png')} alt="open" />
              </span>
            )
          }
        </div>
      </div>
    )
  }
}

Canvas.propTypes = {
  locale: PropTypes.object
}

Canvas.defaultProps = {
  locale: {}
}

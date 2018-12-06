### 测试一下啊

### 基础用法

:::demo 基础用法。。。

```js

class Test extends Component {
  render() {
    return (
      <div>
        <Tooltip placement="left" overlay={<span>tooltip</span>}>
          <a href="#">hover</a>
        </Tooltip>
      </div>
    )
  }
}

```
:::

### 常规用法用法

:::demo 常规用法用法。。。

```js

class Test1 extends Component {
  render() {
    return (
      <div>
        <Tooltip placement="right" overlay={<span>tooltip</span>}>
         <span>123</span>
        </Tooltip>
      </div>
    )
  }
}

```
:::
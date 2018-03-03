## `1.0.4`

#### 修复
- [在新窗口模式下，ie不会弹出打印项 谷歌正常](https://github.com/hanzhangyu/rc-print/issues/8)修复IEonload事件触发
- [单页面中的使用问题](https://github.com/hanzhangyu/rc-print/issues/7)清除闭包中的缓存

## `1.0.3`

#### 修复
- [控制台 大量的警告](https://github.com/hanzhangyu/rc-print/issues/6)修复cloneElement附带props

## `1.0.2`

#### 修复
- 修复render在body上react报warning

## `1.0.1`

#### 改进
- 改进缓存机制
- 移除无效的js文件

## `1.0.0`

#### 修复
- [remote file unload bug](https://github.com/hanzhangyu/rc-print/issues/2)修复文件未加载`新建window方式`就触发打印
- 修复`懒惰渲染lazyRender`dom节点遗留

#### 改进
- 新增在线demo页面，修改readme

## `0.1.2`

#### 改进
- [#edefa02](https://github.com/hanzhangyu/rc-print/commit/edefa02) [Fix bug]: remote style and image unload in Chrome. ([@iineva](https://github.com/iineva))
- [#9adeb9d](https://github.com/hanzhangyu/rc-print/commit/9adeb9d) Support MacOS Command+P. ([@iineva](https://github.com/iineva))

## `0.1.0`

> 支持iframe与新窗口两种方式打印。

#### 改进
- 添加多种引入样式的方式
- 完善单元测试与demo
- 支持自定义iframe或新窗口的容器样式
- 支持懒惰的渲染即只在打印时渲染节点

## `0.0.1`

- version@0.1.0 is comming soon

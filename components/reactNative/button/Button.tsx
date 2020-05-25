import * as React from 'react' // 这里必须这样定义
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  TextStyle,
  ImageURISource,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Insets
} from 'react-native'

export interface BaseBnProps {
  title?: string // 按钮标题
  source?: ImageURISource | undefined | any // 图片
  isDisable?: boolean // 按钮禁用
  titleStyle?: StyleProp<TextStyle> // 文字样式
  bnStyle?: StyleProp<ViewStyle> // 按钮样式
  iconStyle?: StyleProp<ImageStyle> // 图片样式
  onPress?: () => void // 点击事件
  timeout?: number // 防止重复点击 默认800毫秒
  isTextImgLayout?: boolean // 是否是文字图片排序布局 默认true,为false时，是图片文字排序
  activeOpacity?: number // 点击时不透明度显示（0到1之间）。默认值为0.2
  style?: any // 按钮样式 一般设置margin值
  hitSlop?: Insets // 按钮的触摸外延范围 默认 { top: 0, bottom: 0, left: 0, right: 0 }
}
export interface BaseBnState {
  isDisable: boolean
}
class ZAButton<P extends BaseBnProps,S extends BaseBnState> extends React.PureComponent<P, S> {
  static defaultProps = {
    timeout: 800,
    isTextImgLayout: true,
    activeOpacity: 0.2
  }
  timer: any = null
  constructor (props: P) {
    super(props)
    this.state = this.getInitialState(props)
  }
  getInitialState (props: P): S {
    return {
      isDisable: false
    } as S
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  /**
   * 为派生类增加样式
   */
  getImgStyle () {
    return styles.baseStyle
  }
  getTitleStyle () {
    return styles.baseStyle
  }
  getBnStyle () {
    return styles.baseStyle
  }
  getItemViewStyle () {
    return styles.baseStyle
  }
  getTitle () {
    return this.props.title
  }
  getSource () {
    return this.props.source
  }
  /**
   * 为派生类增加View
   */
  renderLeftView () {
    return <View/>
  }

  render () {
    const image = this.getSource() ? (
      <Image
        style={[styles.imgStyle, this.getImgStyle(),this.props.iconStyle]}
        source={this.getSource()}
      />
    ) : null
    const title = this.getTitle() ? (
      <Text style={[styles.title,this.getTitleStyle(), this.props.titleStyle]}>
        {this.getTitle()}
      </Text>
    ) : null
    return (
      <TouchableOpacity
        {...this.props}
        disabled={this.props.isDisable || this.state.isDisable}
        onPress={() => this.forbiddenRepeatPress()}
        style={[styles.bnStyle,this.getBnStyle(),this.props.style, this.props.bnStyle]}
        activeOpacity={this.props.activeOpacity}
        hitSlop={this.props.hitSlop}
      >
        {!title && !image ? null : <View
          style={[
            {
              flexDirection: this.props.isTextImgLayout ? 'row' : 'row-reverse'
            },
            styles.itemView,
            this.getItemViewStyle()
          ]}
        >
          {this.renderLeftView()}
          {title}
          {image}
        </View>}
        {this.props.children && this.props.children}
      </TouchableOpacity>
    )
  }

  forbiddenRepeatPress () {
    const { onPress } = this.props
    onPress && onPress()
    this.setState(
      {
        isDisable: true
      },
      () => {
        this.timer = setTimeout(() => {
          this.setState({ isDisable: false })
        }, this.props.timeout)
      }
    )
  }
}

const styles = StyleSheet.create({
  bnStyle: {
    // height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  imgStyle: {
    alignItems: 'center',
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 8,
    marginRight: 10
  },
  title: {
    // paddingHorizontal: 20,
    fontSize: 17
  },
  itemView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  baseStyle: {

  }
})
export default ZAButton

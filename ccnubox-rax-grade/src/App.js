import { createElement, Component, PropTypes } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles from "./App.css"
import Touchable from "rax-touchable";
import ListView from "rax-listview";
import GradeService from "./services";
import Animated from "rax-animated";

const id = 2016210773;

const { View: AnimatedView } = Animated;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.fadeAnim = new Animated.Value(0);
  }

  static propTypes = {
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: false
  };

  state = {
    visible: false
  };

  animated(state, callback) {
    const { visible } = state;
    Animated.timing(this.fadeAnim, { toValue: visible === true ? 1 : 0 }).start(
      callback
    );
  }

  show() {
    const currentState = { visible: true };
    this.setState(currentState, () =>
      this.animated(
        currentState,
        () => this.props.onShow && this.props.onShow(currentState)
      )
    );
  }

  hide() {
    const currentState = { visible: false };
    this.animated(currentState, () =>
      this.setState(
        currentState,
        () => this.props.onHide && this.props.onHide(currentState)
      )
    );
  }

  toggle(visible) {
    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visible != this.props.visible &&
      nextProps.visible != this.state.visible
    ) {
      this.toggle(nextProps.visible);
    }
  }

  componentWillMount() {
    this.setState({
      visible: this.props.visible
    });
  }

  componentDidMount() {
    this.animated(this.state);
  }

  render() {
    const { contentStyle, children } = this.props;
    const { visible } = this.state;
    return (
      visible && (
        <AnimatedView
          onClick={() => {
            this.hide();
          }}
          style={[{ opacity: this.fadeAnim }]}
        >
          <Touchable
            style={[styles.main, contentStyle]}
          >
            {children}
          </Touchable>
        </AnimatedView>
      )
    );
  }
}

class Year extends Component {
  constructor(props) {
    super(props);
    this.xnm = 2015;
  }
  showModal = () => {
    this.refs.modal.show();
  };

  hideModal = () => {
    this.refs.modal.hide();
  };

  render() {
    return (
      <View style={[styles.choose_box, styles.top_box]}>
        <Touchable onPress={this.showModal}>
          <Text>{this.xnm}学年</Text>
        </Touchable>
        <Dropdown ref="modal">
          <View>
            <Touchable onPress={this.hideModal}>
              <Text>{this.xnm + 1}学年</Text>
            </Touchable>
            <Touchable onPress={this.hideModal}>
              <Text>{this.xnm + 2}学年</Text>
            </Touchable>
            <Touchable onPress={this.hideModal}>
              <Text>{this.xnm + 3}学年</Text>
            </Touchable>
          </View>
        </Dropdown>
      </View>
    );
  }
}

class Term extends Component {
  constructor(props) {
    super(props);
    this.xqm = [
      {
        value: 1,
        text: "一"
      },
      {
        value: 2,
        text: "二"
      },
      {
        value: 3,
        text: "三"
      }
    ];
  }
  showModal = () => {
    this.refs.modal.show();
  };

  hideModal = () => {
    this.refs.modal.hide();
  };

  render() {
    return (
      <View style={[styles.choose_box, styles.middle_box]}>
        <Touchable onPress={this.showModal}>
          <Text>第学期</Text>
        </Touchable>
        <Dropdown ref="modal">
          <View>
            <Touchable onPress={this.hideModal}>
              <Text>第{this.xqm[0].text}学期</Text>
            </Touchable>
            <Touchable onPress={this.hideModal}>
              <Text>第{this.xqm[1].text}学期</Text>
            </Touchable>
            <Touchable onPress={this.hideModal}>
              <Text>第{this.xqm[2].text}学期</Text>
            </Touchable>
          </View>
        </Dropdown>
      </View>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.app}>
        <Year></Year>
        <Term></Term>
        <Touchable>
          <Text style={[styles.choose_box, styles.middle_box,styles.bottom_box]}>查询</Text>
        </Touchable>
      </View>
    );
  }
}

export default App;

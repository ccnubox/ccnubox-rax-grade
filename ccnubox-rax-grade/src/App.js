import { createElement, Component, PropTypes } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles from "./App.css";
import Touchable from "rax-touchable";
import ListView from "rax-listview";
import GradeService from "./services";
import Animated from "rax-animated";
//import BoxButton from "../box-ui/common/button";
import Button from "rax-button";
import Link from 'rax-link';

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
    visible: false,
    options: null
  };

  state = {
    visible: false,
    options: null
  };

  animated(state, callback) {
    const { visible, options } = state;
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
      visible: this.props.visible,
      options: this.props.options
    });
  }

  componentDidMount() {
    this.animated(this.state);
  }

  render() {
    const { contentStyle, children } = this.props;
    const { visible, options } = this.state;
    return (
      visible && (
        <AnimatedView
          onClick={() => {
            this.hide();
          }}
          style={[{ opacity: this.fadeAnim }]}
        >
          <Touchable>{children}</Touchable>
        </AnimatedView>
      )
    );
  }
}

class Year extends Component {
  constructor(props) {
    super(props);
    this.year = this.id;
    this.xnm = 2016;
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
          <View style={styles.dropdown}>
            <div style={styles.dropTriangle} />
            <Touchable onPress={this.hideModal}>
              <Text>
                {this.xnm} - {this.xnm + 1}学年
              </Text>
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
    this.chooseTerm = { term: 1, termText: "第一学期" }),
   this.TermOptions = [
        {
          value: 1,
          text: "第一学期"
        },
        {
          value: 2,
          text: "第二学期"
        },
        {
          value: 3,
          text: "第三学期"
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
          <Text>{this.chooseTerm.termText}</Text>
        </Touchable>
        <Dropdown ref="modal">
          <View style={styles.dropdown}>
            <Touchable onPress={this.hideModal}>
              <Text>{this.TermOptions[0].text}</Text>
            </Touchable>
            <Touchable onPress={this.hideModal}>
              <Text>{this.TermOptions[1].text}</Text>
            </Touchable>
            <Touchable onPress={this.hideModal}>
              <Text>{this.TermOptions[2].text}</Text>
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
        <Year />
        <Term />
        <Button
          onPress={evt => {
            window.location = "/gradeList";
          }}
          style={[styles.choose_box, styles.bottom_box]}
        >
          <Link href=""style={styles.whiteText}>查询</Link>
        </Button>
      </View>
    );
  }
}

export default App;

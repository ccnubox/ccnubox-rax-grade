import { createElement, Component, PropTypes } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles from "./App.css";
import Touchable from "rax-touchable";
import ListView from "rax-listview";
import GradeService from "./services/grade";
import Animated from "rax-animated";
//import BoxButton from "../box-ui/common/button";
import Button from "rax-button";
import Link from "rax-link";
import Image from "rax-image";
import ScrollView from "rax-scrollview";

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
    const { visible, value } = state;
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
    const { children } = this.props;
    const { visible } = this.state;
    return (
      visible && (
        <AnimatedView
          onClick={() => {
            this.hide();
          }}
          // style={styles.mask}
        >
          <Touchable>{children}</Touchable>
        </AnimatedView>
      )
    );
  }
}

const id = "2016210773";
var year = parseInt(id.substr(0, 4));
class Year extends Component {
  constructor(props) {
    super(props);
    //this.year = 2016;
    this.nextYear = year + 1;
    this.state = {
      value: year,
      showsVerticalScrollIndicator: false
    };
  }
  showModal = () => {
    this.refs.modal.show();
  };

  hideModal = year => {
    this.setState({
      value: year
    });
    this.refs.modal.hide();
  };

  render() {
    return (
      <View style={styles.zindex}>
        <Touchable
          onPress={this.showModal}
          style={[styles.choose_box, styles.top_box]}
        >
          <Text>
            {this.state.value}-{this.state.value + 1} 学年
          </Text>
          <Image
            style={styles.down}
            source={require("./assets/triangle_down.png")}
            resizeMode="cover"
          />
        </Touchable>
        <View style={styles.dropdown_container}>
          <Dropdown ref="modal">
            <Image
              style={styles.up}
              source={require("./assets/triangle_up.png")}
              resizeMode="cover"
            />
            {/* <View style={styles.dropdown_list}> */}
            <ScrollView
              ref={scrollView => {
                this.scrollView = scrollView;
              }}
              style={styles.dropdown_list}
            >
              <View
                style={[styles.select_item, styles.item_border]}
                onClick={() => {
                  this.hideModal(year);
                }}
              >
                <Text style={styles.item_text}>
                  {year}-{year + 1} 学年
                </Text>
              </View>
              <View
                style={[styles.select_item, styles.item_border]}
                onClick={() => {
                  this.hideModal(year + 1);
                }}
              >
                <Text style={styles.item_text}>
                  {year + 1}-{year + 2} 学年
                </Text>
              </View>
              <View
                style={[styles.select_item, styles.item_border]}
                onClick={() => {
                  this.hideModal(year + 2);
                }}
              >
                <Text style={styles.item_text}>
                  {year + 2}-{year + 3} 学年
                </Text>
              </View>
              <View
                style={[styles.select_item, styles.item_border]}
                onClick={() => {
                  this.hideModal(year + 3);
                }}
              >
                <Text style={styles.item_text}>
                  {year + 3}-{year + 4} 学年
                </Text>
              </View>
              <View
                style={styles.select_item}
                onClick={() => {
                  this.hideModal(year + 4);
                }}
              >
                <Text style={styles.item_text}>
                  {year + 4}-{year + 5} 学年
                </Text>
              </View>
              {/* </View> */}
            </ScrollView>
          </Dropdown>
        </View>
      </View>
    );
  }
}

class Term extends Component {
  constructor(props) {
    super(props);
    this.TermOptions = [
      {
        value: 3,
        text: "第一学期"
      },
      {
        value: 12,
        text: "第二学期"
      },
      {
        value: 16,
        text: "第三学期"
      }
    ];
    this.state = {
      chooseTerm: { value: 3, text: "第一学期" }
    };
  }

  showModal = () => {
    this.refs.modal.show();
  };

  hideModal = index => {
    this.setState({
      chooseTerm: {
        value: this.TermOptions[index].value,
        text: this.TermOptions[index].text
      }
    });
    this.refs.modal.hide();
  };

  render() {
    return (
      <View>
        <Touchable
          onPress={this.showModal}
          style={[styles.choose_box, styles.middle_box]}
        >
          <Text>{this.state.chooseTerm.text}</Text>
          <Image
            style={styles.down}
            source={require("./assets/triangle_down.png")}
            resizeMode="cover"
          />
        </Touchable>
        <View style={styles.term_list}>
          <Dropdown ref="modal">
            <Image
              style={styles.up}
              source={require("./assets/triangle_up.png")}
              resizeMode="cover"
            />
            <View style={styles.dropdown_list}>
              <View
                style={[styles.select_item, styles.item_border]}
                onClick={() => {
                  this.hideModal(0);
                }}
              >
                <Text style={styles.item_text}>{this.TermOptions[0].text}</Text>
              </View>
              <View
                style={[styles.select_item, styles.item_border]}
                onClick={() => {
                  this.hideModal(1);
                }}
              >
                <Text style={styles.item_text}>{this.TermOptions[1].text}</Text>
              </View>
              <View
                style={styles.select_item}
                onClick={() => {
                  this.hideModal(2);
                }}
              >
                <Text style={styles.item_text}>{this.TermOptions[2].text}</Text>
              </View>
            </View>
          </Dropdown>
        </View>
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
        <Button style={[styles.choose_box, styles.bottom_box]}>
          <Link
            href="http://10.193.237.131:9999/js/second.bundle.js?_wx_tpl=http://10.193.237.131:9999/js/second.bundle.js"
            style={styles.white_text}
          >
            查询
          </Link>
        </Button>
        <Term />
        <Year />
      </View>
    );
  }
}

export default App;

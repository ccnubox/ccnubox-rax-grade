import { createElement, Component, PropTypes } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles from "./App.css";
import Touchable from "rax-touchable";
import Button from "rax-button";
import Image from "rax-image";
import ScrollView from "rax-scrollview";
const native = require("@weex-module/test");

import { confirm } from "./box-ui/common/modal";
import { parseSearchString } from "./box-ui/util";
import Notification from "./box-ui/common/notification";
import Dropdown from "./box-ui/common/dropdown-list";

let qd;
if (window.location.search) {
  qd = parseSearchString(window.location.search);
}

if (!qd) {
  alert("参数缺失错误");
}

const id = qd.sid[0];
const pwd = qd.pwd[0];
const year = parseInt(id.substr(0, 4));

class App extends Component {
  constructor(props) {
    super(props);
    this.nextYear = year + 1;
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
      value: year,
      showsVerticalScrollIndicator: false,
      chooseTerm: { value: 3, text: "第一学期" },
      YearOptions: []
    };
  }

  showTermModal = () => {
    this.refs.termModal.show();
  };

  hideTermModal = index => {
    this.setState({
      chooseTerm: {
        value: this.TermOptions[index].value,
        text: this.TermOptions[index].text
      }
    });
    this.refs.termModal.hide();
  };

  showYearModal = () => {
    this.refs.yearModal.show();
  };

  hideYearModal = year => {
    this.setState({
      value: year
    });
    this.refs.yearModal.hide();
  };

  componentWillMount() {
    let date1 = new Date();
    let tYear = parseInt(date1.getFullYear());
    let arr = [];
    for (let i = year; i <= tYear; i++) {
      arr.push(i);
    }
    this.setState({
      YearOptions: arr
    });
  }

  navToResult = () => {
    const { value, chooseTerm } = this.state;
    if (id[4] !== "2") {
      confirm(
        "检测到您的学号可能不是本科生学号，目前仅支持本科生成绩查询，是否继续查询？"
      ).then(() => {
        native.push(
          `ccnubox://grade.result?xnm=${value}&xqm=${
            chooseTerm.value
          }&sid=${id}&pwd=${encodeURIComponent(pwd)}`
        );
      });
    } else {
      native.push(
        `ccnubox://grade.result?xnm=${value}&xqm=${
          chooseTerm.value
        }&sid=${id}&pwd=${encodeURIComponent(pwd)}`
      );
    }
  };

  render() {
    return (
      <View style={styles.app}>
        <Notification
          style={styles.notification}
          pageId="com.muxistudio.grade.main"
        />
        <View>
          <Button
            style={[styles.choose_box, styles.bottom_box]}
            onPress={this.navToResult}
          >
            <Text style={styles.white_text}>查询</Text>
          </Button>

          <Touchable
            onPress={this.showTermModal}
            style={[styles.choose_box, styles.middle_box]}
          >
            <Text>{this.state.chooseTerm.text}</Text>
            <Image
              style={styles.down}
              source={require("./assets/triangle_down.png")}
              resizeMode="cover"
            />
          </Touchable>

          <Dropdown ref="termModal" top={445}>
            <Image
              style={styles.second_triangle_up}
              source={require("./assets/triangle_up.png")}
              resizeMode="cover"
            />
            <View style={styles.dropdown_list}>
              {this.TermOptions.map(i => {
                return (
                  <View
                    style={styles.select_item}
                    onClick={() => {
                      this.hideTermModal(this.TermOptions.indexOf(i));
                    }}
                  >
                    <Text style={styles.item_text}>{i.text}</Text>
                  </View>
                );
              })}
            </View>
          </Dropdown>

          <Touchable
            onPress={this.showYearModal}
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
          <Dropdown ref="yearModal" top={305}>
            <Image
              style={styles.first_triangle_up}
              source={require("./assets/triangle_up.png")}
              resizeMode="cover"
            />
            <ScrollView
              ref={scrollView => {
                this.scrollView = scrollView;
              }}
              style={styles.dropdown_list}
            >
              {this.state.YearOptions.map(i => {
                return (
                  <View
                    style={styles.select_item}
                    onClick={() => {
                      this.hideYearModal(i);
                    }}
                  >
                    <Text style={styles.item_text}>
                      {i}-{i + 1} 学年
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </Dropdown>
        </View>
      </View>
    );
  }
}

export default App;

import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import ListView from "rax-listview";
import styles from "./result.css";
import GradeService from "./services/grade.js";
const native = require("@weex-module/test");
import { parseSearchString } from "./box-ui/util";
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: []
    };
  }

  componentWillMount() {
    let qd;
    if (window.location.search) {
      qd = parseSearchString(window.location.search);
    }

    if (!qd) {
      alert("参数缺失错误");
    }

    const xnm = qd.xnm[0];
    const xqm = qd.xqm[0];

    native.getGrade(xnm, xqm, res => {
      const list = JSON.parse(res.data);
      this.setState({
        data: list
      });
      native.changeLoadingStatus(true);
    });
  }

  calcGPA(grade) {
    if (grade < 60) {
      return 0;
    } else {
      var gpa = Math.floor((grade - 60) / 5) * 0.5 + 1;
      return gpa;
    }
  }

  listItem = (item, index) => {
    return (
      <View style={[styles.item, index === this.state.data.length - 1 ? styles.last_item : {}]}>
        <View style={[styles.row]}>
          <View style={[styles.first_row]}>
            <Text
              style={[styles.category, styles.info_box, styles.middle_font]}
            >
              {item.category}
            </Text>
            <Text style={[styles.type, styles.info_box, styles.middle_font]}>
              {item.type || "无数据"}
            </Text>
            <Text style={[styles.credit, styles.info_box, styles.middle_font]}>
              学分{item.credit}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.middle_row]}>
          <Text style={[styles.course, styles.middle_font]}>{item.course}</Text>
          <Text style={[styles.grade, styles.large_font]}>
            成绩：{item.grade}
          </Text>
        </View>
        {/* <View style={[styles.row]}>
          <Text style={[styles.small_font]}>平时分：90</Text>
          <Text style={[styles.small_font]}>期末分：90</Text>
          <Text style={[styles.small_font]}>
            绩点：{this.calcGPA(item.grade)}
          </Text>
        </View> */}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.app}>
        <ListView renderRow={this.listItem} dataSource={this.state.data} />
      </View>
    );
  }
}
export default Result;

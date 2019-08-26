import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import ListView from "rax-listview";
import styles from "./result.css";
import Image from "rax-image";
import GradeService from "./services/grade.js";
const native = require("@weex-module/test");
import { parseSearchString } from "./box-ui/util";
import { weexAlert } from "./box-ui/common/modal";
import emptyIcon from "./assets/blank3X.png";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: [],
      empty: false
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
    const sid = qd.sid[0];
    const pwd = qd.pwd[0];

    native.getGrade(xnm, xqm, res => {
      if (res.code === "200") {
        const list = JSON.parse(res.data);
        if (list.length === 0) {
          // 显示空白页
          this.setState({
            empty: true
          });
          native.changeLoadingStatus(true);
        } else {
          this.setState({
            data: list
          });
          native.changeLoadingStatus(true);
        }
      } else {
        let errMessage = res.data;
        // 错误，请求兜底数据
        if (res.code === "501") {
          // 501 表示登录成功但获取成绩失败，采用服务端请求方式获取
          GradeService.getGradeFromServerV2(xnm, xqm, sid, pwd)
            .then(res => {
              if (res.code === 20101) {
                native.logout("");
                native.reportInsightApiEvent(
                  "getGradeFromServer",
                  "error",
                  res.code + ",Sid: " + sid
                );
                alert(
                  "学号或密码错误，请检查是否修改了 one.ccnu.edu.cn 的密码"
                );
                native.backToRoot();
              } else {
                this.setState({
                  data: res.data
                });
                native.changeLoadingStatus(true);
                native.reportInsightApiEvent(
                  "getGradeFromServer",
                  "success",
                  "null"
                );
              }
            })
            .catch(e => {
              native.reportInsightApiEvent(
                "getGradeFromServer",
                "error",
                JSON.stringify(e)
              );
              native.changeLoadingStatus(true);
              weexAlert(JSON.stringify(e)).then(res => {
                native.back();
              });
            });
        } else if (res.code === "401") {
          native.logout();
          native.back();
          alert("学号或密码错误，请检查是否修改了 one.ccnu.edu.cn 的密码");
        } else {
          // 缓存方案开发中
          native.changeLoadingStatus(true);
          weexAlert(errMessage).then(res => {
            native.back();
          });
          // 其他错误，说明登录失败，请求缓存作为兜底
          // GradeService.getGradeListFromCache(xnm, xqm, sid)
          //   .then(res => {
          //     const data = JSON.parse(res.val.data);
          //     this.setState({
          //       data
          //     });
          //     native.changeLoadingStatus(true);
          //     native.reportInsightApiEvent(
          //       "getGradeFromServerCache",
          //       "success",
          //       "null"
          //     );
          //   })
          //   .catch(e => {
          //     native.reportInsightApiEvent(
          //       "getGradeFromServerCache",
          //       "error",
          //       JSON.stringify(e)
          //     );

          //   });
        }
      }
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
      <View
        style={[
          styles.item,
          index === this.state.data.length - 1 ? styles.last_item : {}
        ]}
      >
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
              学分
              {item.credit}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.middle_row]}>
          <Text style={[styles.course, styles.middle_font]}>{item.course}</Text>
          <Text style={[styles.grade, styles.large_font]}>
            成绩：
            {item.grade}
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
  renderEmptyTip() {
    return (
      <View style={styles.empty}>
        <Image source={emptyIcon} style={styles.empty_icon} />
        <Text style={styles.text}>暂无成绩</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.app}>
        {this.state.empty ? (
          this.renderEmptyTip()
        ) : (
          <ListView renderRow={this.listItem} dataSource={this.state.data} />
        )}
      </View>
    );
  }
}
export default Result;

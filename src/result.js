import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ListView from 'rax-listview';
import styles from "./result.css";
import GradeService from "./services/grade.js";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: [],
    }
  }

  componentWillMount() {
    GradeService.getGradeList(2017,3)
      .then((data) => {
        this.setState({data})
      })
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
      <View style={styles.item}>
       <View style={[styles.row]}>
          <View style={[styles.first_row]}>
            <Text style={[styles.category, styles.info_box,styles.middle_font]}>{item.kcxzmc}</Text>
            <Text style={[styles.type, styles.info_box,styles.middle_font]}>{item.type || "无数据"}</Text>
          </View>
          <Text style={[styles.credit,styles.info_box,styles.middle_font]}>学分{item.credit}</Text>
        </View>
        <View style={[styles.row, styles.middle_row]}>
          <Text style={[styles.course,styles.middle_font]}>{item.course}</Text>
          <Text style={[styles.grade, styles.large_font]}>成绩：{item.grade}</Text>
        </View>
        <View style={[styles.row]}>
            <Text style={[styles.small_font]}>平时分：{item.usual}</Text>
            <Text style={[styles.small_font]}>期末分：{item.ending}</Text>
            <Text style={[styles.small_font]}>绩点：{this.calcGPA(item.grade)}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.app}>
        <ListView
          renderRow={this.listItem}
          dataSource={this.state.data}
        />
      </View>
    )
  }
}
export default Result;
import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ListView from 'rax-listview';
import styles from "./App.css";
import GradeService from "./services/grade.js";
import Button from "rax-button";

// 绩点
// const gpa = {
  
// }
const gradeData = [
  {
      "course": "生理与健康",  // 课程
      "credit": "1.0",  // 学分
      "grade" : "88.0",   // 总评
      "category": "通识选修课", // 课程类别
      "type": "理", // 课程分类
      "jxb_id": "1", // 一个奇怪的id, 用于该课程成绩详情API查询
      "kcxzmc": "通识选修课", // 课程属性
      "ending": "86", // 期末成绩
      "usual": "90" // 平时成绩
  },
  {
    "course": "高等数学",  // 课程
    "credit": "6.0",  // 学分
    "grade" : "100",   // 总评
    "category": "专业必修课", // 课程类别
    "type": "理", // 课程分类
    "jxb_id": "1", 
    "kcxzmc": "专业必修课",
    "ending": "100",
    "usual": "100"
  },
  {
    "course": "高级语言程序设计",  // 课程
    "credit": "3.0",  // 学分
    "grade" : "81.0",   // 总评
    "category": "专业必修课", // 课程类别
    "type": "理", // 课程分类
    "jxb_id": "1",
    "kcxzmc": "专业必修课",
    "ending": "75",
    "usual": "85"
  }
]

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesPressed1: 0,
      index: 0,
      data: gradeData,
    }
  }
  handlePress = () => {
    this.setState({
      timesPressed: this.state.timesPressed + 1,
    });
  };
  componentWillMount() {
    // alert(window.location.href)
    // InfoService.getInfoList()
    //   .then((data) => {
    //     this.setState({data})
    //   })
  }
  listItem = (item, index) => {
    var textLog = '';
    if (this.state.timesPressed1 > 1) {
      textLog = this.state.timesPressed + 'x onPress';
    } else if (this.state.timesPressed1 > 0) {
      textLog = 'onPress';
    }
    return (
      <View style={styles.item}>
       <View style={styles.row}>
          <Text style={[styles.category,styles.verticalBtn]}>{item.kcxzmc}</Text>
          <Text style={[styles.type,styles.verticalBtn]}>{item.type}</Text>
          <Text style={[styles.credit,styles.verticalBtn]}>学分{item.credict}</Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.course,styles.verticalBtn]}>{item.course}</Text>
          <Text style={[styles.grade,styles.verticalBtn]}>成绩{item.grade}</Text>
        </View>
        <View style={[styles.row]}>
            <Text style={[styles.detailGrade, styles.uausl,styles.verticalBtn]}>平时分：{item.usual}</Text>
            <Text style={[styles.detailGrade, styles.ending,styles.verticalBtn]}>期末分：{item.ending}</Text>
            <Text style={[styles.detailGrade, styles.gpa,styles.verticalBtn]}>绩点：4.0</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
      <ListView
        renderRow={this.listItem}
        dataSource={this.state.data}
      />
      </View>
    );
  }
}
export default Result;
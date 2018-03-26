import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ListView from 'rax-listview';
import styles from "./result.css";
import GradeService from "./services/grade.js";
import Button from "rax-button";

const gradeData = 
  [
    {
        "course": "大学体育3",
        "credit": "1.0",
        "grade": "91.0",
        "category": "公共课",
        "type": "体",
        "jxb_id": "5145003FD53906EDE0531D50A8C0B92D",
        "kcxzmc": "通识必修课",
        "usual": "91",
        "ending": "91"
    },
    {
        "course": "马克思主义基本原理",
        "credit": "3.0",
        "grade": "87.6",
        "category": "公共课",
        "type": "文",
        "jxb_id": "4FD62511D1F53B7DE0531D50A8C043BA",
        "kcxzmc": "公共必修课",
        "usual": "93",
        "ending": "66"
    },
    {
        "course": "大学英语（JR3）",
        "credit": "2.0",
        "grade": "88.4",
        "category": "公共课",
        "type": null,
        "jxb_id": "4F28131041EB1703E0531D50A8C0F629",
        "kcxzmc": "公共必修课",
        "usual": "88",
        "ending": "89"
    },
    {
        "course": "英汉语言文化对比与翻译（通核）",
        "credit": "2.0",
        "grade": "90.0",
        "category": "公共课",
        "type": "人文与艺术",
        "jxb_id": "50634D9560015D56E0531D50A8C0E74C",
        "kcxzmc": "通识核心课",
        "usual": "90",
        "ending": "90"
    },
    {
        "course": "数据结构实验",
        "credit": "1.0",
        "grade": "93.1",
        "category": "公共课",
        "type": "理",
        "jxb_id": "5064C3D1686E7550E0531E50A8C0699E",
        "kcxzmc": "专业主干课程",
        "usual": "98.5",
        "ending": "85"
    },
    {
        "course": "数字逻辑",
        "credit": "3.5",
        "grade": "88.5",
        "category": "公共课",
        "type": "理",
        "jxb_id": "5069B20140BF4137E0531E50A8C07606",
        "kcxzmc": "专业主干课程",
        "usual": "90",
        "ending": "87"
    }
]

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
        console.log(data)
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
          <Text style={[styles.credit, styles.info_box,styles.middle_font]}>学分{item.credit}</Text>
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
      <View style={styles.container}>
        <ListView
          renderRow={this.listItem}
          dataSource={this.state.data}
        />
      </View>
    )
    // return (
    //   <View style={styles.app}>
    //     <ListView
    //       renderRow={this.listItem}
    //       dataSource={gradeData}
    //     />
    //   </View>
    // )
  }
}
export default Result;
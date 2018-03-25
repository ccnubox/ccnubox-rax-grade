import request from "../../box-ui/util/request";

const GradeService = {
  getGradeList(xnm, xqm) {
    return request({
      methods: "GET",
      url: "https://ccnubox.muxixyz.com/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        'Bigipserverpool': "89172160.20480.0000",
        'Sid': 2016210773,
        'Jsessionid': "A1A3B92E80C5A54DD5499F73713CB29E",
        'Authorization': "Basic " + btoa("2016210773:password")
      }
    });
  }
};

export default GradeService;

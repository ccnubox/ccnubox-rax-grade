import request from "../box-ui/util/request.js";

const GradeService = {
  getGradeList(xnm, xqm) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        'Bigipserverpool': "89172160.20480.0000",
        'Sid': "2016210773",
        'Jsessionid': "3892DCD4F0D2B95656A77CECC667287D",
        'Authorization': "Basic MjAxNjIxMDc3MzowMzA2MTAxNDkwY3J5"
        //'Authorization': "Basic " + btoa("id:password")
      }
    });
  }
};

export default GradeService;

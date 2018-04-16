import request from "../../box-ui/util/request";

const GradeService = {
  getGradeList(xnm, xqm) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        'Bigipserverpool': "122726592.20480.0000",
        'Sid': "2016210773",
        'Jsessionid': "47E9386725CA307D02E09734D6250A2E",
        'Authorization': "Basic MjAxNjIxMDc3MzowMzA2MTAxNDkwY3J5"
        //'Authorization': "Basic " + btoa("id:password")
      }
    });
  }
};

export default GradeService;

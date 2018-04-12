import request from "../../box-ui/util/request";

const GradeService = {
  getGradeList(xnm, xqm) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        'Bigipserverpool': "89172160.20480.0000",
        'Sid': "2016210773",
        'Jsessionid': "D9F732B19AC1CA070ECF973EE3AD899D",
        'Authorization': "Basic MjAxNjIxMDc3MzowMzA2MTAxNDkwY3J5"
        //'Authorization': "Basic " + btoa("id:password")
      }
    });
  }
};

export default GradeService;

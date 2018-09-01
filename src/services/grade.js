import request from "../box-ui/util/request.js";

const GradeService = {
  getGradeList(xnm, xqm, cookieJ, cookieB, sid) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        'Bigipserverpool': cookieB,
        'Sid': sid,
        'Jsessionid': cookieJ,
        'Authorization': "Basic foobar"
      }
    });
  },
  getGradeListFromCache(xnm, xqm, sid) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        'Sid': sid,
        'Authorization': "Basic foobar"
      }
    });
  }
};

export default GradeService;

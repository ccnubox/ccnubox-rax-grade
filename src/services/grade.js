import { Base64 } from "js-base64";
import request from "../box-ui/util/request.js";

const GradeService = {
  getGradeFromServerV2(xnm, xqm, sid, pwd) {
    return request({
      timeout: 8000,
      method: "GET",
      url:
        "https://ccnubox.muxixyz.com/api/grade/v2?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        Authorization: `Basic ${Base64.encode(`${sid}:${pwd}`)}`
      }
    });
  },
  // getGradeList(xnm, xqm, cookieJ, cookieB, sid) {
  //   return request({
  //     method: "GET",
  //     url: "https://ccnubox.muxixyz.com/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
  //     headers: {
  //       Bigipserverpool: cookieB,
  //       Sid: sid,
  //       Jsessionid: cookieJ,
  //       Authorization: "Basic foobar"
  //     }
  //   });
  // },
  // getGradeListFromCache(xnm, xqm, sid) {
  //   return request({
  //     method: "GET",
  //     url:
  //       "https://ccnubox.muxixyz.com/api/grade/cache/?xnm=" +
  //       xnm +
  //       "&xqm=" +
  //       xqm,
  //     headers: {
  //       Sid: sid,
  //       Authorization: "Basic foobar"
  //     }
  //   });
  // }
};

export default GradeService;

import request from "../../box-ui/util/request";

const GradeService = {
  getGrade(xnm, xqm) {
    return request({
      methods: "GET",
      url: "/api/grade/?xnm=" + xnm + "&xqm=" + xqm,
      headers: {
        'BIGipServerpool_jwc_xk': '89172160.20480.0000',
        'Sid': '2016210773',
        'JSESSIONID': 'ABC389191F7D9A51227D3765FE26E9EF',
        'Authorization': "Basic "+ btoa("0306101490cry")
      }
    })
  }
};

export default GradeService;

import axios from "axios";

const request = axios.create({
  timeout:5000,
  baseURL:'https://test-ijournal-service.topeditsci.com/api/v1/journal/search?',
})
const Request={
  GetFirstData:function (res) {
    request.get(
      'pageNum=1&pageSize=10&total=0&keywordType=title&keyword=&ifStart_2019=&ifEnd_2019=&ifStart=&ifEnd=&jcr=&sub=&selfCitingRate=all&compatriotRate=all&isDomestic=&totalReviewRatio=all&categoryId=1e78b26454e2878930f44c6a571be497&recommend=0&selfStart=&selfEnd=&numberStart=&numberEnd=&trrl=&trrr=&order=&orderType=',
    ).then((r) => {res(r)}).catch(() => res({'code': -1}))
  },
  ConditionalSearch:function (obj,res) {
    request.get('', {
      params: obj
    }).then((r) => res(r)).catch(() => res({'statusText': "NO"}))
  }
}
export default Request
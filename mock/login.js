
var Mock = require('./mock')
var Random = Mock.Random;

let mockSource = {
  login: {
    'error_code': '200',
    'error_msg': 'success',
    'data': {
      'phoneNum': '',
      'token': Random.string(30)
    }
  },
  list: {
    'error_code': '200',
    'error_msg': 'success',
    'data|10': [{
      'id|+1': 1,
      'img': "@image('200x100', '#4A7BF7','#fff','pic')",
      'title': '@ctitle(3,8)',
      'city': "@county(true)",
      'stock_num': '@integer(0,100)',//库存数量  
      'marketing_start': '@datetime()',
      'marketing_stop': '@now()',
      'price': '@integer(100,2000)',//现价，单位：分  
      'original_price': '@integer(100,3000)'
    }]
  },
  base: {
    'error_code': '',
    'error_msg': '',
    'data': {}
  }
}

// url method data
function API (url = '', method = 'GET', data = {}, fn) {
  let mockData = {}
  if (url === '') mockData = mockSource.base
  if (url === '/login' && method === 'POST') {
    mockData = JSON.parse(JSON.stringify(mockSource.login))
    mockData.data.phoneNum = data.phoneNum || 'null'
  }
  if (url === '/list' && method === 'GET') mockData = mockSource.list
  fn(Mock.mock(mockData));
}



module.exports = {
  API: API
}
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { send } = require('process');

//express환경설정 // 의미는 하나도 모르겠다.
app.use(express.json());
app.use(express.static(path.join(__dirname, 'textbook/build')));
app.use(bodyParser.urlencoded({extended : false}));

var auth = "";
var keyid = 3;
var userList = [
  {keyid : 1,  name : "홍길동", id:"kdhong", passwd : "1111"},
  {keyid : 2, name : "박길동", id : "kdpark", passwd : "1111"}
];

const mainPage = (req,res) => {
  res.sendFile(path.join(__dirname, 'testbook/build/index.html'));
}

const listUsers = (req,res) => {
  console.log("회원 명단 조회요청을 받았으며, 리액트에게 명단을 보냅니다.")
  res.json(userList); //.json은 객체/배열을 클라이언트에게 그대로 보낼 때
}

const addUser = (req,res) => {
  const { name, id, passwd } = req.body;
  userList.push({keyid : keyid++, name, id, passwd});
  console.log("회원등록요청을 완료하였으며, 이를 반영한 전체 목록입니다.");
  userList.map((user,i) => {
    console.log(user.keyid + "." + user.name + "." + user.id + "." + user.passwd);
  })
  return res.send('success');
}

// function filtered(list) {
//   if(list.id === )
// }

const checkUser = (req,res) => {
  const {check_id, check_passwd} = req.body;
  console.log(req.body);
  console.log("회원 존재 여부 요청받았습니다. 요청에 대한 응답은 다음과 같습니다.")
  var find_user = userList.filter(e => e.id===check_id);
  console.log('첫번째 filter 후 : ', find_user);
  var find_user = find_user.filter(o => o.passwd === check_passwd);
  console.log('filter완료 : ', find_user);
  if(find_user.length > 0) {
    console.log(find_user[0],"확인되었습니다.");
    auth = "회원으로 확인되었습니다.";
    return res.send('success');
  }
  else {
    console.log("회원정보를 확인하였으나 존재하지 않습니다.");
    auth = "존재하지 않는 회원입니다.";
    return res.send('success');
  }
}

const checkResult = (req,res) => {
  console.log("회원 확인 결과 요청받음, 리액트에게 전송")
  res.json(auth);
}

app.get("/", mainPage); //REST API binding(first page)
app.get("/users", listUsers); // user list
app.post("/users", addUser);
app.post("/checking",checkUser);
app.get("/checking",checkResult);

// 웹 서버 가동
app.listen(65020, () => {
  console.log("------------------------------");
  console.log("(리액트 연동용)웹 서버 실행중...");
  console.log("접속주소 : http://localhost:65020/");
  console.log("------------------------------");
});
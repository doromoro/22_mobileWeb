const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//express환경설정 // 의미는 하나도 모르겠다.
app.use(express.json());
app.use(express.static(path.join(__dirname, 'textbook/build')));
app.use(bodyParser.urlencoded({extended : false}));

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

app.get("/", mainPage); //REST API binding(first page)
app.get("/users", listUsers); // user list
app.post("/users", addUser);

// 웹 서버 가동
app.listen(65010, () => {
  console.log("------------------------------");
  console.log("(리액트 연동용)웹 서버 실행중...");
  console.log("접속주소 : http://localhostL65010/");
  console.log("------------------------------");
});
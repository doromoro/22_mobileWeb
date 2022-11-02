import React, { useState, useEffect } from "react";
import './App.css';

const serverURL = "http://localhost:65020/users";
const server_check_URL = "http://localhost:65020/checking";

function MemberList() {
  const[userData, setUserData] = useState(null);
  const[memberCheck, setMemberCheck] = useState("");

  const getUserData = () => {
    fetch(serverURL)
    .then((res) => res.json())
    .then((data) => setUserData(data))
    .then(console.log(userData))
  }

  const checkUserData = () => {
    fetch(server_check_URL)
    .then((res) => res.json())
    .then((auth) => setMemberCheck(auth))
    // .then((auth) => {auth ? setMemberCheck("회원으로 확인되었습니다.") : setMemberCheck("존재하지 않는 회원입니다.")})
    .then(console.log(memberCheck))
  }

  useEffect(getUserData, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const id = event.target.id.value;
    const passwd = event.target.passwd.value;
    console.log("Submit버튼 클릭 후 서버로 POST전송");
    
    fetch(serverURL, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({name,id,passwd}),
    })
    .then(getUserData())
  }

  const onSubmitChecker = (event) => {
    event.preventDefault();
    const check_id = event.target.id.value;
    const check_passwd = event.target.passwd.value;
    console.log("Submit버튼 클릭 후 서버로 POST전송");

    fetch(server_check_URL, {
      method : 'POST',
      headers : { 'Content-Type' : 'application/json', },
      body : JSON.stringify({check_id,check_passwd}),
    })
    .then(checkUserData())
  }

  return (
    <>
      <div>
        <h2>회원등록</h2>
        <form onSubmit={onSubmitHandler}>
          <input type="text" name="name" placeholder="이름"/>
          <input type="text" name="id" placeholder="아이디"/>
          <input type="text" name="passwd" placeholder="암호"/>
          <button type="submit">등록</button>
        </form>
      </div>
      <p></p>
      <div>
        <h2>회원확인</h2>
        <form onSubmit={onSubmitChecker}>
          <input type="text" name="id" placeholder="아이디"/>
          <input type="text" name="passwd" placeholder="암호"/>
          <button type="submit">확인</button>
          <p>{memberCheck}</p>
        </form>
      </div>
      <div>
        <h2>회원목록</h2>
        <ol>
          {(userData === null) ? (
            <p>서버에서 데이터를 가져오는 중...</p>
          ) : (
            userData.map((user,i) => (
              <li key={user.keyid}> {user.name} {user.id} {user.passwd} </li>
            ))
          )}
        </ol>
      </div>
    </>
  )
}

export default MemberList;
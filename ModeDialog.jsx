import React from "react";
import Dialog from "./Dialog";
// import './ModeDialog.css';

function ModeDialog (props) {


  return (
    <div>
      <Dialog title="Warning" backgroundColor="lightcoral" checkbox="동의">
        <p>주의! 계속 진행하시겠습니까?</p>
      </Dialog>
      <Dialog title="Welcome" backgroundColor="white">
        <p>어서오세요!</p>
      </Dialog>
      <Dialog title="Error" backgroundColor="yellow" checkbox="Y">
        <p>오류발생, 해결 되었나요?</p>
      </Dialog>
      <Dialog title="Notice" backgroundColor="skyblue">
        <h2>이번주 공지사항</h2>
        <p>이번주도 알차게 보낸 여러분 정말 고생많으셨습니다.</p>
        <p>고생한 여러분들을 위해 이번주는 과제가 없을 예정입니다. 박수!</p>
      </Dialog>
    </div>
  );
}

export default ModeDialog;
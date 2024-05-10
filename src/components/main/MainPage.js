import React from "react";
import styles from "styles/MainPage.module.css";

const MainPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
            <img
                src="/assets/groupgroup_logo.png"
                alt="groupgroup"
                className={styles.logo}
            />
                <div className={styles.title}>
                <div className={styles.leftbubble1}>
                    캡스톤 디자인에서<br></br>백엔드를 맡아줄 친구가 필요해
                </div>
                <br />
                <div className={styles.rightbubble}>
                    @@공모전에<br></br>함께 나갈 사람 없을까?
                </div>
                <div className={styles.leftbubble2}>
                    토익 스터디에 들어가고 싶어!
                </div>
                <br />
                <div className={styles.subtitle}>
                고민은 이제 그만 !<br />
                새로운 동료를 찾고, 함께 성장하고 싶다면
                </div>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.wrap}>
                    <div className={styles.start}>
                        지금,
                        <span style={{ color: 'navy', fontSize: '22pt', fontWeight: 'bolder'}}> GROUPGROUP</span> 에서
                        <br />
                        시작해 보세요
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.loginbutton}>로그인</button>
                        <button className={styles.signinbutton}>회원가입</button>
                    </div>
                    <div className={styles.copy}>© 2024. 완성하자. All rights reserved.</div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;

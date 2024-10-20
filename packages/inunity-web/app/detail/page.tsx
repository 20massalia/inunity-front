import styles from './Detail.module.css';

export default function Detail() {

    	return (
    		<div className={styles.div}>

      			<div className={styles.postContainer}>
        				<div className={styles.postContentWrapper}>
          					<div className={styles.userBar}>
            						<div className={styles.userHandle}>
              							<div className={styles.user}>학과사무실</div>
              							<div className={styles.departmentHandleWrapper}>
                								<div className={styles.handle}>컴퓨터공학부</div>
              							</div>
            						</div>
            						<div className={styles.spacer} />
          					</div>
          					<div className={styles.postText}>
            						<p className={styles.p}>2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.</p>
            						<p className={styles.p}>가. 시행기간: 2024. 9. 23.(월) 09:00 ~ 9. 25.(수) 17:00</p>
            						<p className={styles.p}>나. 대상: 2024학년도 2학기 17학점 이상 수강신청자 중 수강능력 부족, 적성 부적합 등 부득이한 사유로 수강을 포기하려는 자</p>
            						<p className={styles.p}>다. 포기가능 과목 수: 1과목(3학점 이내, 포기 후 수강학점이 15학점 이상이어야 함)</p>
            						<p className={styles.p}>라. 신청방법</p>
          					</div>
          					<div className={styles.postText}>
            						<p className={styles.p}>마. 처리결과: 2024. 9. 27.(금) 15:00 이후 학생 개별확인(인천대 통합정보시스템)</p>
            						<p className={styles.p}> </p>
            						<p className={styles.p}>붙임 2024학년도 2학기 수강신청 포기제도 안내문 1부. 끝.</p>
          					</div>
          					<div className={styles.timestamp}>
            						<div className={styles.date}>2024. 10. 07.</div>
          					</div>
        				</div>
        				<div className={styles.commentArea}>
          					<div className={styles.commentTitle}>
            						<div className={styles.departmentName}>댓글</div>
            						<div className={styles.commentCount}>2</div>
          					</div>
          					<div className={styles.commentList}>
            						<div className={styles.commentItem}>
              							<div className={styles.commentProfile}>
                								<div className={styles.commenterInfoWrapper}>
                  									<div className={styles.commenterNameWrapper}>
                    										<div className={styles.departmentName}>익명1</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.commentTextWrapper}>
                								<div className={styles.postText}>드랍하고 싶어요 ㅠㅠ</div>
                								<div className={styles.commentTimestamp}>2024. 06. 10. 09:00</div>
              							</div>
            						</div>
            						<div className={styles.divider}>
              							<div className={styles.divider1} />
            						</div>
            						<div className={styles.commentItem}>
              							<div className={styles.commentProfile}>
                								<div className={styles.commenterInfoWrapper}>
                  									<div className={styles.commenterNameWrapper}>
                    										<div className={styles.departmentName}>미룬이</div>
                    										<div className={styles.commenterDepartment}>{`컴퓨터공학부 `}</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.commentTextWrapper}>
                								<div className={styles.postText}>포기 할 과목을 못잡았어요 ㅠㅠ</div>
                								<div className={styles.commentTimestamp}>2024. 06. 10. 09:00</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.spacer1} />
      			</div>
    		</div>);
};


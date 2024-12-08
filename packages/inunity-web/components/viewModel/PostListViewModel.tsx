import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostListItemProps } from "ui";

export const fetchList = async () => {
  return [
    {
      title: "2024년 하반기 온라인 안전교육 실시 안내",
      author: "산학협력단",
      authorOrg: "인천대학교 연구지원팀",
      content:
        "연구실 안전환경 조성에 관한 법률에 따라 연구활동종사자는 의무적으로 안전교육을 이수하여야 합니다.\n\n■ 교육기간 : 2024. 10. 10.(목) ∼ 11. 29.(금)\n\n■ 대 상 : \n   1. 연구․실험실 내 연구활동종사자 \n   2. 실험실습교과목 수강자 (수강하는 다른 학과 학생도 포함)\n      - C언어, C++언어, 모바일소프트웨어, LINUX시스템, 알고리즘, 서버구축, 캡스턴디자인\n   3. 우리 학과 재학생 중 다른 학과 및 교양 실험실습교과목 수강자\n\n■ 교육방법 : 온라인 안전교육 ( https://safetylabs.inu.ac.kr )\n               ID/PW : 포털계정으로 로그인\n\n■ 유의사항 : 안전교육 미이수시 전과목 성적열람 제한, 실험실 출입금지 및 사고발생시 보험 미처리 등 불이익을 받을수 있음",
      date: "2024-09-15",
      likes: 42,
      bookmarks: 87,
      postId: "1",
      isLiked: false,
      isBookmarked: false,
    },
    {
      title: "컴퓨터공학과 2024 겨울방학 해외 인턴십 프로그램 모집",
      author: "김지훈",
      authorOrg: "컴퓨터공학과 학생회",
      content:
        "컴퓨터공학과 학생들을 위한 2024 겨울방학 해외 인턴십 프로그램 모집 공고입니다!\n\n🌍 모집 기간: 2024년 10월 1일 ~ 10월 31일\n\n🏢 참여 기업:\n- Google (미국 실리콘밸리)\n- LINE (일본 도쿄)\n- Tencent (중국 심천)\n\n📝 지원 자격:\n1. 컴퓨터공학과 3-4학년 재학생\n2. TOEIC 800점 이상 또는 동등 어학능력 보유자\n3. 관련 프로그래밍 언어 및 기술 역량 증명 필요\n\n💻 제출 서류:\n- 영문 이력서\n- 자기소개서\n- 포트폴리오\n- 어학능력 증명서\n\n📧 문의: intern@csdepart.inu.ac.kr",
      date: "2024-09-20",
      likes: 76,
      bookmarks: 54,
      postId: "2",
      isLiked: false,
      isBookmarked: false,
    },
    {
      title: "2024 SW 창의설계 경진대회 개최 안내",
      author: "이승철",
      authorOrg: "SW중심대학사업단",
      content:
        "창의적인 SW 아이디어를 가진 학생들의 참여를 환영합니다!\n\n🏆 대회 개요:\n- 일시: 2024년 11월 15일 ~ 11월 17일\n- 장소: 인천대학교 제2공학관 대강당\n\n🔍 대회 부문:\n1. AI/빅데이터 부문\n2. 모바일 앱 개발 부문\n3. IoT 서비스 부문\n4. 웹 서비스 부문\n\n🎁 시상 내역:\n- 대상 (1팀): 상금 500만원 및 총장상\n- 최우수상 (2팀): 각 300만원\n- 우수상 (3팀): 각 100만원\n\n📋 참가 신청:\n- 온라인 접수: http://swcenter.inu.ac.kr\n- 접수 기간: 2024년 10월 1일 ~ 10월 31일\n\n📞 문의: 032-123-4567 (SW중심대학사업단)",
      date: "2024-09-25",
      likes: 93,
      bookmarks: 67,
      postId: "3",
      isLiked: false,
      isBookmarked: false,
    },
    {
      title: "새로운 머신러닝 스터디그룹 모집합니다!",
      author: "박현정",
      authorOrg: "AI & 데이터사이언스 학회",
      content:
        "머신러닝에 관심 있는 학생들의 열정적인 스터디그룹에 함께할 멤버를 모집합니다!\n\n🤖 스터디 주제:\n- 머신러닝 기초부터 고급 알고리즘까지\n- Python 및 TensorFlow, PyTorch 실습\n- 최신 AI 논문 리뷰 및 프로젝트 수행\n\n📅 모집 일정:\n- 모집 기간: 2024년 10월 5일 ~ 10월 20일\n- 오리엔테이션: 2024년 10월 25일 금요일 18:00\n- 장소: 제2공학관 AI LAB\n\n👥 모집 인원:\n- 총 10명 (학부 및 대학원생)\n- 선착순 마감\n\n📝 지원 방법:\n- 이메일 접수: aigroup@inu.ac.kr\n- 제출 서류: 자기소개서, 관심 분야 간단한 설명\n\n🌟 특별 혜택:\n- 우수 참여자 AI 컨퍼런스 참가 지원\n- 프로젝트 우수팀 시상\n\n함께 성장하며 배우는 멋진 커뮤니티에 여러분을 초대합니다!",
      date: "2024-09-28",
      likes: 112,
      bookmarks: 45,
      postId: "4",
      isLiked: false,
      isBookmarked: false,
    },
    {
      title: "2025학년도 정시모집 입학전형 시행계획 공고",
      author: "입학처",
      authorOrg: "인천대학교 입학관리팀",
      content:
        "2025학년도 인천대학교 정시모집 입학전형 시행계획을 다음과 같이 공고합니다.\n\n📅 주요 일정:\n- 원서접수: 2024년 12월 30일(토) ~ 2025년 1월 2일(화)\n- 서류제출 마감: 2025년 1월 3일(수)\n- 면접고사: 2025년 1월 15일(월) ~ 1월 17일(수)\n- 합격자 발표: 2025년 1월 25일(토)\n\n📋 모집인원:\n- 인문대학: 125명\n- 사회과학대학: 150명\n- 자연과학대학: 200명\n- 공과대학: 300명\n- 예술체육대학: 50명\n\n🔍 전형방법:\n- 학생부 70% + 수능 30%\n- 일부 학과 면접 반영\n\n📝 주요 변경사항:\n- 수능 최저학력기준 완화\n- 농어촌학생 특별전형 확대\n\n🌐 자세한 내용은 대학 입학처 홈페이지(www.inu.ac.kr/ipak) 참조",
      date: "2024-10-01",
      likes: 67,
      bookmarks: 92,
      postId: "5",
      isLiked: false,
      isBookmarked: false,
    },
  ];
};

export interface PostListDto {
  title: string;
  avatarUrl?: string;
  author: string;
  authorOrg: string;
  content: string;
  date: string;
  likes: number;
  bookmarks: number;
  postId: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export default function usePostListViewModel() {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetchList().then(async (res) => {
        return res as PostListDto[];
      }),
  });
  const queryClient = useQueryClient();

  const toggleLike = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevPost = queryClient.getQueryData<PostListDto[]>(["posts"]);
      queryClient.setQueryData(
        ["posts"],
        prevPost?.map((post) =>
          post.postId === id
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
      // Todo: Server
      // ㅅ서버에서 변경 시도 . 실패/성공 둘다ㅣ 데이터 다시 가져옴
      // queryClient.invalidateQueries();
    },
  });
  const toggleBookmark = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevPost = queryClient.getQueryData<PostListItemProps[]>(["posts"]);
      queryClient.setQueryData(
        ["posts"],
        prevPost?.map((post) =>
          post.postId === id
            ? {
                ...post,
                isBookmarked: !post.isBookmarked,
                bookmarks: post.isBookmarked
                  ? post.bookmarks - 1
                  : post.bookmarks + 1,
              }
            : post
        )
      );
      // Todo: Server
    },
  });

  return { posts, toggleLike, toggleBookmark };
}

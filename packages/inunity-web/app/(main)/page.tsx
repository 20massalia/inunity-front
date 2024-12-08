import HomeContainer from "@/components/container/HomeContainer";
import SafeAreaView from "@/components/SafeAreaView";
import { NoticeDto } from "@/components/viewModel/HomeViewModel";
import { PostListDto } from "@/components/viewModel/PostListViewModel";
import getDehydratedQuery from "@/lib/getDehydratedQuery";
import { Hydration } from "@/lib/Hydration";
import { PostListItemProps } from "ui";

//SSR 파트
export default async function Page() {
  const scheduleQuery = await getDehydratedQuery({
    queryKey: ["schedules"],
    queryFn: () => {
      // mocked function
      return [
        {
          name: "수강신청",
          dateStart: new Date("2024-02-01"),
          dateEnd: new Date("2024-02-20"),
        },
        {
          name: "수강신청2",
          dateStart: new Date("2024-03-01"),
          dateEnd: new Date("2024-03-20"),
        },
        {
          name: "수강신청3",
          dateStart: new Date("2024-04-01"),
          dateEnd: new Date("2024-04-20"),
        },
      ];
    },
  });
  const noticesQuery = await getDehydratedQuery<NoticeDto[]>({
    queryKey: ["notices"],
    queryFn: () => {
      // mocked function
      return [
        {
          author: '작성자',
          isBookmarked: false,
          date: '2024-01-01',
          content: '대충 내용입니다.',
          avatarUrl: '',
          postId: '2',
          title: '제목입니다.'
        },
      ];
    },
  });
  //
  const postQuery = await getDehydratedQuery<PostListDto[]>({
    queryKey: ["posts"],
    queryFn: () => {
      // mocked function
      return [
        {
          title: 'this is title',
          author: "author",
          avatarUrl: 'https://github.com/KimWash.png',
          authorOrg: "CS",
          content: "this is test post",
          date: "2023-08-15",
          likes: 12,
          bookmarks: 5,
          postId: "2",
          isLiked: false,
          isBookmarked: false,
        },
      ];
    },
  });
  return (
    <SafeAreaView>
      <Hydration queries={[scheduleQuery, postQuery, noticesQuery]}>
        <HomeContainer />
      </Hydration>
  );
}

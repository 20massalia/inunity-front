import HomeContainer from "@/components/container/HomeContainer";
import getDehydratedQuery from "@/lib/getDehydratedQuery";
import { Hydration } from "@/lib/Hydration";

//SSR 파트 
export default async function Page() {
    const scheduleQuery = await getDehydratedQuery({
        queryKey: ['schedule'],
        queryFn: () => {
            // mocked function
            return [
                { name: '수강신청', dateStart: new Date('2024-02-01'), dateEnd: new Date('2024-02-20') },
                { name: '수강신청2', dateStart: new Date('2024-03-01'), dateEnd: new Date('2024-03-20') },
                { name: '수강신청3', dateStart: new Date('2024-04-01'), dateEnd: new Date('2024-04-20') }
            ]
        }
    });
    // 
    const postQuery = await getDehydratedQuery({
        queryKey: ['posts'],
        queryFn: () => {
            // mocked function
            return [{
                name: 'author',
                department: 'CS',
                content: 'this is test post',
                date: '2023-08-15',
                likes: 12,
                bookmarks: 5,
                postId: '2',
                isLiked: false,
                isBookmarked: false
            }]
        }
    });
    return <Hydration queries={[scheduleQuery, postQuery]}>
        <HomeContainer />
    </Hydration>
}
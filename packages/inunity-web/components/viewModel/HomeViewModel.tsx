import { Query, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { PostListItemProps } from "ui";


// 원래는 여기 있으면 안됨, 스케쥴 테스트용 dto
export type ScheduleDto = {
    name: string;
    dateStart: Date;
    dateEnd?: Date;
}

export type HomeViewModel = {
    schedules: UseQueryResult<ScheduleDto[]>
    posts: UseQueryResult<PostListItemProps[]>
    likePost: UseMutationResult<void, Error, string, unknown>
    bookmarkPost: UseMutationResult<void, Error, string, unknown>
}

// useQuery 함수들 호출을 통해 필요한 데이터를 가져오고, 화면에 맞게 가공하는 레이어
export default function useHomeViewModel(): HomeViewModel {
    const queryClient = useQueryClient();
    // queryFn이 없는 경우 이미 있는 값을 쓴다. (캐시)
    const schedules = useQuery<ScheduleDto[]>({ queryKey: ['schedule'] });
    const posts = useQuery<PostListItemProps[]>({ queryKey: ['posts'], });
    const likePost = useMutation({
        mutationFn: async (id: string) => {
            // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
            const prevPost = queryClient.getQueryData<PostListItemProps[]>(['posts']);
            queryClient.setQueryData(['posts'], prevPost?.map(post => post.postId === id ? ({...post, isLiked: !post.isLiked}) : post));
            // Todo: Server
        }
    })
    const bookmarkPost = useMutation({
        mutationFn: async (id: string) => {
            // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
            const prevPost = queryClient.getQueryData<PostListItemProps[]>(['posts']);
            queryClient.setQueryData(['posts'], prevPost?.map(post => post.postId === id ? ({...post, isBookmarked: !post.isBookmarked}) : post));
            // Todo: Server
        }
    })

    return {
        schedules,
        posts,
        likePost,
        bookmarkPost
    }

}
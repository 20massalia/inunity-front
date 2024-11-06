import { Query, useQuery, UseQueryResult } from "@tanstack/react-query";
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
}

// useQuery 함수들 호출을 통해 필요한 데이터를 가져오고, 화면에 맞게 가공하는 레이어
export default function useHomeViewModel(): HomeViewModel {
    const schedules = useQuery<ScheduleDto[]>({ queryKey: ['schedule'] });
    const posts = useQuery<PostListItemProps[]>({ queryKey: ['posts'], });

    return {
        schedules,
        posts
    }

}
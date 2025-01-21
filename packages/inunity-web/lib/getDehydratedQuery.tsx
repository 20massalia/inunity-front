import {
  QueryClient,
  FetchQueryOptions,
  QueryKey,
  dehydrate,
  QueryState,
  FetchInfiniteQueryOptions,
} from "@tanstack/react-query";

export default async function getDehydratedQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(args: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  // Client 생성 (캐시 데이터들 저장하는 곳)
  const queryClient = new QueryClient();
  // Client에다가 데이터 불러와서 저장 
  await queryClient.prefetchQuery(args);
  // Client 직렬화
  const { queries, mutations } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter(
    (query) =>
      query.queryHash === (args.queryHash ?? JSON.stringify(args.queryKey))
  );


  return {
    ...dehydratedQuery,
    state: dehydratedQuery.state as QueryState<TData, Error>
  }
}

export async function getDehydratedInfiniteQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
>(args: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(args);
  const { queries } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter(
    (query) =>
      query.queryHash === (args.queryHash ?? JSON.stringify(args.queryKey))
  );
  console.log(args.queryKey, dehydratedQuery)

  return {
    ...dehydratedQuery,
    state: dehydratedQuery?.state as QueryState<TData, Error>
  }
}


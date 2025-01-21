import ActivityListContainer from "./container";

export default function Page({params}: {params: {activity: 'article'|'comment'}}) {
  return <ActivityListContainer activity={params.activity}/>
}
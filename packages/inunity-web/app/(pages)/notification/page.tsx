import NotificationListContainer from "@/app/(pages)/notification/container";
import { NotificationQueryOptions } from "@/entities/notification/hooks/useServerNotification";
import NotificationItem from "@/features/notification/ui/NotificationItem";
import getDehydratedQuery, {
  getDehydratedInfiniteQuery,
} from "@/lib/getDehydratedQuery";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";

export default async function Page() {
  // const boardNotificationQuery = await getDehydratedInfiniteQuery(
  //   NotificationQueryOptions
  // );

  return (
    <SafeAreaView>
      <Hydration queries={[]}>
        <NotificationListContainer />
      </Hydration>
    </SafeAreaView>
  );
}

import { MessageList } from "@/app/features/messages/components/messages-list";
import { ContentLayout } from "@/components/layouts/content-layout";

const MessagesRoute = () => {
  return (
    <ContentLayout title="Messages">
      <MessageList />
    </ContentLayout>
  );
};

export { MessagesRoute };

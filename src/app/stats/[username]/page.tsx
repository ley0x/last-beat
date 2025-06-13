import Header from "@/components/_common/header";
import { Main } from "@/components/_common/main";
import { Wrapper } from "@/components/_common/wrapper";

import { Profile } from "@/components/profile";

import { SelectTimeframe } from "@/components/top/select-timeframe";

import {
  lastFmUserGetFriends,
  lastFmUserGetInfo,
  lastFmUserGetTopTags,
} from "@/lib/lastfm";
import { TopContainer } from "@/components/top/top-container";

import { ReactQueryProvider } from "@/components/_common/react-query-provider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComingSoon } from "@/components/_common/comming-soon";
export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await lastFmUserGetInfo(username);
  const friends = await lastFmUserGetFriends(username, 20);
  const tags = await lastFmUserGetTopTags(username, "1month");

  return (
    <Main className="flex-col">
      <Profile data={profile} />
      <Wrapper className="flex-col gap-5 py-5">
        <ReactQueryProvider>
          <Tabs defaultValue="trendings" className="w-full">
            <TabsList className="bg-secondary/60 w-full gap-2 border-0 shadow">
              <TabsTrigger
                value="trendings"
                className="cursor-pointer shadow-none data-[state=active]:shadow-none border-0 dark:data-[state=active]:bg-card"
              >
                <span>🎤</span>
                <span>Trendings</span>
              </TabsTrigger>
              <TabsTrigger
                value="charts"
                className="cursor-pointer border data-[state=active]:shadow-none dark:border-0 dark:data-[state=active]:bg-card"
              >
                <span>📊</span>
                <span>Charts</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trendings" className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <Header as="h1">
                  Your <span className="text-primary">Last.fm</span> statistics
                </Header>
                <SelectTimeframe />
              </div>
              <TopContainer username={username} tags={tags} friends={friends} />
            </TabsContent>
            <TabsContent value="charts" className="flex flex-col gap-5">
              <ComingSoon />
            </TabsContent>
          </Tabs>
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  );
}

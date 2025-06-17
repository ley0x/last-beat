import Header from "@/components/_common/header";
import { Main } from "@/components/_common/main";
import { Wrapper } from "@/components/_common/wrapper";
import { ReactQueryProvider } from "@/components/_common/react-query-provider";
import { ComingSoon } from "@/components/_common/comming-soon";

import { Profile } from "@/app/stats/_components/profile";
import { SelectTimeframe } from "@/app/stats/_components/top/select-timeframe";
import { TopContainer } from "@/app/stats/_components/top/top-container";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { LastFmTopTags, LastFmUserFriends, LastFmUserInfo, UsernameSchema } from "@lib/schemas";
import { environment } from "@lib/env";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = z.object({ username: UsernameSchema }).parse(await params);
  const profile = await fetch(`${environment.HOST}/api/lastfm/user/info?q=${username}`).then(res => res.json()).then(data => LastFmUserInfo.parse(data.data));
  const friends = await fetch(`${environment.HOST}/api/lastfm/user/friends?q=${username}&limit=20`).then(res => res.json()).then(data => LastFmUserFriends.array().parse(data.data));
  const tags = await fetch(`${environment.HOST}/api/lastfm/user/tags?q=${username}&timeframe=1month&limit=10`).then(res => res.json()).then(data => LastFmTopTags.array().parse(data.data));

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

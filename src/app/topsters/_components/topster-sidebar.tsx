"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TopsterAlbumSearch } from "./topster-album-search"
import { TopsterOptions } from "./topster-options"
import { Disc3, Import, Wrench } from "lucide-react"
import { ImportLastfm } from "./import-lastfm";
import Divider from "@common/divider";

export function TopsterSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="add-release" className="">
        <TabsList className="w-full bg-input/30 border">
          <TabsTrigger value="add-release" className="cursor-pointer border-0 active:shadow"><Disc3 /> Add release</TabsTrigger>
          <TabsTrigger value="options" className="cursor-pointer border-0 active:shadow"><Wrench /> Options</TabsTrigger>
          <TabsTrigger value="import" className="cursor-pointer border-0 active:shadow"><Import /> Import</TabsTrigger>
        </TabsList>
        <TabsContent value="add-release">
          <Card className="bg-card/20 gap-4">
            <CardHeader>
              <CardTitle>Add release</CardTitle>
              <CardDescription>
                Add a new release to your Topsters. Results are provided by Last.fm.
              </CardDescription>
            </CardHeader>
            <Divider className="my-0" />
            <CardContent>
              <TopsterAlbumSearch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="options">
          <Card className="gap-4 bg-card/20">
            <CardHeader>
              <CardTitle>Options</CardTitle>
              <CardDescription>
                Manage your Topsters options here.
              </CardDescription>
            </CardHeader>
            <Divider className="my-0" />
            <CardContent className="flex flex-col gap-2" >
              <TopsterOptions />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="import">
          <ImportLastfm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

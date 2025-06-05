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

export function TopsterSidebar() {
  return (
    <div className="flex w-96 max-w-full flex-col gap-6">
      <Tabs defaultValue="add-release" className="">
        <TabsList className="w-full bg-input/30 border">
          <TabsTrigger value="add-release" className="border-0 active:shadow"><Disc3 /> Add release</TabsTrigger>
          <TabsTrigger value="options" className="border-0 active:shadow"><Wrench /> Options</TabsTrigger>
          <TabsTrigger value="import" className="border-0 active:shadow"><Import /> Import</TabsTrigger>
        </TabsList>
        <TabsContent value="add-release">
          <Card>
            <CardHeader>
              <CardTitle>Add release</CardTitle>
              <CardDescription>
                Add a new release to your Topsters. Results are provided by Last.fm.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[550px]">
              <TopsterAlbumSearch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="options">
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
              <CardDescription>
                Manage your Topsters options here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 h-[550px]" >
              <TopsterOptions />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import</CardTitle>
              <CardDescription>
                Import your last.fm monthly top albums.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[550px]">
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Button } from "~/components/ui/button";
import { db } from "~/server/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { SafeHtmlRender } from "~/components/tipTap/SafeHtmlRender";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <div className="grow content-start bg-gray-100 px-4 text-center">
      <div className="divide-y-2 divide-gray-200 md:px-16">
        {posts.map((post) => {
          return (
            <div key={post.id} className="py-4">
              <SafeHtmlRender key={post.id} content={post.content} />
            </div>
          );
        })}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="fixed right-4 top-20 rounded-full border border-gray-300 bg-white px-4 py-2 text-lg font-bold shadow-md hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
            +
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>CREATE YOUR OWN CONTENT!</DialogTitle>
            <DialogDescription>
              Here you can add your own content to the website. 
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

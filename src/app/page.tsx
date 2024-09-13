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
    <div className="grow content-center bg-gray-100 px-4 text-center">
      hey {posts.map((post) => <SafeHtmlRender key={post.id} content={post.content} />)}
      
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="fixed right-4 top-20 rounded-full text-lg font-bold"
          >
            +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

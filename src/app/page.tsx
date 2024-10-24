import dynamic from "next/dynamic";
import { CreateComment } from "~/components/editor/createComment";
import { UpdateComment } from "~/components/editor/updateComment";
import { getPosts } from "~/server/postsQeries";
import Image from "next/image";
import HeadImage from "../assets/images/head_image.jpg";
import { Yuji_Boku } from "next/font/google";
import {quotes} from "~/lib/quotes";

const DeleteComment = dynamic(
  () => import("~/components/editor/deleteComment"),
  { ssr: false },
);

const yujiBoku = Yuji_Boku({ subsets: ["latin"], weight: "400" });

type QuoteProps = {
  quote: string;
  romanization: string;
  meaning: string;
  author: string;
}

type QuotesType = {
  quotes: QuoteProps[];
}

export default async function HomePage() {
  const posts = await getPosts();

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="">
      <div className="relative hidden justify-center bg-black md:flex">
        <div className={`${yujiBoku.className} absolute top-8 left-72 text-white text-5xl z-50 max-h-80 text-pretty text-end break-words`}>
          <p style={{ writingMode: 'vertical-rl', textOrientation: 'upright', direction: 'rtl', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'}}>{quote?.quote}</p>
        </div>
        <div className={`${yujiBoku.className} absolute bottom-8 right-48 text-white text-xl z-50 max-h-96 text-pretty text-end`}>
          {quote?.author !== "Japanese proverb" && (<p>~ {quote?.author}</p>)}
        </div>
        <Image
          src={HeadImage}
          alt="Main logo"
          className=""
          style={{
            maskImage:
              "linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%)",
          }}
        />
      </div>
      <CreateComment />
      <div className="bg-background px-4 md:px-40">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2 md:px-16">
            <div className="flex cursor-pointer justify-end gap-1 pe-8 pt-2">
              <UpdateComment postId={post.id} />
              <DeleteComment postId={post.id} />
            </div>
            <div
              className="ProseMirror px-6 py-4"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

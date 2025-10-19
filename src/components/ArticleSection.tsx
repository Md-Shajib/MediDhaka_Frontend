import { articlesData } from "@/constant/article";
import ArticleCard from "./ArticleCard";

export default function ArticleSection() {
  return (
    <>
      <div className="min-h-screen bg-[#ebf4ff] py-12 sm:py-20 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-xl md:text-3xl font-bold text-primary mb-4 inline-block pb-1">
            Recent Articles
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {articlesData.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

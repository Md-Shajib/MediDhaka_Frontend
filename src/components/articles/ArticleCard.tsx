import { Clock, Calendar, User } from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageTheme: string;
  imageOverlayText: string;
  author: string;
  specialty: string;
  date: string;
  readTime: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <>
      <div className="flex flex-col group relative overflow-hidden rounded-xl bg-[#ebf4ff] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-[1.01]">
        <div className={`relative h-40 overflow-hidden flex-shrink-0`}>
          <div
            className={`absolute top-0 left-0 w-3/5 h-full ${article.imageTheme} transform -skew-x-12 origin-top-left -ml-16`}
          />
          <img
            src={article.imageUrl}
            alt={article.title}
            className="absolute right-0 w-full h-full object-cover z-10"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <a href="#" className="hover:text-blue-600 transition duration-150">
            <h2 className="text-xl font-bold text-gray-800 mb-2 leading-snug group-hover:underline">
              {article.title}
            </h2>
          </a>
          <p className="text-gray-500 mb-4 flex-grow text-base">
            {article.description}
          </p>

          <div className="border-t border-gray-100 pt-4 text-sm text-gray-600 space-y-2">
            <p className="flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-semibold text-gray-700">
                {article.author}
              </span>{" "}
              in {article.specialty}
            </p>
            <div className="flex items-center justify-between">
              <p className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                {article.date}
              </p>
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                {article.readTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

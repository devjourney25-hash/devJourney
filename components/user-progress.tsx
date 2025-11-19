import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  activeCourse: { imageSrc: string; title: string }; 
  hearts: number;
  points: number;
};

export const UserProgress = ({
  activeCourse,
  points,
  hearts,
}: Props) => {
  const isExternalImage = activeCourse.imageSrc?.startsWith("http");

  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      {/* Active Course Button */}
      <Link href="/courses">
        <Button variant="ghost" aria-label={`Current course: ${activeCourse.title}`}>
          {isExternalImage ? (
            <Image
              src={activeCourse.imageSrc}
              alt={activeCourse.title}
              className="rounded-md border"
              width={32}
              height={32}
              style={{ width: 'auto', height: 'auto' }}
            />
          ) : (
            <Image
              src={activeCourse.imageSrc}
              alt={activeCourse.title}
              className="rounded-md border"
              width={32}
              height={32}
              style={{ width: 'auto', height: 'auto' }}
            />
          )}
        </Button>
      </Link>

      {/* Points Button */}
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500" aria-label={`Points: ${points}`}>
          <Image 
            src="/point.png" 
            height={28} 
            width={28} 
            alt="Points" 
            className="mr-2"
            style={{ width: 'auto', height: 'auto' }}
          />
          {points}
        </Button>
      </Link>

      {/* Hearts Button */}
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500" aria-label={`Hearts: ${hearts}`}>
          <Image 
            src="/heart.png" 
            height={22} 
            width={22} 
            alt="Hearts" 
            className="mr-2"
            style={{ width: 'auto', height: 'auto' }}
          />
          {hearts}
        </Button>
      </Link>
    </div>
  );
};
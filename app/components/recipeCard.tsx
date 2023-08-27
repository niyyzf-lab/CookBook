import React, { useRef, useState, useEffect } from "react";
import type { RecipeItem } from "~/help/typeHelps";
import { Icon } from "@iconify/react";
import Lazyimg from "react-lazyimg-component";
import { animated, useSpring } from "@react-spring/web";

const imageURL = "https://images.weserv.nl/?url=";

const HeartIcon = ({ num }: { num: number | undefined }) => {
  if (!num) {
    num = 0;
  }
  if (num > 10000) {
    return <Icon icon="ph:heart-fill" className=" text-yellow-400 text-lg" />;
  } else if (num > 1000) {
    return <Icon icon="ph:heart-fill" className=" text-red-500 text-lg" />;
  } else if (num > 100) {
    return <Icon icon="ph:heart-duotone" className=" text-red-400 text-lg" />;
  }
  return <Icon icon="ph:heart-half" className="text-red-300" />;
};

interface DifficultyShowProps {
  difficulty?: string;
}

function DifficultyShow({ difficulty }: DifficultyShowProps) {
  const starCount = difficulty === "困难" ? 3 : 1;
  const stars = Array.from({ length: starCount }, (_, index) => (
    <Icon key={index} icon="ph:star-fill" />
  ));

  return <>{stars}</>;
}

function numFormat(num?: number): string | number {
  if (!num) {
    return "?";
  }
  if (num > 10000) {
    return (num / 10000).toFixed(1) + "W";
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
}

interface RecipeCardProps {
  recipeItem: RecipeItem;
}

function RecipeCard({ recipeItem }: RecipeCardProps) {
  const { pic, face, difficulty, emojis, stat, name } = recipeItem;
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 1000, friction: 80 },
  });
  return (
    <div
      onClick={() => setFlipped((state) => !state)}
      className="flex items-center"
    >
      {flipped && (
        <animated.div
          className="bg-base-100 shadow-xl h-[600px] w-[calc(100vw-50px)] card lg:card-side"
          style={{
            opacity,
            transform,
            rotateX: "180deg",
          }}
        >
          <figure>
            <Lazyimg
              className="lazy h-[600px] "
              src={`${imageURL}${pic}@600h_20q.webp`}
            />
          </figure>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
          </div>
        </animated.div>
      )}
      {!flipped && (
        <animated.div
          className=" bg-base-100 shadow-xl rounded-lg p-4  border border-base-300 items-center "
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <div className=" flex  items-center justify-items-stretch w-full justify-between gap-x-2">
            <h2 className="text-xl font-semibold">{name}</h2>
            <span className="flex items-center gap-x-1">
              <HeartIcon num={stat?.like} />
              {numFormat(stat?.like)}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <p>食材：</p>
              <div className="flex flex-wrap">
                {emojis
                  ?.filter((item) => item !== null)
                  .map((item, index) => (
                    <span key={index} className="text-2xl">
                      <Icon icon={item} />
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default RecipeCard;

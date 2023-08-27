import React, { useState } from "react";
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

const EmojisShow = ({ emojis }: { emojis?: string[] }) => {
  if (!emojis) {
    return null;
  } else if (emojis.length >= 5) {
    return <Icon icon="fluent-emoji:pot-of-food" className="text-2xl" />;
  }
  return (
    <div className="flex">
      {emojis
        ?.filter((item) => item !== null)
        .map((item, index) => (
          <span key={index} className="text-2xl">
            <Icon icon={item} />
          </span>
        ))}
    </div>
  );
};

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
  const colesCard = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setFlipped(false);
  };
  return (
    <div
      onClick={() => setFlipped(true)}
      className="flex items-center w-fit max-w-full"
    >
      {flipped && (
        <animated.div
          className="bg-base-100 shadow-xl w-[calc(100vw-50px)] lg:w-fit card lg:card-side lg:h-[300px] border border-blue-200 bg-blue-300/20 text-blue-700 "
          style={{
            opacity,
            transform,
            rotateX: "180deg",
          }}
        >
          <figure>
            <Lazyimg
              className="lazy lg:h-[300px] w-full"
              src={`${imageURL}${pic}@300h_20q.webp`}
            />
          </figure>
          <div>
            <h2 className=" font-medium">{name}</h2>
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
            <button
              className="btn btn-ghost btn-sm rounded-btn bg-red-300/20 "
              onClick={colesCard}
            >
              关闭
            </button>
          </div>
        </animated.div>
      )}
      {!flipped && (
        <animated.div
          className=" bg-base-100 shadow-xl rounded-lg px-3 py-1  border  items-center  max-w-full border-blue-200 bg-blue-300/20 text-blue-700 "
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <div className=" flex items-center justify-items-stretch w-full justify-between gap-x-2 ">
            <EmojisShow emojis={emojis} />
            <h2 className=" font-medium truncate ">{name}</h2>
            <span className="flex items-center gap-x-1">
              <HeartIcon num={stat?.like} />
              {numFormat(stat?.like)}
            </span>
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default RecipeCard;

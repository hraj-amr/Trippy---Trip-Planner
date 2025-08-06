"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCity() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destinations to Visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const Paris = () => {
  return (
    // The loop has been removed, and we return a single div directly.
    <div
      className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
    >
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto text-center">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Eiffel Tower
        </span>
        <br />
        A global cultural icon of France, the Eiffel Tower is one of the most recognizable structures in the world.
      </p>
      <img
        src="https://images.unsplash.com/photo-1566412608885-68c9e5500417?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fEVpZmZlbCUyMFRvd2VyfGVufDB8MHwwfHx8MA%3D%3D"
        alt="A view of the Eiffel Tower in Paris"
        height="500"
        width="500"
        className="mt-8 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};

const NYC = () => {
  return (
    // The loop has been removed, and we return a single div directly.
    <div
      className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
    >
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto text-center">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
        New York City
        </span>
        <br />
        A forest of steel and glass, high-rise buildings are the defining features of the modern city, piercing the clouds to create a breathtaking skyline of human ambition and ingenuity.      </p>
      <img
        src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmV3JTIwWW9ya3xlbnwwfDB8MHx8fDA%3D"
        alt="A view of the Eiffel Tower in Paris"
        height="500"
        width="500"
        className="mt-8 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};

const Tokyo = () => {
  return (
    // The loop has been removed, and we return a single div directly.
    <div
      className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
    >
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto text-center">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Shibuya
        </span>
        <br />
        A vibrant, neon-lit crossroads that serves as the energetic heart of Tokyo's youth culture and fashion.
      </p>
      <img
        src="https://images.unsplash.com/photo-1532236204992-f5e85c024202?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fFRva3lvfGVufDB8MHwwfHx8MA%3D%3D"
        alt="A view of the Eiffel Tower in Paris"
        height="500"
        width="500"
        className="mt-8 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};
const Rome = () => {
  return (
    // The loop has been removed, and we return a single div directly.
    <div
      className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
    >
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto text-center">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Rome
        </span>
        <br />
        A sprawling, living museum where millennia of history, art, and faith are etched into the very fabric of modern life.      </p>
      <img
        src="https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Um9tZXxlbnwwfDB8MHx8fDA%3D"
        alt="A view of the Eiffel Tower in Paris"
        height="500"
        width="500"
        className="mt-8 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};
const Dubai = () => {
  return (
    // The loop has been removed, and we return a single div directly.
    <div
      className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
    >
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto text-center">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Dubai
        </span>
        <br />
A dazzling desert metropolis of futuristic superlatives, where boundless ambition is showcased through opulent luxury and record-breaking architecture.      </p>
      <img
        src="https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RHViYWl8ZW58MHwwfDB8fHww"
        alt="A view of the Eiffel Tower in Paris"
        height="500"
        width="500"
        className="mt-8 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};
const India = () => {
  return (
    // The loop has been removed, and we return a single div directly.
    <div
      className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
    >
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto text-center">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          India
        </span>
        <br />
A vast and ancient tapestry of staggering diversity, where timeless spiritual traditions are woven into the vibrant, chaotic, and ambitious fabric of a modern global power.      </p>
      <img
        src="https://images.unsplash.com/photo-1499123785106-343e69e68db1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fEluZGlhfGVufDB8MHwwfHx8MA%3D%3D"
        alt="A view of the Eiffel Tower in Paris"
        height="500"
        width="500"
        className="mt-8 md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};


const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights - Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1632952295607-c0b3df5764fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVpZmZlbCUyMHRvd2VyJTIwbmlnaHR8ZW58MHx8MHx8fDA%3D",
    content: <Paris />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC - Times Square, Central Park, Broadway",
    src: "https://images.unsplash.com/photo-1448317971280-6c74e016e49c?q=80&w=632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <NYC />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo - Shibuya, Cherry Blossoms, Temples",
    src: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <Tokyo />,
  },

  {
    category: "Rome, Italy",
    title: "Walk through History - Colosseum, Vatican, Roman Forum",
    src: "https://images.unsplash.com/photo-1603199766980-fdd4ac568a11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvbWV8ZW58MHx8MHx8fDA%3D",
    content: <Rome />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation - Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1720950069906-961831d992a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fER1YmFpJTIwNGt8ZW58MHx8MHx8fDA%3D",
    content: <Dubai />,
  },
  {
    category: "India",
    title: "Harbour Views - Opera House, Bondi Beach & Wildlife",
    src: "https://images.unsplash.com/photo-1524311614474-8013dc7ac652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGluZGlhfGVufDB8MXw0fHx8MA%3D%3D",
    content: <India />,
  },
];

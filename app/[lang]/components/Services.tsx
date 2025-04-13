'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function Solution({
  title,
  description,
  index,
  open,
  setOpen,
  linkH,
  learnMore,
}: {
  title: string;
  description: string;
  index: number;
  open: number;
  setOpen: Dispatch<SetStateAction<number>>;
  linkH: string;
  learnMore: string;
}) {
  const isOpen = index === open;
  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(linkH);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setOpen(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setOpen(index);
        }
      }}
      className="p-0.5 rounded-lg relative overflow-hidden cursor-pointer"
    >
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? '240px' : '72px',
        }}
        className="p-6 rounded-[7px] bg-white flex flex-col justify-between relative z-20"
      >
        <div>
          <motion.p
            initial={false}
            animate={{
              color: isOpen ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)',
            }}
            className="text-xl font-medium w-fit bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text"
          >
            {title}
          </motion.p>
          <motion.p
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
            }}
            className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            {description}
          </motion.p>
        </div>
        <motion.button
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
          }}
          onClick={handleNavigate}
          className="-ml-6 -mr-6 -mb-6 mt-4 py-2 rounded-b-md flex items-center justify-center gap-1 group transition-[gap] bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
        >
          <span>{learnMore}</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-violet-600 to-indigo-600"
      />
      <div className="absolute inset-0 z-0 bg-slate-200" />
    </div>
  );
}

function Services({ dictionary, lang }: { dictionary: any; lang: string }) {
  const solutions = [
    {
      id: 1,
      title: `${dictionary.Home.services.services[0].title}`,
      description: `${dictionary.Home.services.services[0].desc}`,
      imgSrc:
        'https://images.unsplash.com/photo-1555695232-57d88cacdfa5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      href: `${lang}/search`,
    },
    {
      id: 2,
      title: `${dictionary.Home.services.services[1].title}`,
      description: `${dictionary.Home.services.services[1].desc}`,
      imgSrc:
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      href: `${lang}/searchRepair`,
    },
    {
      id: 3,
      title: `${dictionary.Home.services.services[2].title}`,
      description: `${dictionary.Home.services.services[2].desc}`,
      imgSrc:
        'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhciUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D',
      href: `${lang}/searchEquipment`,
    },
  ];
  const [open, setOpen] = useState(solutions[0].id);
  const imgSrc = solutions.find((s) => s.id === open)?.imgSrc;
  return (
    <section className="px-8 py-12 bg-white">
      <div className="w-full max-w-5xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-[1fr_350px]">
        <div>
          <div className="flex flex-col gap-4">
            {solutions.map((q) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Solution
                title={q.title}
                description={q.description}
                index={q.id}
                open={open}
                setOpen={setOpen}
                key={q.id}
                linkH={q.href}
                learnMore={dictionary.Home.services.learnMore}
              />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={imgSrc}
            className="bg-slate-300 rounded-2xl aspect-[4/3] lg:aspect-auto"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Services;

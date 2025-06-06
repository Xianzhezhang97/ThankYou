/** @format */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { LinkedInAvatar } from './LinkedInAvatar';
import { Person } from '../types';
import { Button } from '@/stories/Components/Button';
import AutoScrollText from './AutoScrollText/AutoScrollText';
import AutoScroll from './AutoScroll/AutoScrollText';

interface PersonCardProps {
  person: Person;
  index: number;
  darkMode: boolean;
}

export const PersonCard = ({ person, index, darkMode }: PersonCardProps) => {
  const [isExpand, setExpand] = useState<boolean>(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: 'easeOut' },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '0px 0px -200px 0px' }}
      className={`p-6 rounded-xl ${
        darkMode
          ? 'bg-sky-950 border-sky-900'
          : 'bg-yellow-50/20 border-zinc-200'
      } border`}
    >
      {/* 方案1: 对固定内容使用 layout="position" */}
      <motion.div layout='position'>
        <Link
          href={person.url || '#'}
          target='_blank'
          className='flex items-start gap-4 mb-4'
        >
          <LinkedInAvatar
            name={person.name}
            src={person.src}
            url={person.url}
          />
          <div className='flex-1 min-w-0'>
            <h3 className='text-base md:text-xl font-bold mb-1 truncate'>
              {person.name}
            </h3>

            <div className='flex items-center gap-2 mb-2'>
              <Trophy className='w-4 h-4 text-yellow-500 flex-shrink-0' />
              <AutoScroll>
                <span
                  className={`text-[10px] md:text-sm font-medium ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  } pr-4`}
                >
                  {person.award}
                </span>
              </AutoScroll>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* 方案1: 对变化的内容也使用 layout="position" */}
      <motion.div layout='position' transition={{ duration: 0.3 }}>
        <motion.p
          layout
          animate={{
            height: isExpand ? 'auto' : 'auto',
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
          className={`text-sm md:text-base mb-6 lg:text-lg ${
            darkMode ? 'text-zinc-300' : 'text-zinc-700'
          } leading-relaxed ${isExpand ? 'line-clamp-none' : 'line-clamp-3'}`}
        >
          {person.description}
        </motion.p>

        <div className='w-full flex justify-start'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => setExpand(!isExpand)}
          >
            {isExpand ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 方案2: 使用 AnimatePresence 和条件渲染
export const PersonCardAlternative = ({
  person,
  index,
  darkMode,
}: PersonCardProps) => {
  const [isExpand, setExpand] = useState<boolean>(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '0px 0px -200px 0px' }}
      className={`p-6 rounded-xl ${
        darkMode
          ? 'bg-sky-950 border-sky-900'
          : 'bg-yellow-50/20 border-zinc-200'
      } border`}
    >
      <Link
        href={person.url || '#'}
        target='_blank'
        className='flex items-start gap-4 mb-4'
      >
        <LinkedInAvatar name={person.name} src={person.src} url={person.url} />
        <div className='flex-1'>
          <h3 className='text-base md:text-xl font-bold mb-1'>{person.name}</h3>
          <div className='flex items-center gap-2 mb-2 overflow-x-auto whitespace-nowrap no-scrollbar'>
            <Trophy className='w-4 h-4 text-yellow-500 flex-shrink-0' />
            <span
              className={`text-[10px] md:text-sm font-medium ${
                darkMode ? 'text-yellow-400' : 'text-yellow-600'
              } overflow-hidden text-ellipsis`}
            >
              {person.award}
            </span>
          </div>
        </div>
      </Link>

      <div className='overflow-hidden'>
        <motion.p
          initial={false}
          animate={{
            height: isExpand ? 'auto' : '4.5rem', // 大约3行的高度
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
          className={`text-sm md:text-base mb-6 lg:text-lg ${
            darkMode ? 'text-zinc-300' : 'text-zinc-700'
          } leading-relaxed overflow-hidden`}
        >
          {person.description}
        </motion.p>
      </div>

      <div className='w-full flex justify-start'>
        <Button
          size='sm'
          variant='outline'
          onClick={() => setExpand(!isExpand)}
        >
          {isExpand ? 'Collapse' : 'Expand'}
        </Button>
      </div>
    </motion.div>
  );
};

export const PersonCardCustom = ({
  person,
  index,
  darkMode,
}: PersonCardProps) => {
  const [isExpand, setExpand] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '0px 0px -200px 0px' }}
      className={`p-6 rounded-xl ${
        darkMode
          ? 'bg-sky-950 border-sky-900'
          : 'bg-yellow-50/20 border-zinc-200'
      } border`}
    >
      <Link
        href={person.url || '#'}
        target='_blank'
        className='flex items-start gap-4 mb-4'
      >
        <LinkedInAvatar name={person.name} src={person.src} url={person.url} />
        <div className='flex-1'>
          <h3 className='text-base md:text-xl font-bold mb-1'>{person.name}</h3>
          <div className='flex items-center gap-2 mb-2 overflow-x-auto whitespace-nowrap no-scrollbar'>
            <Trophy className='w-4 h-4 text-yellow-500 flex-shrink-0' />
            <span
              className={`text-[10px] md:text-sm font-medium ${
                darkMode ? 'text-yellow-400' : 'text-yellow-600'
              } overflow-hidden text-ellipsis`}
            >
              {person.award}
            </span>
          </div>
        </div>
      </Link>

      <motion.div
        animate={{
          height: isExpand ? 'auto' : 'auto',
        }}
        className='overflow-hidden'
      >
        <p
          className={`text-sm md:text-base mb-6 lg:text-lg ${
            darkMode ? 'text-zinc-300' : 'text-zinc-700'
          } leading-relaxed transition-all duration-300 ${
            isExpand ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          {person.description}
        </p>
      </motion.div>

      <div className='absolute bottom-0 left-0 w-full flex justify-start'>
        <Button
          size='sm'
          variant='outline'
          onClick={() => setExpand(!isExpand)}
        >
          {isExpand ? 'Collapse' : 'Expand'}
        </Button>
      </div>
    </motion.div>
  );
};

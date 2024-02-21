import React from 'react';

import { Banner } from '@/components/banner';

const ChapterIdPage = () => {
  return (
    <div>
      <Banner variant='success' label='You already completed this chapter.' />
      {/* <Banner
        variant="warning"
        label="You need to purchase this course to watch this chapter."
      /> */}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className='p-4'>
          {/* <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          /> */}
        </div>
        <div>
          <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
            <h2 className='text-2xl font-semibold mb-2'>
              {/* {chapter.title} */}
            </h2>
            {/* {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )} */}
          </div>
          {/* <Separator /> */}
          <div>{/* <Preview value={chapter.description!} /> */}</div>
          {/* {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;

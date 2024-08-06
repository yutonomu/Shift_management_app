import React from 'react';

const TimeLine: React.FC = () => {
  const lines = Array.from({ length: 23 }, (_, i) => `${i + 1}:00`);

  const textWithLine = (text: string, index: number) => {
    const isFirst = index === 0;
    const isLast = index === lines.length - 1;
    return (
      <div className={`flex items-center w-full ${isFirst ? 'mt-2' : ''} ${isLast ? 'mb-2' : 'mb-1'}`}> {/* 要素の上下のパディング */}
        <span className="w-[15vw] text-lg flex justify-center">{text}</span> 
        <div className="flex-grow border-t border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-[20vw]">
        {lines.map((text: string, index: number) => (
          <div key={index}>
            {textWithLine(text, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeLine;

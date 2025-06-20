'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownPage() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [targetYear, setTargetYear] = useState(new Date().getFullYear() + 1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(targetYear, 0, 1);
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setCurrentTime(now);
        setIsComplete(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCurrentTime(now);
        setIsComplete(true);

        setTimeout(() => {
          setTargetYear(targetYear + 1);
          setIsComplete(false);
        }, 3000);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [mounted, targetYear]);

  const formatNumber = (num: number, digits: number): string => {
    return num.toString().padStart(digits, '0');
  };

  const TimeUnit = ({ value, digits, show }: { value: number; digits: number; show: boolean }) => {
    if (!show) return null;
    return (
      <span className="rounded px-2 sm:px-3 py-1 sm:py-2 transition-all text-2xl sm:text-4xl md:text-[60px]">
        {formatNumber(value, digits)}
      </span>
    );
  };

  const Separator = ({ show }: { show: boolean }) => {
    if (!show) return null;
    return (
      <span className="mx-1 text-xs sm:text-sm md:text-[15px]">•</span>
    );
  };

  const formatTimeForFooter = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDateForFooter = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!mounted) {
    return null;
  }

  const showDays = timeLeft.days > 0;
  const showHours = showDays || timeLeft.hours > 0;
  const showMinutes = showHours || timeLeft.minutes > 0;
  const showSeconds = showMinutes || timeLeft.seconds > 0;

  return (
    <div className="grid grid-rows-[20px_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-10 sm:pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 sm:gap-8 row-start-2 items-center">
        <div className="flex items-center gap-1 sm:gap-2 text-2xl sm:text-4xl font-mono">
          {isComplete ? (
            <div className="text-3xl sm:text-4xl md:text-[60px] font-bold animate-bounce">
              {targetYear}
            </div>
          ) : (
            <div className="flex items-center z-10">
              <TimeUnit value={timeLeft.days} digits={3} show={showDays} />
              <Separator show={showDays && showHours} />
              <TimeUnit value={timeLeft.hours} digits={2} show={showHours} />
              <Separator show={showHours && showMinutes} />
              <TimeUnit value={timeLeft.minutes} digits={2} show={showMinutes} />
              <Separator show={showMinutes && showSeconds} />
              <TimeUnit value={timeLeft.seconds} digits={2} show={showSeconds} />
            </div>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-3 sm:gap-6 flex-wrap items-center justify-center font-mono text-[#686767]">
        {currentTime && (
          <>
            <div className="text-xs sm:text-sm md:text-[15px]">
              {formatDateForFooter(currentTime)}
            </div>
            <div className="font-mono text-xs sm:text-sm md:text-[15px]">
              {formatTimeForFooter(currentTime)}
            </div>
          </>
        )}
      </footer>
    </div>
  );
}

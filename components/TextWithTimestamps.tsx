"use client";

import React from 'react';
import { extractTimestamps } from '@/utils/timestamp';

interface TextWithTimestampsProps {
  text: string;
  videoId: string;
  className?: string;
}

/**
 * テキスト内のタイムスタンプを検出し、クリック可能なリンクとして表示するコンポーネント
 */
export default function TextWithTimestamps({ text, videoId, className }: TextWithTimestampsProps) {
  const timestamps = extractTimestamps(text);

  // タイムスタンプがない場合はそのままテキストを返す
  if (timestamps.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // タイムスタンプをクリックした時の処理
  const handleTimestampClick = (seconds: number) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`;
    window.open(youtubeUrl, '_blank');
  };

  // テキストをタイムスタンプとその他の部分に分割
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  timestamps.forEach((timestamp, index) => {
    // タイムスタンプ前のテキスト
    if (timestamp.start > lastIndex) {
      parts.push(text.slice(lastIndex, timestamp.start));
    }

    // クリック可能なタイムスタンプ
    parts.push(
      <button
        key={`timestamp-${index}`}
        onClick={() => handleTimestampClick(timestamp.seconds)}
        className="text-blue-600 hover:text-blue-800 underline underline-offset-2 font-medium transition-colors cursor-pointer"
        title={`YouTubeで${timestamp.timestamp}から再生`}
      >
        {timestamp.timestamp}
      </button>
    );

    lastIndex = timestamp.end;
  });

  // 最後のタイムスタンプ以降のテキスト
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <span className={className}>{parts}</span>;
}
"use client";

import { useEffect, useState } from "react";

/**
 * キーボードの表示状態を検知するカスタムHook
 * Visual Viewport APIを使用してキーボードの表示/非表示を監視
 * @returns {boolean} キーボードが表示されている場合true
 */
export function useKeyboardVisibility(): boolean {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // Visual Viewport APIがサポートされていない場合は早期リターン
    if (typeof window === "undefined" || !window.visualViewport) {
      return;
    }

    const viewport = window.visualViewport;
    const initialHeight = viewport.height;

    const handleViewportChange = () => {
      // ビューポートの高さが初期値より大幅に小さくなった場合、キーボードが表示されていると判断
      // 150px以上の差があればキーボードが表示されていると仮定
      const heightDifference = initialHeight - viewport.height;
      setIsKeyboardVisible(heightDifference > 150);
    };

    // ビューポートの変化を監視
    viewport.addEventListener("resize", handleViewportChange);

    // クリーンアップ
    return () => {
      viewport.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return isKeyboardVisible;
}
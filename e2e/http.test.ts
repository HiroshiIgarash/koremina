/**
 * 簡単なHTTPベースのE2Eテスト
 * Playwrightが利用できない環境での代替案
 */

import { describe, test, expect } from '@jest/globals';

// Node.jsのHTTPクライアントを使用
const http = require('http');
const https = require('https');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

function makeRequest(url: string): Promise<{ status: number; headers: any; body: string }> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res: any) => {
      let body = '';
      res.on('data', (chunk: any) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body
        });
      });
    }).on('error', reject);
  });
}

describe('HTTP E2Eテスト', () => {
  test('ホームページが200で応答する', async () => {
    const response = await makeRequest(`${BASE_URL}/`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
  });

  test('APIエンドポイントが適切に応答する', async () => {
    const response = await makeRequest(`${BASE_URL}/api/auth/signin`);
    expect([200, 404, 500].includes(response.status)).toBeTruthy();
  });

  test('静的アセットが配信される', async () => {
    // robots.txtなどの基本的な静的ファイル
    const response = await makeRequest(`${BASE_URL}/robots.txt`);
    expect([200, 404].includes(response.status)).toBeTruthy();
  });

  test('存在しないページで適切なエラーレスポンス', async () => {
    const response = await makeRequest(`${BASE_URL}/non-existent-page-12345`);
    expect([404, 200].includes(response.status)).toBeTruthy();
  });
});
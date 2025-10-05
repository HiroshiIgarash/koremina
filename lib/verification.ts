import crypto from "crypto";

/**
 * メール検証トークンの設定
 */
export const EMAIL_VERIFICATION_CONFIG = {
  TOKEN_BYTES: 32, // 256 bit
  TOKEN_EXPIRY_HOURS: 48, // 48時間有効
  RATE_LIMIT_ATTEMPTS: 5, // 1時間あたり5回まで
  RATE_LIMIT_WINDOW_HOURS: 1,
} as const;

/**
 * セキュアな検証トークンを生成（base64url形式）
 * @returns 256bit のランダムトークン（base64url エンコード）
 */
export function generateVerificationToken(): string {
  const randomBytes = crypto.randomBytes(EMAIL_VERIFICATION_CONFIG.TOKEN_BYTES);

  // base64url 形式に変換（URL セーフ）
  return randomBytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * トークンを HMAC-SHA256 でハッシュ化
 * @param token 生トークン
 * @returns HMAC-SHA256 ハッシュ（hex形式）
 */
export function hashToken(token: string): string {
  const secret = process.env.EMAIL_TOKEN_HMAC_SECRET;

  if (!secret) {
    throw new Error(
      "EMAIL_TOKEN_HMAC_SECRET 環境変数が設定されていません"
    );
  }

  return crypto.createHmac("sha256", secret).update(token).digest("hex");
}

/**
 * トークンの有効期限を計算
 * @returns 48時間後の Date オブジェクト
 */
export function getTokenExpiry(): Date {
  const now = new Date();
  return new Date(
    now.getTime() +
      EMAIL_VERIFICATION_CONFIG.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  );
}

/**
 * トークンが有効期限内かチェック
 * @param expires トークンの有効期限
 * @returns 有効期限内なら true
 */
export function isTokenExpired(expires: Date | null): boolean {
  if (!expires) return true;
  return new Date() > expires;
}

/**
 * レート制限をチェック
 * @param attempts 送信試行回数
 * @param lastSentAt 最終送信日時
 * @returns レート制限を超えている場合 true
 */
export function isRateLimited(
  attempts: number,
  lastSentAt: Date | null
): boolean {
  if (!lastSentAt) return false;

  const windowMs =
    EMAIL_VERIFICATION_CONFIG.RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000;
  const windowStart = new Date(Date.now() - windowMs);

  // 制限時間内かつ試行回数が上限を超えている場合
  if (
    lastSentAt > windowStart &&
    attempts >= EMAIL_VERIFICATION_CONFIG.RATE_LIMIT_ATTEMPTS
  ) {
    return true;
  }

  return false;
}

/**
 * レート制限カウンターをリセットすべきかチェック
 * @param lastSentAt 最終送信日時
 * @returns リセットすべき場合 true
 */
export function shouldResetRateLimit(lastSentAt: Date | null): boolean {
  if (!lastSentAt) return true;

  const windowMs =
    EMAIL_VERIFICATION_CONFIG.RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000;
  const windowStart = new Date(Date.now() - windowMs);

  return lastSentAt <= windowStart;
}

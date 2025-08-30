import { bioSchema } from '../schema';

describe('Bio Schema Validation', () => {
  test('空文字の自己紹介文を許可すること', () => {
    const result = bioSchema.safeParse({ newBio: '' });
    expect(result.success).toBe(true);
  });

  test('100文字以内の自己紹介文を許可すること', () => {
    const validBio = 'a'.repeat(100);
    const result = bioSchema.safeParse({ newBio: validBio });
    expect(result.success).toBe(true);
  });

  test('100文字を超える自己紹介文を拒否すること', () => {
    const invalidBio = 'a'.repeat(101);
    const result = bioSchema.safeParse({ newBio: invalidBio });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('100文字を超えています。');
  });

  test('日本語文字でも100文字制限が適用されること', () => {
    const validJapaneseBio = 'あ'.repeat(100);
    const invalidJapaneseBio = 'あ'.repeat(101);
    
    const validResult = bioSchema.safeParse({ newBio: validJapaneseBio });
    const invalidResult = bioSchema.safeParse({ newBio: invalidJapaneseBio });
    
    expect(validResult.success).toBe(true);
    expect(invalidResult.success).toBe(false);
  });

  test('改行を含む自己紹介文を許可すること', () => {
    const bioWithNewlines = 'Hello\nWorld\nThis is my bio';
    const result = bioSchema.safeParse({ newBio: bioWithNewlines });
    expect(result.success).toBe(true);
  });
});
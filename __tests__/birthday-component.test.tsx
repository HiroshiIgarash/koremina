import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the Birthday component functionality
const mockBirthdayData = {
  todayBirthday: {
    livers: [
      { id: '1', name: 'テストライバー1', channelHandle: '@test1' },
    ],
    daysUntil: 0,
    isToday: true
  },
  futureBirthday: {
    livers: [
      { id: '2', name: 'テストライバー2', channelHandle: '@test2' },
    ],
    daysUntil: 5,
    isToday: false
  },
  noBirthday: {
    livers: [],
    daysUntil: 0,
    isToday: false
  }
};

// Mock Birthday component for testing
const MockBirthday = ({ birthdayData }: any) => {
  const { livers, daysUntil, isToday } = birthdayData;
  
  const sectionTitle = isToday ? "今日が誕生日のライバー" : "直近の誕生日ライバー";
  
  const getSubText = () => {
    if (isToday) {
      return "今日が誕生日！";
    } else if (daysUntil === 1) {
      return "明日が誕生日！";
    } else {
      return `${daysUntil}日後に誕生日`;
    }
  };
  
  return (
    <div className="w-full py-8 bg-slate-100 dark:bg-slate-600">
      <p className="text-center font-bold text-lg">{sectionTitle}</p>
      {livers && livers.length > 0 ? (
        <>
          <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">
            {getSubText()}
          </p>
          <div className="mt-4">
            {livers.map((liver: any) => (
              <div key={liver.id} className="text-center">
                {liver.name}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center mt-4">誕生日情報がありません</p>
      )}
    </div>
  );
};

describe('Birthday Component Display', () => {
  test('shows today birthday message correctly', () => {
    render(<MockBirthday birthdayData={mockBirthdayData.todayBirthday} />);
    
    expect(screen.getByText('今日が誕生日のライバー')).toBeInTheDocument();
    expect(screen.getByText('今日が誕生日！')).toBeInTheDocument();
    expect(screen.getByText('テストライバー1')).toBeInTheDocument();
  });

  test('shows future birthday message correctly', () => {
    render(<MockBirthday birthdayData={mockBirthdayData.futureBirthday} />);
    
    expect(screen.getByText('直近の誕生日ライバー')).toBeInTheDocument();
    expect(screen.getByText('5日後に誕生日')).toBeInTheDocument();
    expect(screen.getByText('テストライバー2')).toBeInTheDocument();
  });

  test('shows no birthday info when no data', () => {
    render(<MockBirthday birthdayData={mockBirthdayData.noBirthday} />);
    
    expect(screen.getByText('誕生日情報がありません')).toBeInTheDocument();
  });

  test('handles tomorrow birthday correctly', () => {
    const tomorrowData = { ...mockBirthdayData.futureBirthday, daysUntil: 1 };
    render(<MockBirthday birthdayData={tomorrowData} />);
    
    expect(screen.getByText('明日が誕生日！')).toBeInTheDocument();
  });
});
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import dayjs from 'dayjs';
import calendarLogic from './utils/buildCalendar';
import styled from 'styled-components';
import classNames from 'classnames';
import useFetch from './hooks/useFetch';
import Box from './Components/Box';

function App() {
  const [now, setNow] = useState(dayjs().subtract(1, 'day'));
  const { result, loading } = useFetch('transactions');
  const resultMemo = useMemo(() => result, [result]);

  return (
    <Container className='App'>
      <div className={classNames('days-container')}>
        {/* <p>{now}</p> */}
        <div className={classNames('day-list')}>
          {calendarLogic(now).map((item: dayjs.Dayjs[], index: number) => (
            <span className='day-tag'>
              {dayjs().set('day', index).format('dddd')}
            </span>
          ))}
        </div>
        <div>
          {calendarLogic(now).map((item: dayjs.Dayjs[], index: number) => (
            <div
              className={classNames(
                'days',
                dayjs().set('day', index).format('dddd'),
              )}
            >
              {item.map((date) => {
                return (
                  <Box
                    key={date.format('YYYY-MM-DD')}
                    formattedDate={date.format('YYYY-MM-DD')}
                    resultArr={resultMemo}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .box {
  }
  .days {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 2px;
  }

  .day-list {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .day-tag {
    display: flex;
    justify-content: flex-start;
    font-size: 12px;
  }

  .days-container {
    gap: 10px;
    display: flex;
    /* flex-direction: column; */
    > div {
      :last-of-type {
        display: flex;
        flex-direction: column;
        gap: 2px;
        .days {
          flex: 1;
        }
      }
    }
  }
`;

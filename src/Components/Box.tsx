import classNames from 'classnames';
import { FC, useMemo } from 'react';
import styled from 'styled-components';
import formatAmount from '../utils/formatAmount';

interface IBox {
  formattedDate: string;
  resultArr: {
    amount: number;
    date: string;
    transactionType: 'debit' | 'credit';
  }[];
}

const Box: FC<IBox> = ({ formattedDate, resultArr }) => {
  const netAmount = useMemo(() => {
    const filtered = resultArr.filter((data) => {
      return data.date === formattedDate;
    });
    const figure = filtered.reduce((acc, curr) => {
      switch (curr.transactionType) {
        case 'credit':
          return acc + curr.amount;

        default:
          return acc - curr.amount;
      }
    }, 0);
    return parseFloat(formatAmount(figure));
  }, [resultArr]);

  return (
    <Container
      className={classNames(formattedDate, netAmount, {
        'color-one': netAmount <= -99,
        'color-two': netAmount <= -9 && netAmount > -99,
        'color-three': netAmount <= -1 && netAmount > -9,
        'color-four': netAmount === 0,
        'color-five': netAmount > 0 && netAmount <= 10,
        'color-six': netAmount > 10 && netAmount <= 100,
        'color-seven': netAmount > 100,
      })}
    ></Container>
  );
};

export default Box;

const Container = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  /* background-color: #eee; */
  &.color-one {
    background-color: rgba(178, 10, 10, 0.786);
  }
  &.color-two {
    background-color: rgb(248, 32, 32);
  }
  &.color-three {
    background-color: rgb(236, 134, 134);
  }
  &.color-four {
    background-color: rgb(238, 238, 238);
  }
  &.color-five {
    background-color: rgb(180, 244, 166);
  }
  &.color-six {
    background-color: rgb(43, 215, 4);
  }
  &.color-seven {
    background-color: rgb(20, 76, 7);
  }
`;

import React, { useState } from 'react';
import { Layout } from '../../../components/layout';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount } from '../redux/slice';

import styles from './index.module.css';

export function CounterPage() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <Layout>
      <div className="App">
        <header className="App-header">
          <div className={styles.row}>
            <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
              -
            </button>
            <span className={styles.value}>{count}</span>
            <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
              +
            </button>
          </div>
          <div className={styles.row}>
            <input
              className={styles.textbox}
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
              Add Amount
            </button>
            <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
              Add Async
            </button>
            <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
              Add If Odd
            </button>
          </div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a className="App-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
              React
            </a>
            <span>, </span>
            <a className="App-link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
              Redux
            </a>
            <span>, </span>
            <a className="App-link" href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a className="App-link" href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer">
              React Redux
            </a>
          </span>
        </header>
      </div>
    </Layout>
  );
}

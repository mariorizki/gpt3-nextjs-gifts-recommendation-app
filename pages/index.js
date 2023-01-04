import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [gender, setGender] = useState('man');
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(1);
  const [priceMax, setPriceMax] = useState(10);
  const [hobbies, setHobbies] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/gifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
    });
    const data = await response.json();
    setResult('Result: ' + data.result.replaceAll('\n', '<br />'));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Gifts Idea</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Gift Idea Generator App</h3>
        <p>Created using Next.js & GPT-3</p>
        <form onSubmit={onSubmit}>
          <label>For who is the gift?</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Price ($) from</label>
          <input
            type="number"
            min={1}
            name="priceMin"
            placeholder="Enter the minimum price"
            value={priceMin}
            onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
          />

          <label>Price ($) to</label>
          <input
            type="number"
            min={1}
            name="priceMax"
            placeholder="Enter the maximum price"
            value={priceMax}
            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
          />

          <label>Hobbies</label>
          <input
            type="text"
            name="hobbies"
            placeholder="Enter the hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Generate gift ideas" />
        </form>
        {loading && (
          <div>
            <h3 className={styles.loadingtext}>Loading gift ideas...</h3>
            <img src="/loading.webp" className={styles.loading} />
          </div>
        )}
        <p
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}

import { useSelector } from 'react-redux';
import styles from '../styles/Trends.module.css';
import { useEffect, useState } from 'react';

export default function Trends() {
    const allTweets = useSelector(state => state.allTweets.tweets)
    console.log(allTweets)

    let allTrends = [];

    for (let i = 0; i < allTweets.length; i++) {
        if (allTweets[i].tweetContent.includes('#')) {
            allTrends.push("#" + allTweets[i].tweetContent.split('#')[1].split(' ')[0])
        }
    }

    const trend = [];
    const trendWords = []
    for (let i = 0; i < allTrends.length; i++) {
        let count = 0;
        for (let j = 0; j < allTrends.length; j++) {
            if (allTrends[i] === allTrends[j]) {
                count++;
            }
        }
        if (!trendWords.includes(allTrends[i])) {
            trendWords.push(allTrends[i]);
            trend.push(
                <div key={i} className={styles.trend}>
                    <h3 className={styles.trendTitle}>{allTrends[i]}</h3>
                    <span className={styles.tweetNbr}>{count} tweet(s)</span>
                </div>);
        }
    }




    return (
        <div>
            <h3 className={styles.homeTitle}>Trends</h3>
            <div className={styles.trendsContainer}>
                {trend}
            </div>
        </div>

    )
}


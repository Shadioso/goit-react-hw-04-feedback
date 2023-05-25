import { useState } from 'react';
import { OptionsToRend } from './FeedbackOptions/FeedbackOptions';
import { StatsToRend } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

const FeedbackStats = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const params = {
    good,
    neutral,
    bad,
  };
  const options = Object.keys(params);

  const onLeaveFeedback = type => {
    switch (type) {
      case `good`:
        setGood(PrevState => PrevState + 1);
        break;
      case `neutral`:
        setNeutral(PrevState => PrevState + 1);
        break;
      case `bad`:
        setBad(PrevState => PrevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = (good, neutral, bad) => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = (
    good,
    bad,
    neutral,
    countTotalFeedback
  ) => {
    const summ = (good * 100) / countTotalFeedback(good, neutral, bad);
    return Math.round(summ);
  };

  return (
    <>
      <OptionsToRend options={options} onLeaveFeedback={onLeaveFeedback} />
      {countTotalFeedback(good, neutral, bad) !== 0 ? (
        <StatsToRend
          positivePercentage={countPositiveFeedbackPercentage(
            good,
            bad,
            neutral,
            countTotalFeedback
          )}
          good={good}
          bad={bad}
          neutral={neutral}
          total={countTotalFeedback(good, neutral, bad)}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};
export { FeedbackStats };

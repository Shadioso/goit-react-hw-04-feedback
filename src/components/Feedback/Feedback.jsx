import { useState } from 'react';
import { OptionsToRend } from './FeedbackOptions/FeedbackOptions';
import { StatsToRend } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

const FeedbackStats = () => {
  const [Good, setGood] = useState(0);
  const [Neutral, setNeutral] = useState(0);
  const [Bad, setBad] = useState(0);

  const params = {
    Good,
    Neutral,
    Bad,
  };
  const options = Object.keys(params);

  const onLeaveFeedback = type => {
    switch (type) {
      case `Good`:
        setGood(PrevState => PrevState + 1);
        break;
      case `Neutral`:
        setNeutral(PrevState => PrevState + 1);
        break;
      case `Bad`:
        setBad(PrevState => PrevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = (Good, Neutral, Bad) => {
    return Good + Neutral + Bad;
  };

  const countPositiveFeedbackPercentage = (
    Good,
    Bad,
    Neutral,
    countTotalFeedback
  ) => {
    const summ = (Good * 100) / countTotalFeedback(Good, Neutral, Bad);
    return Math.round(summ);
  };

  return (
    <>
      <OptionsToRend options={options} onLeaveFeedback={onLeaveFeedback} />
      {countTotalFeedback(Good, Neutral, Bad) !== 0 ? (
        <StatsToRend
          positivePercentage={countPositiveFeedbackPercentage(
            Good,
            Bad,
            Neutral,
            countTotalFeedback
          )}
          good={Good}
          bad={Bad}
          neutral={Neutral}
          total={countTotalFeedback(Good, Neutral, Bad)}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};
export { FeedbackStats };

import React from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary';
import { useSelector } from 'react-redux';
import Wizard from '@screens/Wizard';
import { wizardSelector } from './GetStarted.selector';

const enhance = (WrappedComp) => (props) => {
  const { isFetching } = useSelector(wizardSelector);
  if (isFetching) {
    return <Wizard />;
  }
  return (
    <ErrorBoundary>
      <WrappedComp {...props} />
    </ErrorBoundary>
  );
};

export default enhance;

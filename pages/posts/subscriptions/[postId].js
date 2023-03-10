import React from 'react';
import { useAuth } from '../../../utils/context/authContext';
import Subscription from '../../../components/Subscription';

export default function SubscriptionFilter() {
  const { user } = useAuth();

  return (
    <Subscription user={user} />
  );
}

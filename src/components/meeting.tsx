"use client";

import { useMemo } from 'react';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  CallWithChatComposite,
  useAzureCommunicationCallWithChatAdapter
} from '@azure/communication-react';
import { initializeIcons, Spinner } from '@fluentui/react';

initializeIcons();

const userId = '<REPLACE ME>';
const userToken = '<REPLACE ME>';
const endpointUrl = '<REPLACE ME>';
const displayName = '<REPLACE ME>';
const groupCallGUID = '<REPLACE ME>';
const chatThreadId = '<REPLACE ME>';

export default function Meeting() {
  const adapterArgs = useMemo(() => ({
    userId: {
      communicationUserId: userId
    },
    displayName,
    credential: new AzureCommunicationTokenCredential(userToken),
    locator: {
      callLocator: {
        groupId: groupCallGUID
      },
      chatThreadId
    },
    endpoint: endpointUrl
  }), []);

  const adapter = useAzureCommunicationCallWithChatAdapter(adapterArgs);

  if (!adapter) {
    return <Spinner label="Initializing..." />;
  }

  return <CallWithChatComposite adapter={adapter} />;
}

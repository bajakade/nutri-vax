import { ThemedText, ThemedView } from '@/components/ui';

import { Link } from 'expo-router';

export default function ModalScreen() {
  return (
    <ThemedView className="flex-1 items-center justidy-center ">
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo className="py-4 mt-4">
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

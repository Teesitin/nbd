// authStore.ts
import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';

interface AuthUser {
  uid: string;
  email: string | null;
}

const authUser = writable<AuthUser | undefined>(undefined);

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    authUser.set({ uid: user.uid, email: user.email });
  } else {
    authUser.set(undefined);
  }
});

export { authUser };

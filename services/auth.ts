import { FetchFn } from '@/helpers/request';
import { User } from '@/types';
import type { LoginForm } from '../types/interface';

interface AuthError {
  error?: Error;
}

export const authenticate = async (
  backendFetch: FetchFn,
  formData: LoginForm,
): Promise<User | AuthError> => {
  try {
    const options = {
      method: 'POST',
      data: {
        ...(formData.email && { email: formData.email }),
        ...(formData.username && { username: formData.username }),
        password: formData.password,
      },
    };

    const result = await backendFetch({ url: '/rest-auth/token/', options });

    if (!result) {
      return { error: new Error('Network connection error') };
    }

    if (result && 'token' in result) {
      const authUser = result;

      authUser.username = formData.rememberUsername ? result.username : undefined;

      return authUser;
    }

    return {
      error: new Error('Authentication error'),
    };
  } catch (error) {
    return { error: error as Error };
  }
};

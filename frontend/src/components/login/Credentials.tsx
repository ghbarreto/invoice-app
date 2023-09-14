import { Input } from '../';

type TCredentials = {
    handleCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Credentials = ({ handleCredentialsChange }: TCredentials) => {
    const label = 'text-secondary_dark block text-sm font-medium dark:text-white';

    return (
        <>
            <div>
                <label htmlFor='email' className={label}>
                    Your email
                </label>
                <Input
                    name='email'
                    type='email'
                    placeholder='your_email@gmail.com'
                    customClasses={
                        'mb-4 bg-gray-100 placeholder-secondary_dark font-thin placeholder-opacity-65  dark:bg-gray-700 dark:placeholder-white'
                    }
                    onChange={handleCredentialsChange}
                />
            </div>

            <div>
                <label htmlFor='password' className={label}>
                    Password
                </label>
                <Input
                    name='password'
                    placeholder='••••••••'
                    type='password'
                    customClasses={
                        'mb-4 placeholder-secondary_dark font-thin placeholder-opacity-65  dark:bg-gray-700 dark:placeholder-white'
                    }
                    onChange={handleCredentialsChange}
                />
            </div>
        </>
    );
};

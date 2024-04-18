import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Form, Grid, Input } from 'antd';
import 'antd/dist/antd.css';
import { passwordRegex } from '../../../regexp';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useSignupMutation } from '../../../services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ValuesSignupForm, baseUser } from '@redux/reducers/userSlice';
import { PATHS } from '@constants/constants';
import { setUser } from '@redux/reducers/userSlice';

const { useBreakpoint } = Grid;

export const RegistrForm: FC = () => {
    const { xs } = useBreakpoint();
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [signup] = useSignupMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    //const { user } = useAppSelector((state) => state.userReducer);
    const user = useAppSelector(baseUser);

    const onFinish = useCallback(
        (values: ValuesSignupForm) => {
            signup({ email: values.email, password: values.password })
                .unwrap()
                .then(() => {
                    navigate(PATHS.RESULT.SUCCESS, { state: PATHS.REGISTRATION });
                })
                .catch((error) => {
                    if (error.status === 409) {
                        navigate(PATHS.RESULT.ERROR_USER_EXIST, {
                            state: PATHS.REGISTRATION,
                        });
                    } else {
                        navigate(PATHS.RESULT.ERROR, { state: PATHS.REGISTRATION });
                        dispatch(setUser(values));
                    }
                });
        },
        [dispatch, navigate, signup],
    );

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        forceUpdate({});
        if (location.state === PATHS.RESULT.ERROR) {
            onFinish(user);
        }
    }, [location.state, onFinish, user]);

    return (
        <Form
            form={form}
            name='auth'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Form.Item
                name='email'
                rules={[{ required: true, type: 'email', message: '' }]}
                style={{ marginBottom: '32px' }}
            >
                <Input data-test-id='registration-email' addonBefore='e-mail:' />
            </Form.Item>

            <Form.Item
                name='password'
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                rules={[
                    {
                        validator: (_, value) => {
                            if (passwordRegex.test(value)) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(
                                    new Error(
                                        'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                    ),
                                );
                            }
                        },
                    },
                ]}
                style={{ marginBottom: '54px' }}
            >
                <Input.Password data-test-id='registration-password' placeholder='Пароль' />
            </Form.Item>

            <Form.Item
                name='confirm'
                dependencies={['password']}
                rules={[
                    { required: true, message: '' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
                style={{ marginBottom: '54px' }}
            >
                <Input.Password
                    data-test-id='registration-confirm-password'
                    placeholder='Повторите пароль'
                />
            </Form.Item>

            <Form.Item shouldUpdate style={{ marginBottom: '16px' }}>
                {() => (
                    <Button
                        data-test-id='registration-submit-button'
                        type='primary'
                        htmlType='submit'
                        block
                        disabled={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Войти
                    </Button>
                )}
            </Form.Item>
            <Button block>
                {!xs && <GooglePlusOutlined />}
                Регистрация через Google
            </Button>
        </Form>
    );
};

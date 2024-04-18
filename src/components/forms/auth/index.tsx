import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Grid } from 'antd';
import 'antd/dist/antd.css';
import { StyledFormBlock } from './styled';
import { emailRegex, passwordRegex } from '../../../regexp';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useCheckEmailMutation, useLoginMutation } from '../../../services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ValuesLoginForm } from './types';
import { baseUser, setToken, setUser } from '@redux/reducers/userSlice';
import { PATHS, URL } from '@constants/constants';
import { Loader } from '@components/loader/Loader';

const { useBreakpoint } = Grid;

export const AuthForm: FC = () => {
    const [forgotDisabled, setForgotDisabled] = useState<boolean>(true);
    const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
    const [checkEmail, { isLoading: isLoadingEmail }] = useCheckEmailMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    // const { user } = useAppSelector((state) => state.userReducer);
    const user = useAppSelector(baseUser);
    const { xs } = useBreakpoint();

    const onFinish = (values: ValuesLoginForm) => {
        login({ email: values.email, password: values.password })
            .unwrap()
            .then((res) => {
                values.remember ? localStorage.setItem('token', res.accessToken) : '';
                dispatch(setUser({ email: values.email, password: values.password }));
                dispatch(setToken(res.accessToken));
                navigate(PATHS.MAIN);
            })
            .catch(() => navigate(PATHS.RESULT.ERROR_LOGIN, { state: PATHS.AUTH }));
    };

    const check = useCallback(
        (email: string) => {
            checkEmail({ email })
                .unwrap()
                .then(() => {
                    navigate(PATHS.CONFIRM_EMAIL, { state: PATHS.AUTH });
                })
                .catch((error) => {
                    if (error.status === 404 && error.data.message === 'Email не найден') {
                        navigate(PATHS.RESULT.ERROR_EMAIL_NO_EXIST, { state: PATHS.AUTH });
                    } else {
                        dispatch(setUser({ email, password: '' }));
                        navigate(PATHS.RESULT.ERROR_CHECK_EMAIL, { state: PATHS.AUTH });
                    }
                });
        },
        [checkEmail, dispatch, navigate],
    );

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate(PATHS.MAIN);
        }
        if (location.state === PATHS.RESULT.ERROR_CHECK_EMAIL) {
            check(user.email);
        }
    }, [check, location.state, navigate, user.email]);
    return (
        <>
            {(isLoadingLogin || isLoadingEmail) && <Loader />}
            <Form
                name='auth'
                initialValues={{ remember: false }}
                onFinish={onFinish}
                autoComplete='off'
                validateTrigger={['onSubmit', 'onСhange']}
            >
                <Form.Item
                    name='email'
                    rules={[
                        { required: true, type: 'email', message: `` },
                        {
                            validator: (_, value) => {
                                if (emailRegex.test(value)) {
                                    dispatch(setUser({ email: value, password: '' }));
                                    return Promise.resolve(setForgotDisabled(false));
                                } else {
                                    return Promise.reject(setForgotDisabled(true));
                                }
                            },
                        },
                    ]}
                    style={{ marginBottom: '32px' }}
                >
                    <Input data-test-id='login-email' addonBefore='e-mail:' />
                </Form.Item>

                <Form.Item
                    name='password'
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
                    <Input.Password data-test-id='login-password' placeholder='Пароль' />
                </Form.Item>

                <StyledFormBlock>
                    <Form.Item
                        name='remember'
                        valuePropName='checked'
                        style={{ marginBottom: '24px' }}
                    >
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button
                        data-test-id='login-forgot-button'
                        onClick={() => !forgotDisabled && check(user.email)}
                        type='link'
                        style={{ padding: '0', border: '0' }}
                    >
                        Забыли пароль?
                    </Button>
                </StyledFormBlock>

                <Form.Item style={{ marginBottom: '16px' }}>
                    <Button
                        data-test-id='login-submit-button'
                        onSubmit={(e) => e.preventDefault()}
                        type='primary'
                        htmlType='submit'
                        block
                    >
                        Вход
                    </Button>
                </Form.Item>
                <Button
                    block
                    onClick={() => {
                        window.location.href = `${URL + PATHS.LOGINGOOGLE}`;
                    }}
                >
                    {!xs && <GooglePlusOutlined />}
                    Войти через Google
                </Button>
            </Form>
        </>
    );
};

import { Form, Input, Typography } from 'antd';
import { passwordRegex } from '../../../regexp';
import { FC } from 'react';

export const PrivacyInfo: FC = () => {
    return (
        <fieldset>
            <legend style={{ margin: 0 }}>
                <Typography.Title style={{ marginBottom: '24px' }} level={5}>
                    Приватность и авторизация
                </Typography.Title>

                <Form.Item
                    name='email'
                    rules={[{ required: true, type: 'email', message: '' }]}
                    style={{ marginBottom: '32px' }}
                >
                    <Input addonBefore='e-mail:' />
                </Form.Item>

                <Form.Item
                    name='password'
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value?.length > 0) {
                                    return passwordRegex.test(value)
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                              ),
                                          );
                                } else {
                                    return Promise.resolve();
                                }
                            },
                        },
                    ]}
                    style={{ marginBottom: '54px' }}
                >
                    <Input.Password placeholder='Пароль' />
                </Form.Item>

                <Form.Item
                    name='confirm'
                    dependencies={['password']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    (!value && !getFieldValue('password')) ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                    style={{ marginBottom: '54px' }}
                >
                    <Input.Password placeholder='Повторите пароль' />
                </Form.Item>
            </legend>
        </fieldset>
    );
};

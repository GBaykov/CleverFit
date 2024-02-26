import { FC } from 'react';
import { Button, Form, Grid, Input } from 'antd';
import 'antd/dist/antd.css';

import { passwordRegex } from '../../../regexp';
import { GooglePlusOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

export const RegistrForm: FC = () => {
    const { xs } = useBreakpoint();
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
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
                <Input addonBefore='e-mail:' />
            </Form.Item>

            <Form.Item
                name='password'
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                rules={[
                    {
                        required: true,
                        min: 8,
                        pattern: passwordRegex,
                        message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
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
                <Input.Password placeholder='Повторите пароль' />
            </Form.Item>

            <Form.Item style={{ marginBottom: '16px' }}>
                <Button type='primary' htmlType='submit' block>
                    Вход
                </Button>
            </Form.Item>
            <Button block>
                {!xs && <GooglePlusOutlined />}
                Регистрация через Google
            </Button>
        </Form>
    );
};

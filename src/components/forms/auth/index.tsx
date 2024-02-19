import { FC } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { ButtonServiceIco, StyledFormBlock } from './styled';

export const AuthForm: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    console.log('reload');
    return (
        <Form
            name='basic'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please input your username!' }]}
                style={{ marginBottom: '32px' }}
            >
                <Input addonBefore='e-mail:' />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
                style={{ marginBottom: '54px' }}
            >
                <Input.Password placeholder='Пароль' />
            </Form.Item>

            <StyledFormBlock>
                <Form.Item name='remember' valuePropName='checked' style={{ marginBottom: '24px' }}>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Button type='link'>Забыли пароль?</Button>
            </StyledFormBlock>

            <Form.Item style={{ marginBottom: '16px' }}>
                <Button type='primary' htmlType='submit' block>
                    Вход
                </Button>
            </Form.Item>
            <Button block>
                <ButtonServiceIco className='buttonServiceico'>
                    <b>G+ </b>{' '}
                </ButtonServiceIco>
                Войти через Google
            </Button>
        </Form>
    );
};

import { FC } from 'react';
import { Layout, Button, Checkbox, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { StyledFormBlock } from './styled';

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
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input addonBefore='e-mail:' />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder='Пароль' />
            </Form.Item>

            <StyledFormBlock>
                <Form.Item
                    name='remember'
                    valuePropName='checked'

                    // style={{ justifyContent: 'space-between' }}
                >
                    <Checkbox>Запомнит меня</Checkbox>
                </Form.Item>
                <Button type='link'>Забыли пароль?</Button>
            </StyledFormBlock>

            <Form.Item>
                <Button type='primary' htmlType='submit' block>
                    Вход
                </Button>
            </Form.Item>
            <Button block>
                <b>G+</b> Войти через Google
            </Button>
        </Form>
    );
};

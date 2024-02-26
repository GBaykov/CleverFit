import { FC } from 'react';
import { Button, Checkbox, Form, Input, Grid } from 'antd';
import 'antd/dist/antd.css';
import { StyledFormBlock } from './styled';
import { passwordRegex } from '../../../regexp';
import { GooglePlusOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

export const AuthForm: FC = () => {
    const { xs } = useBreakpoint();
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    console.log('reload');
    return (
        <Form
            name='auth'
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            validateTrigger={['onSubmit', 'onСhange']}
        >
            <Form.Item
                name='email'
                rules={[{ required: true, type: 'email', message: `` }]}
                style={{ marginBottom: '32px' }}
            >
                <Input addonBefore='e-mail:' />
            </Form.Item>

            <Form.Item
                name='password'
                // help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                rules={[
                    {
                        required: true,
                        // min: 8,
                        // max: 20,
                        pattern: passwordRegex,
                        message: ``,
                        // message: `Пароль не менее 8 символов, с заглавной буквой и цифрой`,
                    },
                ]}
                style={{ marginBottom: '54px' }}
            >
                <Input.Password placeholder='Пароль' />
            </Form.Item>

            <StyledFormBlock>
                <Form.Item name='remember' valuePropName='checked' style={{ marginBottom: '24px' }}>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Button type='link' style={{ padding: '0', border: '0' }}>
                    Забыли пароль?
                </Button>
            </StyledFormBlock>

            <Form.Item style={{ marginBottom: '16px' }}>
                <Button type='primary' htmlType='submit' block>
                    Вход
                </Button>
            </Form.Item>
            <Button block>
                {!xs && <GooglePlusOutlined />}
                Войти через Google
            </Button>
        </Form>
    );
};

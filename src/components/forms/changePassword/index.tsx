import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { passwordRegex } from '../../../regexp';
import './styles.css';
import { StyledCard } from '@components/styledCard/styled';
import { CommonCardWrap } from '@pages/comonCardWrap';

export const ChangePasswordForm: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <CommonCardWrap>
            <StyledCard
                title={'Восстановление аккаунта'}
                style={{ height: 'auto' }}
                headStyle={{
                    minHeight: '30px',
                    margin: '0 auto',
                }}
            >
                <Form
                    name='auth'
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
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
                        <Input.Password data-test-id='change-password' placeholder='Новый пароль' />
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
                            data-test-id='change-confirm-password'
                            placeholder='Повторите пароль'
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '16px' }}>
                        <Button
                            data-test-id='change-submit-button'
                            type='primary'
                            htmlType='submit'
                            block
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </StyledCard>
        </CommonCardWrap>
    );
};

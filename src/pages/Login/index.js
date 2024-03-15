import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import logo from '@/assets/logo.png'
import {fetchLogin} from "@/store/modules/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const finishHandler = async (args) => {
        await dispatch(fetchLogin(args));
        navigate('/');
        message.success('Successfully login!')
    }
    const navigate = useNavigate();
    return (
        <div className="login">
            <Card className="login-container">
                <img
                    className="login-logo"
                    src={logo}
                    alt=""/>
                <Form
                    validateTrigger={'onBlur'}
                    onFinish={finishHandler}
                >
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                            // {
                            //     pattern: /^02\d{7,9}$/,
                            //     message: 'Please input correct phone number!'
                            // }
                        ]}>
                        <Input size="large" placeholder="Please enter your phone number"/>
                    </Form.Item>

                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your verification code!',
                            },
                            // {
                            //     pattern: /^\d{4}$/,
                            //     message: 'Please input correct verification code!'
                            // }
                        ]}>
                        <Input size="large" placeholder="Please enter your verification code"/>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block>
                            Login
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    )
}

export default Login
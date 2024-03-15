import {Layout, Menu, message, Popconfirm} from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {clearUserInfo, fetchUserInfo} from "@/store/modules/user";
import {useDispatch, useSelector} from "react-redux";

const {Header, Sider} = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined/>,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined/>,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined/>,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const name = useSelector(state => state.user.userInfo.name)
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);
    const changeMenu = (args) => {
        navigate(args.key)
    }
    const confirmHandler = () => {
        dispatch(clearUserInfo())
        navigate('/login');
        message.success('Successfully logout!')
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <div className="user-info">
                    <span className="user-name">{name}</span>
                    <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={confirmHandler}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={location}
                        onClick={changeMenu}
                        items={items}
                        style={{height: '100%', borderRight: 0}}></Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout
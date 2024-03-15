import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {Table, Tag, Space} from 'antd'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import {useChannel} from "@/hooks/useChannel";
import {useEffect, useState} from "react";
import {getArticleDetailByIdAPI, getArticleListAPI} from "@/apis/article";
import {deleteArticleAPI} from "@/apis/user";

const {Option} = Select
const {RangePicker} = DatePicker

const Article = () => {
    const moderateStatus = {
        1: <Tag color="warning">审核中</Tag>,
        2: <Tag color="green">审核通过</Tag>
    }
    const navigate = useNavigate()
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => moderateStatus[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined/>}
                            onClick={() => {
                                navigate(`/publish?id=${data.id}`)
                            }}/>
                        <Popconfirm
                            title="确认删除该条文章吗?"
                            onConfirm={() => delArticle(data)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    const delArticle = (data) => {
        deleteArticleAPI(data.id)
        setArticleList(prevState => {
            return {
                ...prevState,
                count: prevState.count - 1
            }
        })
    }
    const {channelList} = useChannel();
    const [requestParams, setRequestParams] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })

    const onPageChange = (page) => {
        console.log(page)
        setRequestParams(prevState => {
            return {
                ...prevState,
                page
            }
        })
    }
    const submitFilter = (value) => {
        setRequestParams({
            ...articleList,
            status: value.status,
            channel_id: value.channel_id,
            begin_pubdate: value.date[0]?.format('YYYY-MM-DD'),
            end_pubdate: value.date[1]?.format('YYYY-MM-DD')
        })
    }
    const [articleList, setArticleList] = useState({
        list: [],
        count: 0
    });

    useEffect(() => {
        (async () => {
            const res = await getArticleListAPI(requestParams);
            setArticleList({
                list: res.data.results,
                count: res.data.total_count
            })
        })()
    }, [requestParams, articleList]);

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}/>
                }
                style={{marginBottom: 20}}
            >
                <Form
                    initialValues={{status: ''}}
                    onFinish={submitFilter}
                >
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{width: 120}}
                        >
                            {channelList.map(item => {
                                return <Option key={item.id}>{item.name}</Option>
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <div>
                <Card title={`根据筛选条件共查询到 ${articleList.count} 条结果：`}>
                    <Table rowKey="id" columns={columns} dataSource={articleList.list} pagination={{
                        total: articleList.count,
                        pageSize: requestParams.per_page,
                        onChange: onPageChange
                    }}/>
                </Card>
            </div>
        </div>
    )
}

export default Article
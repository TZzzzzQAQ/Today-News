import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select, message
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {useEffect, useState} from "react";
import {createArticleAPI, getArticleDetailByIdAPI} from "@/apis/article";
import {useChannel} from "@/hooks/useChannel";

const {Option} = Select

const Publish = () => {
    const {channelList} = useChannel();
    const [imageList, setImageList] = useState([]);
    const [pictureNumber, setPictureNumber] = useState(0);
    const submitHandler = ({title, content, channel_id}) => {
        if (imageList.length !== pictureNumber) {
            message.warning('封面数量和所选类型不匹配，请重试！');
        }
        const data = {
            title,
            content,
            cover: {
                type: pictureNumber,
                images: imageList.map(item => {
                    return item.response.data.url
                })
            },
            channel_id
        }
        createArticleAPI(data);
    }
    const pictureChangeHandler = (e) => {
        setPictureNumber(e.target.value)
        if (e.target.value < imageList.length) {
            setImageList(imageList.slice(0, e.target.value));
        }
    }
    const onUploadChange = (value) => {
        setImageList(value.fileList)
    }
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm()
    useEffect(() => {
        if (!searchParams.get('id')) {
            return
        }
        (async () => {
            const res = await getArticleDetailByIdAPI(searchParams.get('id'));
            console.log('here', res.data)
            form.setFieldsValue({
                ...res.data,
                type: res.data.cover.type
            })
            setPictureNumber(res.data.cover.type)
            setImageList(res.data.cover.images.map(url => {
                return {url}
            }))
        })()
    }, [searchParams, form]);
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: `${searchParams.get('id') ? '编辑' : '发布'}文章`},
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 0}}
                    onFinish={submitHandler}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        <Select placeholder="请选择文章频道" style={{width: 400}}>
                            {channelList.map(item => {
                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={pictureChangeHandler}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {pictureNumber > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            fileList={imageList}
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onUploadChange}
                            name={'image'}
                            maxCount={pictureNumber}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish
import { Button, Col, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined } from '@ant-design/icons';

const SearchClient = () => {
    const optionsSkills = [
        { label: "React.JS", value: "REACT.JS" },
        { label: "React Native", value: "REACT NATIVE" },
        { label: "Vue.JS", value: "VUE.JS" },
        { label: "Angular", value: "ANGULAR" },
        { label: "Nest.JS", value: "NEST.JS" },
        { label: "TypeScript", value: "TYPESCRIPT" },
        { label: "Java", value: "JAVA" },
        { label: "Frontend", value: "FRONTEND" },
        { label: "Backend", value: "BACKEND" },
        { label: "Fullstack", value: "FULLSTACK" }
    ]
    const optionsLocations = [
        { label: "Hà Nội", value: "HANOI" },
        { label: "Hồ Chí Minh", value: "HOCHIMINH" },
        { label: "Đà Nẵng", value: "DANANG" },
        { label: "Others", value: "OTHER" },
        { label: "Tất cả thành phố", value: "ALL" },
    ]

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}><h2>Việc Làm IT Cho Developer "Chất"</h2></Col>
            <Col span={24} md={16}>
                <Select
                    mode="multiple"
                    allowClear
                    showArrow={false}
                    style={{ width: '100%' }}
                    placeholder={
                        <>
                            <MonitorOutlined /> Tìm theo kỹ năng...
                        </>
                    }
                    onChange={handleChange}
                    optionLabelProp="label"
                    options={optionsSkills}
                />
            </Col>
            <Col span={12} md={4}>
                <Select
                    mode="multiple"
                    allowClear
                    showArrow={false}
                    style={{ width: '100%' }}
                    placeholder={
                        <>
                            <EnvironmentOutlined /> Địa điểm...
                        </>
                    }
                    onChange={handleChange}
                    optionLabelProp="label"
                    options={optionsLocations}
                />

            </Col>
            <Col span={12} md={4}>
                <Button type='primary'>Search</Button>
            </Col>
        </Row>
    )
}
export default SearchClient;
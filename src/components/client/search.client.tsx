import { Button, Col, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined } from '@ant-design/icons';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';

const SearchClient = () => {
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;

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
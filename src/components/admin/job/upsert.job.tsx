import { Breadcrumb, Col, Divider, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DebounceSelect } from "../user/debouce.select";
import { ProCard, ProForm, ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText } from "@ant-design/pro-components";
import styles from 'styles/admin.module.scss';
import { LOCATION_LIST, SKILLS_LIST } from "@/config/utils";
import { ICompanySelect } from "../user/modal.user";
import { useState, useEffect } from 'react';
import { callFetchCompany } from "@/config/api";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ViewUpsertJob = (props: any) => {
    const [companies, setCompanies] = useState<ICompanySelect[]>([]);
    const navigate = useNavigate();
    const [value, setValue] = useState<string>("");

    // Usage of DebounceSelect
    async function fetchCompanyList(name: string): Promise<ICompanySelect[]> {
        const res = await callFetchCompany(`current=1&pageSize=100&name=/${name}/i`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item._id as string
                }
            })
            return temp;
        } else return [];
    }


    return (
        <div className={styles["upsert-job-container"]}>
            <div className={styles["title"]}>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <Link to="/admin/job">Manage Job</Link>,
                        },
                        {
                            title: 'Upsert Job',
                        },
                    ]}
                />
            </div>
            <div >
                <ProForm
                    onFinish={async (values) => {

                    }}
                    submitter={
                        {
                            searchConfig: {
                                resetText: "Hủy",
                                submitText: "Lưu Job"
                            },
                            onReset: () => navigate('/admin/job')
                        }
                    }

                >
                    <Row gutter={[20, 20]}>
                        <Col span={24} md={12}>
                            <ProFormText
                                label="Tên Job"
                                name="name"
                                rules={[
                                    { required: true, message: 'Vui lòng không bỏ trống' },
                                ]}
                                placeholder="Nhập tên job"
                            />
                        </Col>
                        <Col span={24} md={6}>
                            <ProFormSelect
                                name="skills"
                                label="Kỹ năng yêu cầu"
                                options={SKILLS_LIST}
                                placeholder="Please select a skill"
                                rules={[{ required: true, message: 'Vui lòng chọn kỹ năng!' }]}
                                allowClear
                                mode="multiple"
                                fieldProps={{
                                    showArrow: false
                                }}

                            />
                        </Col>
                        <Col span={24} md={6}>
                            <ProFormSelect
                                name="location"
                                label="Địa điểm"
                                options={LOCATION_LIST}
                                placeholder="Please select a location"
                                rules={[{ required: true, message: 'Vui lòng chọn địa điểm!' }]}
                            />
                        </Col>
                        <Col span={24} md={6}>
                            <ProFormDigit
                                label="Mức lương"
                                name="salary"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder="Nhập mức lương"
                            />
                        </Col>
                        <Col span={24} md={6}>
                            <ProFormDigit
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder="Nhập số lượng"
                            />
                        </Col>
                        <Col span={24} md={6}>
                            <ProFormSelect
                                name="level"
                                label="Trình độ"
                                valueEnum={{
                                    INTERN: 'INTERN',
                                    FRESHER: 'FRESHER',
                                    JUNIOR: 'JUNIOR',
                                    MIDDLE: 'MIDDLE',
                                    SENIOR: 'SENIOR',
                                }}
                                placeholder="Please select a level"
                                rules={[{ required: true, message: 'Vui lòng chọn level!' }]}
                            />
                        </Col>


                        <Col span={24} md={6}>
                            <ProForm.Item
                                name="company"
                                label="Thuộc Công Ty"
                                rules={[{ required: true, message: 'Vui lòng chọn company!' }]}
                            >
                                <DebounceSelect
                                    allowClear
                                    showSearch
                                    defaultValue={companies}
                                    value={companies}
                                    placeholder="Chọn công ty"
                                    fetchOptions={fetchCompanyList}
                                    onChange={(newValue: any) => {
                                        if (newValue?.length === 0 || newValue?.length === 1) {
                                            setCompanies(newValue as ICompanySelect[]);
                                        }
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </ProForm.Item>

                        </Col>

                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col span={24} md={6}>
                            <ProFormDatePicker
                                label="Ngày bắt đầu"
                                name="startDate"
                                // normalize={(value) => value && moment(value).format('YYYY-MM-DD')}
                                fieldProps={{
                                    format: 'DD/MM/YYYY',

                                }}
                                // width="auto"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
                                placeholder="dd/mm/yyyy"
                            />
                        </Col>
                        <Col span={24} md={6}>
                            <ProFormDatePicker
                                label="Ngày kết thúc"
                                name="endDate"
                                // normalize={(value) => value && moment(value).format('YYYY-MM-DD')}
                                fieldProps={{
                                    format: 'DD/MM/YYYY',

                                }}
                                // width="auto"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
                                placeholder="dd/mm/yyyy"
                            />
                        </Col>
                        <Col span={24} md={6}>
                            <ProFormSwitch
                                label="Trạng thái"
                                name="isActive"
                                checkedChildren="ACTIVE"
                                unCheckedChildren="INACTIVE"
                                // initialValue={true}
                                fieldProps={{
                                    defaultChecked: true,
                                }}
                            />
                        </Col>
                        <Col span={24}>
                            <ProForm.Item
                                name="description"
                                label="Miêu tả job"
                                rules={[{ required: true, message: 'Vui lòng nhập miêu tả job!' }]}
                            >
                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                />
                            </ProForm.Item>
                        </Col>
                    </Row>
                    <Divider />
                </ProForm>
            </div>
        </div>
    )
}

export default ViewUpsertJob;